package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type HeartRepository struct{
	db *gorm.DB
}


func NewHeartRepository(db *gorm.DB) *HeartRepository {
	return &HeartRepository{db: db}
}

func (r *HeartRepository) Create(heart *model.Heart) error {
	return r.db.Create(heart).Error
}

func (r *HeartRepository) Read(ID string) (*model.Heart, error) {
    var heart model.Heart

	err := r.db.Preload("Hearts").First(&heart, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &heart, nil
}


func (r *HeartRepository) Update(ID string,data map[string]any) (*model.Heart,error){
	var heart model.Heart
	if err:= r.db.Model(&heart).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&heart, ID)
	return &heart,nil
}

func (r *HeartRepository) Delete(ID string) (error){
	var heart model.Heart
	return  r.db.Delete(&heart,ID).Error
	
}