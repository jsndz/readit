package model

type Post struct {
	ID       uint   `gorm:"primaryKey"`
	Title    string `gorm:"type:varchar(255)"`
	Content  string `gorm:"type:text"`
	Likes    uint
	Dislikes uint
	Tags     string
	UserID   uint `gorm:"not null"`
	Topic string `gorm:"type:varchar(50)"`
	Comments []Comment `gorm:"foreignKey:PostID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}


var AllowedTopics = []string{
    "Tech", "Gaming", "Finance", "Art", "Education", "News", "Memes", "Career",
}
