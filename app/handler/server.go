package handler

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"time"

// 	helpers "github.com/manojown/api-testing-premium/app/helper"

// 	"github.com/manojown/api-testing-premium/app/model"
// 	"github.com/manojown/api-testing-premium/app/services"
// )

// // GetServerHandler is ...
// func GetServerHandler(db *sql.DB, rw http.ResponseWriter, r *http.Request) {

// 	data := getServer(db)
// 	json.NewEncoder(rw).Encode(data)

// }

// // CreateServerHandler is ...
// func CreateServerHandler(db *sql.DB, rw http.ResponseWriter, r *http.Request) {
// 	var server model.Server
// 	server.Topic = "server/" + randSeq(5)
// 	server.Created = time.Now().Unix()
// 	responseArray := createServer(db, server)
// 	json.NewEncoder(rw).Encode(responseArray)

// }

// // NewSessionRequest is ...
// func NewSessionRequest(db *sql.DB, rw http.ResponseWriter, r *http.Request) {
// 	var response model.TestResponse
// 	var conf model.Configuration
// 	var paylodResponse model.PayloadResponder

// 	responseReciever := make(chan model.TestResponse, 1)
// 	err := json.NewDecoder(r.Body).Decode(&conf)
// 	checkErr(err)
// 	// log.Println("ips is", conf.Ips)
// 	configID := createConfig(db, conf)

// 	paylodResponse.Conf = conf
// 	paylodResponse.UID = configID

// 	go helpers.ProcessRequest(conf.Ips, paylodResponse)
// 	processStartTime := time.Now()
// 	services.Initialize(&conf, responseReciever)
// 	response = <-responseReciever
// 	testResponse := helpers.ResponseCreator(response, configID, processStartTime, conf.URL)
// 	fmt.Println("response.Url: NewSessionRequest", response.Url)
// 	helpers.DbConnect(db, testResponse)
// }

// func GetServerRespone(db *sql.DB, rw http.ResponseWriter, r *http.Request) {
// 	var payloadReciever model.PayloadReciever
// 	var response model.TestResponse

// 	err := json.NewDecoder(r.Body).Decode(&payloadReciever)
// 	checkErr(err)

// 	response = payloadReciever.TestResponse
// 	response.ConfigId = payloadReciever.UID
// 	response.Responder = payloadReciever.Responder
// 	insertionID := helpers.DbConnect(db, response)
// 	log.Printf("Data save to db DbConnect where id is:%d and responder is %s ", insertionID, response.Responder)

// }
