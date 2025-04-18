package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)
var secretKey = []byte("your-secret")

func Authenticate(c *fiber.Ctx) error {
	auth :=c.Get("Authorization")
	if (auth==""|| !strings.HasPrefix(auth,"Bearer ")){
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Wrong or missing Authorization",
			"success": false,
			"err":     "",
		})
	}
	tokenString := strings.TrimPrefix(auth,"Bearer ")
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