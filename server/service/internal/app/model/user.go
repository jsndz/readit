package model

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique;not null"`
	Password string
	Image    string

	Posts    []Post
	Comments []Comment
}
	