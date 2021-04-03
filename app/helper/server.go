package helpers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"time"

	"github.com/manojown/api-testing-premium/app/model"
	"github.com/valyala/fasthttp"
)

func UpdateConnection(db *sql.DB, server model.Server) int64 {

	stmt, err := db.Prepare("update server set serverIP=? where topic=?")
	checkErr(err)
	// log.Println("called sevrer", server.ServerIP, server.Topic)
	res, err := stmt.Exec(server.ServerIP, server.Topic)
	checkErr(err)

	affect, err := res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)
	return affect

}

func DbConnect(db *sql.DB, response model.TestResponse) int64 {

	var id int64
	stmt, err := db.Prepare("INSERT INTO RequestTable(url, requestUrl, responder, failedRequest, networkFailed, perSecond,sucessRequests,totalRequests,totalTime, readThroughput, writeThroughput, configId, created) values(?,?,?,?,?,?,?,?,?,?,?,?,?)")
	checkErr(err)
	res, err := stmt.Exec(response.Url, response.Url, response.Responder, response.FailedRequests, response.NetworkFailed, response.PerSecond, response.SucessRequests, response.TotalRequests, response.TotalTimeTaken, response.ReadThroughput, response.WriteThroughput, response.ConfigId, time.Now().Unix())
	checkErr(err)
	id, err = res.LastInsertId()
	checkErr(err)
	return id
}

func ResponseCreator(response model.TestResponse, configId int64, startTime time.Time, Url string) model.TestResponse {
	t := time.Now()
	response.ConfigId = configId
	response.TotalTimeTaken = int64(math.Ceil(t.Sub(startTime).Seconds()))
	response.PerSecond = response.SucessRequests / response.TotalTimeTaken
	response.ReadThroughput = response.ReadThroughput / response.TotalTimeTaken
	response.WriteThroughput = response.WriteThroughput / response.TotalTimeTaken
	response.Url = Url
	return response
}
func checkErr(err error) {
	if err != nil {
		panic("error is" + err.Error())
	}
}
func apiCall(url string, method string, data []byte) {

	req := fasthttp.AcquireRequest()
	req.SetRequestURI(url)
	req.Header.SetMethodBytes([]byte(method))
	req.SetBody(data)
	resp := fasthttp.AcquireResponse()
	err := fasthttp.Do(req, resp)
	statusCode := resp.StatusCode()
	fasthttp.ReleaseRequest(req)
	fasthttp.ReleaseResponse(resp)
	if err != nil {
		log.Println("Network error.", err)
	}

	if statusCode == fasthttp.StatusOK || statusCode == fasthttp.StatusMovedPermanently {
		log.Println("Request sent successfully.")

	} else {
		log.Println("Something went wrong from server please check server config.", statusCode)
	}

}

func ProcessRequest(ips []string, payload model.PayloadResponder) {

	for ip := range ips {
		payload.Ip = ips[ip]
		log.Println("Ips is", ips[ip])
		addr := fmt.Sprintf("http://%s:3004/test", ips[ip])
		dataToSent, err := json.Marshal(payload)
		if err != nil {
			log.Println("error while marshal json.")
		}
		apiCall(addr, "POST", dataToSent)
	}
}
