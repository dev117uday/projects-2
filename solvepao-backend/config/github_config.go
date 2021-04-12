package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	GitHubId     string
	GitHubSecret string
)

func LoadGithubConfig() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	GitHubId = os.Getenv("clientId")
	GitHubSecret = os.Getenv("clientSecret")
}
