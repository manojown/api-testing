package handler

import (
	"encoding/json"
	"log"
	"math"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	helpers "github.com/manojown/api-testing-premium/app/helper"
	"github.com/manojown/api-testing-premium/app/services"
	"github.com/manojown/api-testing-premium/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/manojown/api-testing-premium/app/model"
)

func UserRequest(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	criteria := bson.M{"userID": DB.User.ID}

	_, options := helpers.ValidatePagination(r.URL.Query())
	requestID, err := primitive.ObjectIDFromHex(params["id"])
	checkError(rw, err, "Please check you params, It should be valid id.")

	if requestID != primitive.NilObjectID {
		criteria["requestID"] = requestID
	}

	result, err := DB.Find("request", criteria, &options)

	checkError(rw, err, "Something went wrong while fetching your data.")
	ResponseWriter(rw, http.StatusOK, "Request retrived successfully.", result)

}

func GetPerformance(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	criteria := bson.M{"userID": DB.User.ID}
	_, options := helpers.ValidatePagination(r.URL.Query())
	requestID, err := primitive.ObjectIDFromHex(r.URL.Query().Get("id"))

	if requestID != primitive.NilObjectID {
		criteria["requestID"] = requestID
	}

	result, err := DB.Find("server", criteria, &options)
	checkError(rw, err, "Something went wrong while fetching your data.")

	ResponseWriter(rw, http.StatusOK, "All performance metrics retrived successfully.", result)

}

// NewSessionRequest is ...
func NewSessionRequest(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var response model.TestResponse
	var conf model.Configuration
	var paylodResponse model.PayloadResponder
	responseReciever := make(chan model.TestResponse, 1)

	err := json.NewDecoder(r.Body).Decode(&conf)

	if err != nil {
		ResponseWriter(rw, http.StatusInternalServerError, "Please check your input, is it valid!", err.Error())
		return
	}
	requestID := helpers.CreateNewRequest(DB, conf)
	paylodResponse.Conf = conf
	paylodResponse.RequestID = requestID
	paylodResponse.UserID = DB.User.ID

	go func() {
		err, _ := helpers.ProcessRequest(DB, paylodResponse)
		if err != nil {
			log.Println("err")
		}
		log.Println("All Request SuccessFully sent to all saved server.")

	}()

	go func() {

		processStartTime := time.Now()
		services.Initialize(&conf, responseReciever)
		response = <-responseReciever
		t := time.Now()
		response.TotalTimeTaken = int64(math.Ceil(t.Sub(processStartTime).Seconds()))
		response.PerSecond = response.SucessRequests / response.TotalTimeTaken
		response.ReadThroughput = response.ReadThroughput / response.TotalTimeTaken
		response.WriteThroughput = response.WriteThroughput / response.TotalTimeTaken
		response.URL = conf.URL
		response.Created = time.Now().Unix()
		response.RequestID = requestID
		helpers.InsertTestResult(DB, response)
	}()

	ResponseWriter(rw, http.StatusOK, "New request added, wait till you time entered. ", requestID)

}

func CreateServer(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var server model.Server
	var dbServer model.Server

	Collection := DB.Collection("server")
	err := json.NewDecoder(r.Body).Decode(&server)

	checkErr(err)

	server.Token = helpers.RandSeq(8)
	server.Created = time.Now().Unix()
	server.UserID = DB.User.ID

	if server.Port == "" {
		server.Port = "3004" // replace with default port WIP need to create constant
	}

	err = Collection.FindOne(nil, bson.M{"serverIP": server.ServerIP, "userID": server.UserID}).Decode(&dbServer)

	if dbServer.ServerIP != "" {
		ResponseWriter(rw, http.StatusInternalServerError, "This server ip is already register with this user.", dbServer)
		return
	}

	insertionID, err := Collection.InsertOne(nil, server)

	if err != nil {
		ResponseWriter(rw, http.StatusInternalServerError, "Error occured while server insertion,"+err.Error(), insertionID)
		return
	}

	ResponseWriter(rw, http.StatusOK, "New server created successfully.", insertionID)

}

func GetServer(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {

	criteria := bson.M{"userID": DB.User.ID}
	_, options := helpers.ValidatePagination(r.URL.Query())
	params := mux.Vars(r)
	requestID, err := primitive.ObjectIDFromHex(params["id"])

	checkError(rw, err, "Please check your params")

	if requestID != primitive.NilObjectID {
		criteria["_id"] = requestID
	}

	result, err := DB.Find("server", criteria, &options)
	checkError(rw, err, "Something went wrong while fetching your data.")

	ResponseWriter(rw, http.StatusOK, "Server's retrived successfully.", result)

}

func GetServerRespone(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var payloadReciever model.PayloadReciever
	var response model.TestResponse

	err := json.NewDecoder(r.Body).Decode(&payloadReciever)
	checkErr(err)
	response = payloadReciever.TestResponse
	response.RequestURL = response.URL
	response.UserID = payloadReciever.UserID
	response.RequestID = payloadReciever.RequestID
	response.Responder = payloadReciever.Responder
	insertionID := helpers.InsertTestResult(DB, response)
	log.Printf("Data save to db DbConnect where id is:%d and responder is %s ", insertionID, response.Responder)

}

func Connector(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var server model.Server
	_ = json.NewDecoder(r.Body).Decode(&server)

	Collection := DB.Collection("server")
	update := bson.M{
		"$set": bson.M{
			"diskSpace":     server.DiskSpace,
			"ram":           server.RAM,
			"cpu":           server.CPU,
			"lastConnected": server.LastConnected,
		},
	}
	_, _ = Collection.UpdateOne(nil, bson.M{"token": server.Token}, update)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func GetPerformanceByUrl(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var data model.PerformanceCriteria
	criteria := bson.M{"userID": DB.User.ID}

	_, options := helpers.ValidatePagination(r.URL.Query())
	err := json.NewDecoder(r.Body).Decode(&data)
	checkError(rw, err, "Please Check you perameter.")

	requestID, err := primitive.ObjectIDFromHex(r.URL.Query().Get("id"))
	checkError(rw, err, "Please Check your params. It should be valid id.")

	if data.Url != "" {
		criteria["url"] = data.Url
	}
	if requestID != primitive.NilObjectID {
		criteria["requestID"] = requestID
	}

	result, err := DB.Find("result", criteria, &options)
	checkError(rw, err, "Something went wrong while fetching your data.")

	ResponseWriter(rw, http.StatusOK, "All performance metrics retrived successfully.", result)

}

func checkError(rw http.ResponseWriter, err error, message string) {
	if err != nil {
		if message != "" {
			ResponseWriter(rw, http.StatusInternalServerError, message, err.Error())
		} else {
			ResponseWriter(rw, http.StatusInternalServerError, err.Error(), err.Error())
		}
	}
}
