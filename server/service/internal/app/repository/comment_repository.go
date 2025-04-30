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

func (r *CommentRepository) Create(comment *model.Comment) (*model.Comment,error) {
	err:=r.db.Create(comment).Error
	return comment,err
}

func (r *CommentRepository) Read(ID uint) (*model.Comment, error) {
    var comment model.Comment
	err := r.db.Preload("Children").First(&comment, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &comment, nil
}

func (r *CommentRepository) Check(ID uint) ( error) {
    var comment model.Comment
	err := r.db.First(&comment, "ID = ?", ID).Error
    if err != nil {
        return err 
    }
    return  nil
}

func (r *CommentRepository) ReadAll() ([]model.Comment, error) {
	var comments []model.Comment
	err := r.db.Find(&comments).Error
	if err != nil {
		return nil, err
	}
	return comments, nil
}

func (r *CommentRepository) Update(ID uint,data model.Comment) (*model.Comment,error){
	var comment model.Comment
	if err:= r.db.Model(&comment).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&comment, ID)
	return &comment,nil
}

func (r *CommentRepository) Delete(ID uint) (error){
	var comment model.Comment
	return  r.db.Delete(&comment,ID).Error
	
}