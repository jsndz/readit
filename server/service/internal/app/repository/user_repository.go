package repository

import (
	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

type UserRepository struct{
	db *gorm.DB
}


func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *model.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) Read(ID string) (*model.User, error) {
    var user model.User

	err := r.db.Preload("Users").First(&user, "ID = ?", ID).Error
    if err != nil {
        return nil, err 
    }
    return &user, nil
}

func (r *UserRepository) Update(ID string,data map[string]any) (*model.User,error){
	var user model.User
	if err:= r.db.Model(&user).Where("ID = ?", ID).Updates(data).Error; err!=nil{
		return nil, err
	}
	r.db.First(&user, ID)
	return &user,nil
}

func (r *UserRepository) Delete(ID string) (error){
	var user model.User
	return  r.db.Delete(&user,ID).Error
	
}