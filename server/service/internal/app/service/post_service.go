package service

import (
	"github.com/readit/internal/app/repository"
	"gorm.io/gorm"
)


type PostService struct {
	postRepo   *repository.PostRepository
}


func NewPostService (db *gorm.DB) * PostService {
	return &PostService{
		postRepo: repository.NewPostRepository(db),
	}
}