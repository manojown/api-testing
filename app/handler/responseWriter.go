package handler

import (
	"encoding/json"
	"net/http"

	"github.com/manojown/api-testing-premium/app/model"
)

func ResponseWriter(res http.ResponseWriter, status int, message string, data interface{}) error {
	res.WriteHeader(status)
	httpResponse := model.NewResponse(status, message, data)
	err := json.NewEncoder(res).Encode(httpResponse)
	return err
}
