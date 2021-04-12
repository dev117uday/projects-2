package server

import (
	"fmt"
	"log"
	"solvepao-backend/db"
	"solvepao-backend/fn"

	"github.com/gofiber/fiber/v2"
)

func StartServer() {
	fmt.Println("Starting server")

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("hello world")
	})

	app.Get("/oauth-callback", func(c *fiber.Ctx) error {

		code := c.Query("code")
		token, err := fn.GitHubAuth(code)
		// todo : error handling
		if err != nil {
			log.Fatal(err)
		}
		user, err := fn.GetGitHubUserInfo(token)
		db.InsertRecordGitHubUser(user)
		// todo : error handling
		if err != nil {
			log.Fatal(err)
		}
		redirectUrl := fmt.Sprintf("http://localhost:3000?token=%s", token)
		return c.Redirect(redirectUrl)
	})

	log.Fatal(app.Listen(":4000"))
}
