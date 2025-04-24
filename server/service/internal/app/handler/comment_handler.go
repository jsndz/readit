package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/readit/internal/app/model"
	"github.com/readit/internal/app/service"
	"gorm.io/gorm"
)

type CommentHandler struct{
	commentService *service.CommentService
}

func NewCommentHandler(db *gorm.DB) * CommentHandler {
	return &CommentHandler{
		commentService: service.NewCommentService(db),
	}
}

func (h *CommentHandler) CreateComment (c *fiber.Ctx) error{
	var req model.Comment

	if err:= c.BodyParser(&req);err!=nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Invalid request body",
			"success": false,
			"err":     err.Error(),
		})
	}
	err := h.commentService.CreateComment(req)
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


func (h *CommentHandler) GetCommentByID(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Comment ID is required",
			"success": false,
			"err":     "missing comment ID",
		})
	}
	commentID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    nil,
			"message": "Invalid comment ID",
			"success": false,
			"err":     err.Error(),
		})
	}
	comment, err := h.commentService.GetCommentByID(uint(commentID))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Coudn't lfetch comment",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    comment,
		"message": "Comment fetched successfully",
		"success": true,
		"err":     nil,
	})
}


func (h *CommentHandler) GetAllComments(c *fiber.Ctx) error {
	comments, err := h.commentService.GetAllComments()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":    nil,
			"message": "Failed to fetch comments",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    comments,
		"message": "Comments fetched successfully",
		"success": true,
		"err":     nil,
	})
}

func (h *CommentHandler) UpdateComment(c *fiber.Ctx) error {
	idParam := c.Params("id")
	commentID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid comment ID",
			"success": false,
			"err":     err.Error(),
		})
	}

	var updateData model.Comment
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
			"success": false,
			"err":     err.Error(),
		})
	}

	updatedComment, err := h.commentService.UpdateComment(uint(commentID), updateData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update comment",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    updatedComment,
		"message": "Comment updated successfully",
		"success": true,
	})
}

func (h *CommentHandler) DeleteComment(c *fiber.Ctx) error {
	idParam := c.Params("id")
	commentID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid comment ID",
			"success": false,
			"err":     err.Error(),
		})
	}

	if err := h.commentService.DeleteComment(uint(commentID)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete comment",
			"success": false,
			"err":     err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Comment deleted successfully",
		"success": true,
	})
}
