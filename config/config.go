package config

import (
	"context"
	"log"
	"time"

	"github.com/manojown/api-testing-premium/app/model"
	_ "github.com/mattn/go-sqlite3"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DbConfig struct {
	Client *mongo.Client
	User   model.User
}

func (db *DbConfig) initialize() {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://manojown:manoj337@cluster0.6jvp2.mongodb.net/test?retryWrites=true&w=majority",
	))
	if err != nil {
		log.Fatal(err)
	}
	db.Client = client
}

func (db *DbConfig) Collection(collectionName string) *mongo.Collection {

	return db.Client.Database("test").Collection(collectionName)

}

func NewConfig() *DbConfig {
	config := new(DbConfig)
	config.initialize()
	return config
}

func checkErr(err error) {
	if err != nil {
		panic("error is" + err.Error())
	}
}
