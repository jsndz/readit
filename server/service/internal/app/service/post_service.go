package service

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/readit/internal/app/model"
	"github.com/readit/internal/app/repository"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)


type PostService struct {
	postRepo   *repository.PostRepository
	redis       *redis.Client
}


func NewPostService (db *gorm.DB,rdb *redis.Client) * PostService {
	return &PostService{
		postRepo: repository.NewPostRepository(db),
		redis:rdb,
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
	ctx := context.Background()
	cached,err := s.redis.Get(ctx,"feed").Result()
	var posts []model.Post
	if err!=nil {
		
		posts,err= s.postRepo.GetRecent(10)
		if err!=nil {
			return nil,err
		}
		jsonData,err := json.Marshal(posts)
		if err!=nil {
			return nil,err 
		}
		err = s.redis.Set(ctx,"feed",jsonData,30*time.Second).Err()
		if err != nil {
			fmt.Println("Redis cache set failed:", err)
		}
		return posts,nil
	}
	if err:=json.Unmarshal([]byte(cached),&posts); err!=nil{
		return nil,err
	}
	return posts,nil

}