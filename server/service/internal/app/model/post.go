package model

type Post struct {
	ID       uint   `gorm:"primaryKey"`
	Title    string `gorm:"type:varchar(255)"`
	Content  string `gorm:"type:text"`

	Likes    uint
	Dislikes uint

	Tags     string

	UserID   uint
	
	Comments []Comment `gorm:"foreignKey:PostID"`
}
