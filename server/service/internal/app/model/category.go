package model

type Category struct {
	ID    uint   `gorm:"primaryKey"`
	Name  string `gorm:"unique;not null"`
	
	Posts []Post `gorm:"foreignKey:CategoryID"`
}
