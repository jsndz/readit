package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/readit/pkg/db"
	route "github.com/readit/routes"
)

func getEnv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}
	return val
}


func main() {
	app := fiber.New()
	dbConn,err := db.InitDB()

	db.MigrateDB(dbConn)
	postGroup := app.Group("/api/post")
	route.PostRoute(postGroup, dbConn)
	CommentRoute := app.Group("/api/comment")
	route.CommentRoute(CommentRoute, dbConn)
	if err!=nil {
		fmt.Println(err)
	}
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	port := getEnv("PORT","3000")
	fmt.Println("Connected:", dbConn)
	fmt.Println("Server running on port:", port)
	if err := app.Listen(":" + port); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
