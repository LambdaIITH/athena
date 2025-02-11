package helpers

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/oauth2/v2"
)

func GenerateSalt() (string, error) {
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(bytes), nil
}

func HashPassword(password string, salt string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func VerifyPassword(hashedPassword, password, salt string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password+salt))
	return err == nil
}

func VerifyGoogleToken(idToken string) (*oauth2.Tokeninfo, error) {
	oauth2Service, err := oauth2.New(oauth2.NewService(context.Background()))
	if err != nil {
		return nil, fmt.Errorf("failed to create oauth2 service: %v", err)
	}

	tokenInfo, err := oauth2Service.Tokeninfo().IdToken(idToken).Do()
	if err != nil {
		return nil, fmt.Errorf("failed to verify token: %v", err)
	}

	return tokenInfo, nil
}

func GenerateToken(userID uuid.UUID, username string, secret string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = userID
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Hour * 24 * 10).Unix() // 10 days

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
