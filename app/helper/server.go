package helpers

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/manojown/api-testing-premium/app/model"
	"github.com/manojown/api-testing-premium/config"
	"github.com/valyala/fasthttp"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// func UpdateConnection(db *sql.DB, server model.Server) int64 {

// 	stmt, err := db.Prepare("update server set serverIP=? where topic=?")
// 	checkErr(err)
// 	// log.Println("called sevrer", server.ServerIP, server.Topic)
// 	res, err := stmt.Exec(server.ServerIP, server.Topic)
// 	checkErr(err)

// 	affect, err := res.RowsAffected()
// 	checkErr(err)

// 	fmt.Println(affect)
// 	return affect

// }

func CreateNewRequest(DB *config.DbConfig, newRequest model.Configuration) primitive.ObjectID {

	Collection := DB.Collection("request")
	newRequest.UserID = DB.User.ID
	newRequest.Created = time.Now().Unix()

	result, _ := Collection.InsertOne(nil, newRequest)
	return result.InsertedID.(primitive.ObjectID)
}

func InsertTestResult(DB *config.DbConfig, response model.TestResponse) primitive.ObjectID {

	Collection := DB.Collection("result")
	response.UserID = DB.User.ID
	result, _ := Collection.InsertOne(nil, response)
	return result.InsertedID.(primitive.ObjectID)
}

// func ResponseCreator(response model.TestResponse, configId int64, startTime time.Time, Url string) model.TestResponse {
// 	t := time.Now()
// 	response.ConfigId = configId
// 	response.TotalTimeTaken = int64(math.Ceil(t.Sub(startTime).Seconds()))
// 	response.PerSecond = response.SucessRequests / response.TotalTimeTaken
// 	response.ReadThroughput = response.ReadThroughput / response.TotalTimeTaken
// 	response.WriteThroughput = response.WriteThroughput / response.TotalTimeTaken
// 	response.Url = Url
// 	return response
// }
func checkErr(err error) {
	if err != nil {
		panic("error is" + err.Error())
	}
}
func apiCall(url string, method string, data []byte) {
	log.Println("Url ::", url, method)
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

func ProcessRequest(DB *config.DbConfig, payload model.PayloadResponder) (error, bool) {
	var allIps []model.Server
	Collection := DB.Collection("server")
	cursor, _ := Collection.Find(nil, bson.M{
		"userID": DB.User.ID,
	})

	defer cursor.Close(nil)

	for cursor.Next(nil) {
		var server model.Server
		if err := cursor.Decode(&server); err != nil {
			return err, false
		}
		allIps = append(allIps, server)
	}
	for ip := range allIps {
		payload.Responder = allIps[ip].ServerIP
		// log.Println("Ips is", payload.Responder)
		addr := fmt.Sprintf("http://%s:%s/test", payload.Responder, allIps[ip].Port)

		dataToSent, err := json.Marshal(payload)
		if err != nil {
			log.Println("error while marshal json.")
			return err, false
		}
		apiCall(addr, "POST", dataToSent)
	}
	return nil, true
}
