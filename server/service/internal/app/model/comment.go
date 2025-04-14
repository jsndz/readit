package model


type Comment struct {
	ID      uint   `gorm:"primaryKey"`
	Content string `gorm:"type:text"`

	UserID  uint
	User    User    `gorm:"foreignKey:UserID"`

	PostID  uint
	Post    Post    `gorm:"foreignKey:PostID"`
}
