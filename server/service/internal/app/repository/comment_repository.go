package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type CommentRepository struct{
	db *gorm.DB
}


func NewCommentRepository(db *gorm.DB) *CommentRepository {
	return &CommentRepository{db: db}
}

func (r *CommentRepository) Create(comment *model.Comment) error {
	return r.db.Create(comment).Error
}

func (r *CommentRepository) Read(ID string) (*model.Comment, error) {
    var comment model.Comment

	err := r.db.Preload("Comments").First(&comment, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &comment, nil
}


func (r *CommentRepository) Update(ID string,data map[string]any) (*model.Comment,error){
	var comment model.Comment
	if err:= r.db.Model(&comment).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&comment, ID)
	return &comment,nil
}

func (r *CommentRepository) Delete(ID string) (error){
	var comment model.Comment
	return  r.db.Delete(&comment,ID).Error
	
}