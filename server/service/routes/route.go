package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/readit/internal/app/handler"
	"gorm.io/gorm"
)

func SetUpRoute(router fiber.Router,db *gorm.DB){
	postHandler := handler.NewPostHandler(db)

	router.Post("/create",postHandler.CreatePost)
	router.Get("/get/:id",postHandler.GetPostByID)
	router.Get("/getAll",postHandler.GetAllPosts)
	router.Put("/update/:id",postHandler.UpdatePost)
	router.Delete("/delete/:id",postHandler.DeletePost)
}