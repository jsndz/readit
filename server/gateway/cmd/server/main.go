package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/jsndz/readit/api-gateway/middleware"
	"github.com/jsndz/readit/api-gateway/proxy"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.All("/api/auth/*", func(c *fiber.Ctx) error {
		return proxy.Forward(c, "http://localhost:3001")
	})

	app.All("/api/post/*", middleware.Authenticate, func(c *fiber.Ctx) error {
		return proxy.Forward(c, "http://localhost:3000")
	})
	app.All("/api/comment/*", middleware.Authenticate, func(c *fiber.Ctx) error {
		return proxy.Forward(c, "http://localhost:3000")
	})

	app.Listen(":8080")
}

