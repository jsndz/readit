package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/readit/internal/app/model"
	"github.com/readit/internal/app/service"
	"gorm.io/gorm"
)

type PostHandler struct{
	postService *service.PostService
}

func NewPostHandler(db *gorm.DB) * PostHandler {
	return &PostHandler{
		postService: service.NewPostService(db),
	}
}

func (h *PostHandler) CreatePost (c *fiber.Ctx) error{
	var req model.Post

	if err:= c.BodyParser(&req);err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Invalid request body",
			"success": false,
			"err":     err.Error(),
		})
	}
	err := h.postService.CreatePost(req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Couldn't create new user",
			"success": false,
			"err":     err.Error(),
		})
	}
	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
		"data":    nil,
		"message": "Successfully created a new user",
		"success": true,
		"err":     nil,
	})
}


func (h *PostHandler) GetPostByID(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Post ID is required",
			"success": false,
			"err":     "missing post ID",
		})
	}
	postID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Invalid post ID",
			"success": false,
			"err":     err.Error(),
		})
	}

	post, err := h.postService.GetPostByID(uint(postID))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Coudn't lfetch post",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    post,
		"message": "Post fetched successfully",
		"success": true,
		"err":     nil,
	})
}


func (h *PostHandler) GetAllPosts(c *fiber.Ctx) error {
	posts, err := h.postService.GetAllPosts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Failed to fetch posts",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    posts,
		"message": "Posts fetched successfully",
		"success": true,
		"err":     nil,
	})
}

func (h *PostHandler) UpdatePost(c *fiber.Ctx) error {
	idParam := c.Params("id")
	postID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID",
			"success": false,
			"err":     err.Error(),
		})
	}

	var updateData model.Post
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
			"success": false,
			"err":     err.Error(),
		})
	}

	updatedPost, err := h.postService.UpdatePost(uint(postID), updateData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update post",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    updatedPost,
		"message": "Post updated successfully",
		"success": true,
	})
}

func (h *PostHandler) DeletePost(c *fiber.Ctx) error {
	idParam := c.Params("id")
	postID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID",
			"success": false,
			"err":     err.Error(),
		})
	}

	if err := h.postService.DeletePost(uint(postID)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete post",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Post deleted successfully",
		"success": true,
	})
}


func (h *PostHandler) GetFeed(c *fiber.Ctx) error {
	posts, err := h.postService.GenerateFeed()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Failed to fetch posts",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    posts,
		"message": "Posts fetched successfully",
		"success": true,
		"err":     nil,
	})
}
