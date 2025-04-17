package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/readit/internal/app/handler"
	"gorm.io/gorm"
)

func PostRoute(router fiber.Router,db *gorm.DB){
	postHandler := handler.NewPostHandler(db)

	router.Post("/create",postHandler.CreatePost)
	router.Get("/get/:id",postHandler.GetPostByID)
	router.Get("/getAll",postHandler.GetAllPosts)
	router.Put("/update/:id",postHandler.UpdatePost)
	router.Delete("/delete/:id",postHandler.DeletePost)
}

func CommentRoute(router fiber.Router,db *gorm.DB){
	commentHandler := handler.NewCommentHandler(db)

	router.Post("/create",commentHandler.CreateComment)
	router.Get("/get/:id",commentHandler.GetCommentByID)
	router.Get("/getAll",commentHandler.GetAllComments)
	router.Put("/update/:id",commentHandler.UpdateComment)
	router.Delete("/delete/:id",commentHandler.DeleteComment)
}