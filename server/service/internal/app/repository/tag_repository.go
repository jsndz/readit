package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type TagRepository struct{
	db *gorm.DB
}


func NewTagRepository(db *gorm.DB) *TagRepository {
	return &TagRepository{db: db}
}

func (r *TagRepository) Create(tag *model.Tag) error {
	return r.db.Create(tag).Error
}

func (r *TagRepository) Read(ID string) (*model.Tag, error) {
    var tag model.Tag

	err := r.db.Preload("Tags").First(&tag, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &tag, nil
}


func (r *TagRepository) Update(ID string,data map[string]any) (*model.Tag,error){
	var tag model.Tag
	if err:= r.db.Model(&tag).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&tag, ID)
	return &tag,nil
}

func (r *TagRepository) Delete(ID string) (error){
	var tag model.Tag
	return  r.db.Delete(&tag,ID).Error
	
}