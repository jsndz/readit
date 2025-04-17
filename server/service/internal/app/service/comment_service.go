package service

import (
	"github.com/readit/internal/app/model"
	"github.com/readit/internal/app/repository"
	"gorm.io/gorm"
)

type CommentService struct {
	commentRepo *repository.CommentRepository
}

func NewCommentService (db *gorm.DB) *CommentService{
	return &CommentService{
		commentRepo: repository.NewCommentRepository(db),
	}
}

func (s *CommentService) CreateComment(data model.Comment) error {
	return s.commentRepo.Create(&data)
}

func (s *CommentService) GetCommentByID(id uint) (*model.Comment, error) {
	return s.commentRepo.Read(id)
}

func (s *CommentService) GetAllComments() ([]model.Comment, error) {
	return s.commentRepo.ReadAll()
}

func (s *CommentService) UpdateComment(id uint, data model.Comment) (*model.Comment, error) {
	return s.commentRepo.Update(id, data)
}

func (s *CommentService) DeleteComment(id uint) error {
	return s.commentRepo.Delete(id)
}