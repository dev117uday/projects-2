package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	RedisAddress  string
	RedisDatabase int
)

func LoadRedisConfig() {
	var err error
	err = godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	RedisAddress = os.Getenv("RedisAddress")
	RedisDatabase, err = strconv.Atoi(os.Getenv("RedisDatabase"))
	if err != nil {
		panic("Unable to parse database number")
	}

}
