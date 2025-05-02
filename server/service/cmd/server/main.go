package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/readit/pkg/db"
	"github.com/readit/pkg/redis"
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
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:8080",
		AllowCredentials: true,
		
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))
	dbConn,err := db.InitDB()
	rdb:=redis.RedisConnect();
	db.MigrateDB(dbConn)
	postGroup := app.Group("/api/post")
	route.PostRoute(postGroup, dbConn,rdb)
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
