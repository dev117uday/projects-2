package db

import (
	"context"
	"fmt"
	"log"
	"solvepao-backend/config"
	"solvepao-backend/structs"

	pg "github.com/go-pg/pg/v10"
)

var db *pg.DB

func InitConnectionSql() {
	fmt.Println("--- Connecting with db")

	db = pg.Connect(&pg.Options{
		Addr:     config.SqlAddress,
		User:     config.SqlUser,
		Password: config.SqlPassword,
		Database: config.SqlDatabase,
	})

	ctx := context.Background()

	if err := db.Ping(ctx); err != nil {
		panic(err)
	}

	log.Print("\n --- Db connection : success \n")
}

func InsertRecordGitHubUser(user *structs.GitHubUserInfo) {
	insertQuery := fmt.Sprintf("INSERT INTO users (UserName, AvatarURL, Name, Location, Email ) values ('%s','%s','%s','%s','%s');", user.UserName, user.AvatarURL, user.Name, user.Location, user.Email)
	_, _ = db.Exec(insertQuery)
}
