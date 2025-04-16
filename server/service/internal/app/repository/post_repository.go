package repository

import (
	"github.com/readit/internal/app/model"
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type PostRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) *PostRepository {
	return &PostRepository{db: db}
}

func (r *PostRepository) Create(post *model.Post) error {
	if err := r.db.Create(post).Error; err != nil {
		log.Error().Err(err).Msg("Failed to create post")
		return err
	}
	return nil
}

func (r *PostRepository) Read(ID uint) (*model.Post, error) {
	var post model.Post
	err := r.db.Preload("Comments").First(&post, ID).Error
	if err != nil {
		return nil, err
	}
	return &post, nil
}

func (r *PostRepository) ReadAll() ([]model.Post, error) {
	var posts []model.Post
	err := r.db.Preload("Comments").Find(&posts).Error
	if err != nil {
		return nil, err
	}
	return posts, nil
}

func (r *PostRepository) Update(ID uint, data map[string]any) (*model.Post, error) {
	var post model.Post
	if err := r.db.Model(&post).Where("id = ?", ID).Updates(data).Error; err != nil {
		return nil, err
	}
	if err := r.db.First(&post, ID).Error; err != nil {
		return nil, err
	}
	return &post, nil
}

func (r *PostRepository) Delete(ID uint) error {
	return r.db.Delete(&model.Post{}, ID).Error
}
