package handler

import (
	"context"
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

// GetServerHandler is ...
// func GetServerHandler(db *sql.DB, rw http.ResponseWriter, r *http.Request) {

// 	data := getServer(db)
// 	json.NewEncoder(rw).Encode(data)

// }

func UserRequest(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var dbRequests []model.Configuration
	_, options := helpers.ValidatePagination(r.URL.Query())
	options.SetSort(bson.D{{"_id", -1}})

	params := mux.Vars(r)
	requestID, err := primitive.ObjectIDFromHex(params["id"])
	criteria := bson.M{"userID": DB.User.ID}

	if requestID != primitive.NilObjectID {
		criteria["requestID"] = requestID
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	Collection := DB.Collection("request")
	cursor, err := Collection.Find(ctx, criteria, &options)

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var request model.Configuration
		if err = cursor.Decode(&request); err != nil {
			ResponseWriter(rw, http.StatusInternalServerError, "Error while process docs", err.Error())
		}
		dbRequests = append(dbRequests, request)
	}

	ResponseWriter(rw, http.StatusOK, "Request retrived successfully.", dbRequests)

}

func GetPerformance(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	_, options := helpers.ValidatePagination(r.URL.Query())
	options.SetSort(bson.D{{"_id", -1}})

	var dbRequests []model.TestResponse

	requestID, err := primitive.ObjectIDFromHex(r.URL.Query().Get("id"))
	log.Println("called this id", r.URL.Query().Get("id"))
	criteria := bson.M{"userID": DB.User.ID}

	if requestID != primitive.NilObjectID {
		criteria["requestID"] = requestID
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	Collection := DB.Collection("result")
	cursor, err := Collection.Find(ctx, criteria, &options)

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var request model.TestResponse
		if err = cursor.Decode(&request); err != nil {
			ResponseWriter(rw, http.StatusInternalServerError, "Error while process docs", err.Error())
		}
		dbRequests = append(dbRequests, request)
	}

	ResponseWriter(rw, http.StatusOK, "All performance metrics retrived successfully.", dbRequests)

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
	}
	// log.Println("ips is", conf.Ips)
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
	_, options := helpers.ValidatePagination(r.URL.Query())
	options.SetSort(bson.D{{"_id", -1}})

	var dbServers []model.Server

	params := mux.Vars(r)
	requestID, err := primitive.ObjectIDFromHex(params["id"])
	criteria := bson.M{"userID": DB.User.ID}

	if requestID != primitive.NilObjectID {
		criteria["_id"] = requestID
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	Collection := DB.Collection("server")
	cursor, err := Collection.Find(ctx, criteria, &options)

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var server model.Server
		if err = cursor.Decode(&server); err != nil {
			ResponseWriter(rw, http.StatusInternalServerError, "Error while process docs", err.Error())
		}
		dbServers = append(dbServers, server)
	}

	ResponseWriter(rw, http.StatusOK, "Server's retrived successfully.", dbServers)

}

func GetServerRespone(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var payloadReciever model.PayloadReciever
	var response model.TestResponse

	err := json.NewDecoder(r.Body).Decode(&payloadReciever)
	checkErr(err)
	log.Println("REcive from remote servver:GetServerRespone", payloadReciever)
	response = payloadReciever.TestResponse
	response.RequestURL = response.URL
	response.UserID = payloadReciever.UserID
	response.RequestID = payloadReciever.RequestID
	response.Responder = payloadReciever.Responder
	insertionID := helpers.InsertTestResult(DB, response)
	log.Println("Data save to db DbConnect where id is:%d and responder is %s ", insertionID, response.Responder)

}

func Connector(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	var server model.Server
	// var dbServer model.Server

	// ip, _, _ := net.SplitHostPort(r.RemoteAddr)

	if server.ServerIP == "" {
		// server.ServerIP = ip
	}
	_ = json.NewDecoder(r.Body).Decode(&server)

	Collection := DB.Collection("server")
	// _ = Collection.FindOne(nil, bson.M{"token": server.Token}).Decode(&dbServer)
	update := bson.M{
		"$set": bson.M{
			"port":          server.Port,
			"diskSpace":     server.DiskSpace,
			"ram":           server.RAM,
			"cpu":           server.CPU,
			"lastConnected": server.LastConnected,
		},
	}
	log.Println("update", server.Token, server.ServerIP)
	_, _ = Collection.UpdateOne(nil, bson.M{"token": server.Token}, update)
	// log.Println("server update via connector", isUpdate)

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
