package app

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	rice "github.com/GeertJohan/go.rice"
	"github.com/gorilla/mux"
	"github.com/manojown/api-testing-premium/config"
	"github.com/manojown/api-testing-premium/handler"

	"github.com/rs/cors"
)

var PORT string = ":8080"

type App struct {
	Router *mux.Router
	DB     *config.DbConfig
}

func Initialize() {
	app := new(App)
	app.Router = mux.NewRouter()
	app.DB = config.NewConfig()
	app.setRouter()
	app.run()
}

func (app *App) run() {

	signalChennal := make(chan os.Signal, 1)
	signal.Notify(signalChennal, syscall.SIGINT, syscall.SIGTERM, syscall.SIGKILL, os.Interrupt, os.Kill)
	go func() {

		// app.Router.PathPrefix("/").Handler(http.FileServer(rice.MustFindBox("../client/build").HTTPBox()))
		handler := cors.Default().Handler(app.Router)

		envPort := os.Getenv("PORT")
		if envPort != "" {
			PORT = fmt.Sprintf(":%s", envPort)
		}
		fmt.Printf("Running on %s", PORT)

		err := http.ListenAndServe(PORT, handler)
		if err != nil {
			panic("Something Went wrong" + err.Error())
		}

	}()
	sig := <-signalChennal
	fmt.Println("Signal recieved", sig)
}

func (app *App) setRouter() {
	app.apiHandler("/testing", "POST", handler.Registeration)
}

func (app *App) apiHandler(path string, method string, handler handlerFunction) {
	app.Router.HandleFunc(path, app.funcHandler(handler)).Methods(method)
}

type handlerFunction func(db *config.DbConfig, w http.ResponseWriter, r *http.Request)

func (app *App) funcHandler(handler handlerFunction) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		handler(app.DB, rw, r)
	}
}

func serveAppHandler(app *rice.Box) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		indexFile, err := app.Open("index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		http.ServeContent(w, r, "index.html", time.Time{}, indexFile)
	}
}
