package model

type Post struct {
	ID         uint     `gorm:"primaryKey"`
	Title      string   `gorm:"type:varchar(255)"`
	Content    string   `gorm:"type:text"`

	UserID     uint
	User       User     `gorm:"foreignKey:UserID"`

	Comments   []Comment

	HeartID    uint
	Heart      Heart    `gorm:"foreignKey:HeartID"`

	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`

	Tag []Tag `gorm:"many2many:post_tags;"`
}
