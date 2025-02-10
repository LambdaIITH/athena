package controller

import (
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/idtoken"

	"github.com/LambdaIITH/go-backend/internal/db"
	"github.com/LambdaIITH/go-backend/internal/helpers"
	"github.com/LambdaIITH/go-backend/internal/schema"
)

func LoginWithGoogle(c *gin.Context) {
	var req schema.GoogleLoginRequest
	audience := os.Getenv("CLIENT_ID")
	jwtSecret := os.Getenv("JWT_SECRET")

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify Google token
	payload, err := idtoken.Validate(context.Background(), req.IdToken, audience)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Invalid token",
			"message": "Failed to authenticate with Google",
		})
		return
	}

	email := payload.Claims["email"].(string)
	user, err := db.GetUserByEmail(c.Request.Context(), email)

	if err != nil {
		// Create new user if not exists
		user, err = db.CreateUserWithGoogle(c.Request.Context(), email, payload.Subject)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}
	}

	// Generate JWT token
	token, err := helpers.GenerateToken(user.ID, user.Username, jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Set cookie
	domain := os.Getenv("DOMAIN")
	c.SetCookie("auth", token, 3600*24*10, "/", domain, false, true)

	c.JSON(http.StatusOK, schema.LoginResponse{
		Token:   token,
		User:    *user,
		Message: "Login successful",
	})
}

func LoginWithPassword(c *gin.Context) {
	var req schema.PasswordLoginRequest
	jwtSecret := os.Getenv("JWT_SECRET")

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := db.GetUserByUsername(c.Request.Context(), req.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !helpers.VerifyPassword(user.PasswordHash, req.Password, user.Salt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token, err := helpers.GenerateToken(user.ID, user.Username, jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Set cookie
	domain := os.Getenv("DOMAIN")
	c.SetCookie("auth", token, 3600*24*10, "/", domain, false, true)

	c.JSON(http.StatusOK, schema.LoginResponse{
		Token:   token,
		User:    *user,
		Message: "Login successful",
	})
}
