package model

type Heart struct {
	ID      uint `gorm:"primaryKey"`
	Like    int
	Dislike int
}
