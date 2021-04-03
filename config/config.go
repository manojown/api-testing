package config

import (
	"context"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DbConfig struct {
	Client *mongo.Client
}

func (db *DbConfig) initialize() {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://manoj:manoj@cluster0.6jvp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	))
	if err != nil {
		log.Fatal(err)
	}
	db.Client = client
}

func (db *DbConfig) Collection(collectionName string) *mongo.Collection {

	return db.Client.Database("testing").Collection(collectionName)

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
