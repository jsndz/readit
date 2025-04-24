package proxy

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gofiber/fiber/v2"
)


func Forward(c *fiber.Ctx, target string) error{
		req,err:= http.NewRequest(c.Method(),target+c.OriginalURL(),bytes.NewReader(c.Body()))
		if(err!=nil){
			return err
		}

		c.Request().Header.VisitAll(func (key,value[]byte){
			req.Header.Set(string(key),string(value))
		})

		userID := c.Locals("id")
		if userID != nil {
			req.Header.Set("X-User-ID", userID.(string))
		}

		client := http.Client{}
		resp,err := client.Do(req)
		if err!= nil{
			return err
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err!= nil{
			return err
		}
		return c.Status(resp.StatusCode).Send(body)
	
}



func ForwardOnly(c *fiber.Ctx, target string) error {
	req, err := http.NewRequest(c.Method(), target+c.OriginalURL(), bytes.NewReader(c.Body()))
	if err != nil {
		return err
	}

	c.Request().Header.VisitAll(func(key, value []byte) {
		req.Header.Set(string(key), string(value))
	})

	userID := c.Locals("id")
	if userID != nil {
		req.Header.Set("X-User-ID", userID.(string))
	}

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var responseBody map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &responseBody); err != nil {
		return err
	}


	if token, ok := responseBody["token"].(string); ok {
		c.Cookie(&fiber.Cookie{
			Name:     "token",
			Value:    token,
			HTTPOnly: true,
			Secure:   false,
			SameSite: "Lax",
			Path:     "/",
		})
		delete(responseBody, "token") 
	}

	return c.Status(resp.StatusCode).JSON(responseBody)
}
