package helpers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/manojown/api-testing-premium/app/model"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var SECRET_KEY = []byte("asdjasjdhjashjdajhkshjdhjasdhjkkhj")

func GetHash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

func GenerateJWT(user model.User) (string, error) {
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["email"] = user.Email
	atClaims["id"] = user.ID
	atClaims["exp"] = time.Now().Add(time.Minute * 7200).Unix()
	fmt.Println("atClaims", atClaims)

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(SECRET_KEY))
	if err != nil {
		fmt.Println("GenerateJWT", err)
		return "", err
	}
	return token, nil
}

func AutheticateRequest(r *http.Request) (bool, model.User) {
	var user model.User
	jwtToken := r.Header.Get("Authorization")
	if jwtToken == "" {
		return false, user
	}
	token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		return false, user
	}

	if claim, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		user.Email = claim["email"].(string)
		user.ID, _ = primitive.ObjectIDFromHex(claim["id"].(string))
		if claim["name"] != nil {
			user.Name = claim["name"].(string)
		}

		return true, user
	}
	return false, user

}
