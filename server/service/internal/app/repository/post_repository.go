package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type PostRepository struct{
	db *gorm.DB
}


func NewPostRepository(db *gorm.DB) *PostRepository {
	return &PostRepository{db: db}
}

func (r *PostRepository) Create(post *model.Post) error {
	return r.db.Create(post).Error
}

func (r *PostRepository) Read(ID string) (*model.Post, error) {
    var post model.Post

	err := r.db.Preload("Comments").First(&post, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &post, nil
}


func (r *PostRepository) Update(ID string,data map[string]any) (*model.Post,error){
	var post model.Post
	if err:= r.db.Model(&post).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&post, ID)
	return &post,nil
}

func (r *PostRepository) Delete(ID string) (error){
	var post model.Post
	return  r.db.Delete(&post,ID).Error
	
}