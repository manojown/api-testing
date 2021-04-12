package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	helper "github.com/manojown/api-testing-premium/app/helper"
	"github.com/manojown/api-testing-premium/app/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"

	"github.com/manojown/api-testing-premium/config"
)

func Test(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {

	json.NewEncoder(rw).Encode("You are authorized person.")

}

func GetAllUser(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {

	var dbUsers []model.User

	Collection := DB.Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := Collection.Find(ctx, bson.M{}, options.Find().SetProjection(bson.D{{"_id", 1}, {"email", 1}, {"name", 1}}))
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var user model.User
		if err = cursor.Decode(&user); err != nil {
			log.Println("Error while data parse:GetAllUser", err.Error())
		}
		dbUsers = append(dbUsers, user)
	}
	ResponseWriter(rw, http.StatusOK, "User retrived successfully.", dbUsers)

}

func Registeration(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var user model.User
	var dbUser model.User

	json.NewDecoder(r.Body).Decode(&user)

	user.Password = helper.GetHash([]byte(user.Password))
	Collection := DB.Collection("user")

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	Collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&dbUser)

	if dbUser.Email == user.Email {
		ResponseWriter(rw, http.StatusConflict, "User is already register with same Email Address.", "Register with other email address.")
		return
	}
	result, err := Collection.InsertOne(nil, user)
	log.Println("result", result)
	if err != nil {
		ResponseWriter(rw, http.StatusInternalServerError, "Something went wrong while insertion.", err)
		return
	}
	ResponseWriter(rw, http.StatusOK, "User created successfully.", result)

}

func Login(DB *config.DbConfig, response http.ResponseWriter, request *http.Request) {
	var user model.User
	var dbUser model.User

	err := json.NewDecoder(request.Body).Decode(&user)
	Collection := DB.Collection("user")

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = Collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&dbUser)

	if dbUser.Email == "" {
		ResponseWriter(response, http.StatusInternalServerError, "You are not register with us.", err)
		return
	}

	userPass := []byte(user.Password)
	dbPassBuffered := []byte(dbUser.Password)

	passErr := bcrypt.CompareHashAndPassword(dbPassBuffered, userPass)

	if passErr != nil {
		ResponseWriter(response, http.StatusInternalServerError, "Email or password incorrect.", passErr)
		return
	}
	jwtToken, err := helper.GenerateJWT(dbUser)
	if err != nil {
		ResponseWriter(response, http.StatusInternalServerError, "Something went wrong.", err.Error())
		return
	}

	ResponseWriter(response, http.StatusOK, "User loggedIn successfully.", jwtToken)
}
