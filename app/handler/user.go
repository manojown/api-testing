package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/manojown/api-testing-premium/app/model"
	"github.com/manojown/api-testing-premium/config"
)

type logger struct {
	l *log.Logger
}

func init() {
	logger := new(logger)
	logger.l = log.New(os.Stdout, "User Service: ", log.LstdFlags)
}

func (log *logger) Registeration(DB *config.DbConfig, rw http.ResponseWriter, r *http.Request) {
	log.l.Panicln("called")
	var user model.User
	json.NewDecoder(r.Body).Decode(&user)

}
