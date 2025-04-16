package service

import (
	"fmt"

	"github.com/jsndz/readit/auth/internal/app/model"
	"github.com/jsndz/readit/auth/internal/app/repository"
	"github.com/jsndz/readit/auth/pkg/utils"
	"gorm.io/gorm"
)


type UserService struct {
	userRepo   *repository.UserRepository
}

func NewUserService (db *gorm.DB) * UserService {
	return &UserService{
		userRepo: repository.NewUserRepository(db),
	}
}


func (s *UserService) Signup(data model.User)(string,error){
	err := s.userRepo.Create(&data);
	if  err != nil {
		return "",err
	}
	jwt_token, err := utils.GenerateJWT(data.Email)
	if  err != nil {
		return "",err
	}
	return jwt_token,nil
}

func (s *UserService) Signin(Email string,Password string)(string,error){
	var user *model.User
	user, err := s.userRepo.Get(Email)
	if  err != nil {
		return "", fmt.Errorf("user doesn't exist")
	}

	if !model.CheckPassword(user.Password,Password) {
		return "", fmt.Errorf("invalid credentials")
	}

	jwt_token, err := utils.GenerateJWT(Email)

	if  err != nil {
		return "",err
	}
	return jwt_token,nil
}