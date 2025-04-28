package model

type Comment struct {
	ID        uint   `gorm:"primaryKey"`
	Content   string `gorm:"type:text"`

	Likes     uint
	Dislikes  uint

	Username    string `gorm:"not "`
	PostID    uint `gorm:"not null"`

	ParentID  *uint
	Children  []Comment `gorm:"foreignKey:ParentID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`

	Post      Post `gorm:"foreignKey:PostID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}


