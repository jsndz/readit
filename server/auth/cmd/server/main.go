package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/jsndz/readit/auth/pkg/db"
	"github.com/jsndz/readit/auth/route"
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
	if err!=nil {
		fmt.Println(err)
	}
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	authGroup := app.Group("/api/auth")
	route.SetUpRoute(authGroup, dbConn)
	port := getEnv("PORT","3001")
	fmt.Println("Connected:", dbConn)
	fmt.Println("Server running on port:", port)
	if err := app.Listen(":" + port); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
