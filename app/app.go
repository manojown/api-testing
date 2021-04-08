package app

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	helper "github.com/manojown/api-testing-premium/app/helper"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/manojown/api-testing-premium/app/handler"
	"github.com/manojown/api-testing-premium/config"
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
		header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
		methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
		origins := handlers.AllowedOrigins([]string{"*"})

		envPort := os.Getenv("PORT")
		if envPort != "" {
			PORT = fmt.Sprintf(":%s", envPort)
		}
		fmt.Printf("Running on %s", PORT)

		err := http.ListenAndServe(PORT, handlers.CORS(header, methods, origins)(app.Router))
		if err != nil {
			panic("Something Went wrong" + err.Error())
		}

	}()
	sig := <-signalChennal
	fmt.Println("Signal recieved", sig)
}

func (app *App) setRouter() {
	app.apiHandler("/registration", "POST", handler.Registeration, false)
	app.apiHandler("/login", "POST", handler.Login, false)
	app.apiHandler("/test", "GET", handler.Test, false)
	app.apiHandler("/request", "POST", handler.NewSessionRequest, true)
	app.apiHandler("/request/{id}", "GET", handler.UserRequest, true)
	app.apiHandler("/request", "GET", handler.UserRequest, true)
	app.apiHandler("/performance/{id}", "GET", handler.GetPerformance, true)
	app.apiHandler("/performance", "GET", handler.GetPerformance, true)
	app.apiHandler("/server", "POST", handler.CreateServer, true)
	app.apiHandler("/server/{id}", "GET", handler.GetServer, true)
	app.apiHandler("/server", "GET", handler.GetServer, true)
	app.apiHandler("/user", "GET", handler.GetAllUser, true)
	app.apiHandler("/connector", "POST", handler.Connector, false)
	app.apiHandler("/result", "POST", handler.GetServerRespone, false)

}

func (app *App) apiHandler(path string, method string, handler handlerFunction, isAuth bool) {
	if isAuth {
		app.Router.HandleFunc(path, app.withAuthHandler(handler)).Methods(method)
	} else {
		app.Router.HandleFunc(path, app.withoutAuthHandler(handler)).Methods(method)
	}
}

type handlerFunction func(db *config.DbConfig, w http.ResponseWriter, r *http.Request)

func (app *App) withoutAuthHandler(handler handlerFunction) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		handler(app.DB, rw, r)
	}
}

func (app *App) withAuthHandler(handler handlerFunction) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {

		auth, user := helper.AutheticateRequest(r)
		app.DB.User = user

		if auth {
			handler(app.DB, rw, r)
		} else {
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write([]byte("Unauthorized"))
		}
	}
}

// func serveAppHandler(app *rice.Box) http.HandlerFunc {

// 		indexFile, err := app.Open("index.html")
// 		if err != nil {
// 			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
// 			return
// 		}

// 		http.ServeContent(w, r, "index.html", time.Time{}, indexFile)
// 	}
// }
