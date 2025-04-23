package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
)
var secretKey = []byte("jwtSecret")

func Authenticate(c *fiber.Ctx) error {
	tokenString := c.Cookies("token")
	log.Infof("tokenString",tokenString)
	token ,err := jwt.Parse(tokenString,func (t *jwt.Token)(interface{},error){
		return secretKey,nil
	})
	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid token",
		})
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		c.Locals("id", claims["sub"])
	}
	return c.Next()
}