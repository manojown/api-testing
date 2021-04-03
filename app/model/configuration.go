package model

type Configuration struct {
	Uid       int64               `json:"uid"`
	URL       string              `json:"url"`
	Requests  int64               `json:"requests"`
	Time      int                 `json:"time"`
	Clients   int                 `json:"clients"`
	Headers   []map[string]string `json:"headers"`
	KeepAlive bool                `json:"keepAlive"`
	Method    string              `json:"method"`
	Ips       []string            `json:"ips"`
	PostData  string              `json:"postData"`
	Created   string              `json:"created"`
}

type Server struct {
	Uid      int    `json:"uid"`
	Topic    string `json:"topic"`
	ServerIP string `json:"serverIP"`
	Created  int64  `json:"created"`
}

type PayloadReciever struct {
	UID          int64        `json:"uid"`
	Responder    string       `json:"responder"`
	TestResponse TestResponse `json:"testResponse"`
}

type PayloadResponder struct {
	UID  int64         `json:"uid"`
	Ip   string        `json:"ip"`
	Conf Configuration `json:"conf"`
}
type ConnectionData struct {
	Topic    string `json:"topic"`
	ServerIP string `json:"serverIP"`
}
