package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	SqlAddress  string
	SqlUser     string
	SqlPassword string
	SqlDatabase string
)

func LoadSqlConfig() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	SqlAddress = os.Getenv("SQLAddress")
	SqlUser = os.Getenv("SQLUser")
	SqlPassword = os.Getenv("SQLPassword")
	SqlDatabase = os.Getenv("SQLDatabase")

}
