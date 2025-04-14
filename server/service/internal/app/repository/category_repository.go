package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type CategoryRepository struct{
	db *gorm.DB
}


func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{db: db}
}

func (r *CategoryRepository) Create(category *model.Category) error {
	return r.db.Create(category).Error
}

func (r *CategoryRepository) Read(ID string) (*model.Category, error) {
    var category model.Category

	err := r.db.Preload("Comments").First(&category, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &category, nil
}


func (r *CategoryRepository) Update(ID string,data map[string]any) (*model.Category,error){
	var category model.Category
	if err:= r.db.Model(&category).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&category, ID)
	return &category,nil
}

func (r *CategoryRepository) Delete(ID string) (error){
	var category model.Category
	return  r.db.Delete(&category,ID).Error
	
}