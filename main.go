package main

import (
	"github.com/joho/godotenv"
	"github.com/manojown/api-testing-premium/app"
)

func main() {
	godotenv.Load()
	app.Initialize()
}
