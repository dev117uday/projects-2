package main

import (
	"solvepao-backend/config"
	"solvepao-backend/db"
	"solvepao-backend/server"
)

func main() {
	config.LoadAllConfig()
	db.InitConnectionSql()
	server.StartServer()
}
