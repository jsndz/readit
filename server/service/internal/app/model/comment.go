package model

type Comment struct {
	ID        uint   `gorm:"primaryKey"`
	Content   string `gorm:"type:text"`

	Likes     uint
	Dislikes  uint

	UserID    uint
	PostID    uint

	ParentID  *uint       
	Children  []Comment   `gorm:"foreignKey:ParentID"` 

	Post      Post        `gorm:"foreignKey:PostID"`
}
