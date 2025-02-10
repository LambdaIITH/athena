package db

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/LambdaIITH/go-backend/config"
	"github.com/LambdaIITH/go-backend/internal/schema"
	"github.com/google/uuid"
)

func GetUserId(context context.Context, email string) int {
	query := `SELECT id from Users WHERE email = $1`
	fmt.Println("EMAIL: ", email)
	row := config.DB.QueryRow(context, query, email)

	var id int
	err := row.Scan(&id)
	if err != nil {
		fmt.Println(err)
	}

	return id
}

func GetUserByUsername(ctx context.Context, username string) (*schema.User, error) {
	query := `
		SELECT id, username, email, password_hash, salt, created_at, last_login, google_id, is_active 
		FROM users 
		WHERE username = $1
	`
	var user schema.User
	err := config.DB.QueryRow(ctx, query, username).Scan(
		&user.ID, &user.Username, &user.Email, &user.PasswordHash,
		&user.Salt, &user.CreatedAt, &user.LastLogin, &user.GoogleID, &user.IsActive,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByEmail(ctx context.Context, email string) (*schema.User, error) {
	query := `
		SELECT id, username, email, password_hash, salt, created_at, last_login, google_id, is_active 
		FROM users 
		WHERE email = $1
	`
	var user schema.User
	err := config.DB.QueryRow(ctx, query, email).Scan(
		&user.ID, &user.Username, &user.Email, &user.PasswordHash,
		&user.Salt, &user.CreatedAt, &user.LastLogin, &user.GoogleID, &user.IsActive,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func UpdateLastLogin(ctx context.Context, userID uuid.UUID) error {
	query := `UPDATE users SET last_login = $1 WHERE id = $2`
	_, err := config.DB.Exec(ctx, query, time.Now(), userID)
	return err
}

func CreateUserWithGoogle(ctx context.Context, email, googleID string) (*schema.User, error) {
	query := `
		INSERT INTO users (email, username, google_id)
		VALUES ($1, $2, $3)
		RETURNING id, username, email, created_at, last_login, is_active
	`
	username := email[:strings.Index(email, "@")]
	var user schema.User
	err := config.DB.QueryRow(ctx, query, email, username, googleID).Scan(
		&user.ID, &user.Username, &user.Email, &user.CreatedAt, &user.LastLogin, &user.IsActive,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
