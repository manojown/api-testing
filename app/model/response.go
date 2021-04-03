package model

type TestResponse struct {
	Uid             int64  `json:"uid"`
	Url             string `json:"url"`
	Responder       string `json:"responder"`
	RequestUrl      string `json:"requestUrl"`
	ConfigId        int64  `json:"configId"`
	TotalTimeTaken  int64  `json:"totalTime"`
	TotalRequests   int64  `json:"totalRequests"`
	SucessRequests  int64  `json:"sucessRequests"`
	FailedRequests  int64  `json:"failedRequest"`
	NetworkFailed   int64  `json:"networkFailed"`
	WriteThroughput int64  `json:"writeThroughput"`
	ReadThroughput  int64  `json:"readThroughput"`
	PerSecond       int64  `json:"perSecond"`
	Created         string `json:"created"`
}
