package service

import (
	"github.com/readit/internal/app/model"
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


func (s *PostService) CreatePost(data model.Post) error {
	return s.postRepo.Create(&data)
}

func (s *PostService) GetPostByID(id uint) (*model.Post, error) {
	return s.postRepo.Read(id)
}

func (s *PostService) GetAllPosts() ([]model.Post, error) {
	return s.postRepo.ReadAll()
}

func (s *PostService) UpdatePost(id uint, data model.Post) (*model.Post, error) {
	return s.postRepo.Update(id, data)
}

func (s *PostService) DeletePost(id uint) error {
	return s.postRepo.Delete(id)
}


func (s * PostService) GenerateFeed()  ([]model.Post,error) {
	return s.postRepo.GetRecent(10)
}