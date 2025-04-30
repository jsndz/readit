package db

import (
	"log"

	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

func MigrateDB(db *gorm.DB) {
	err := db.AutoMigrate(
		&model.Comment{},
		&model.Post{},
	)
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}
	log.Println("Database migrated successfully")

	// Sample data
	posts := []model.Post{
		{Title: "Welcome to ReadIt!", Content: "This is the first post.", Likes: 10, Dislikes: 1, Tags: "intro,announcement", UserID:1, Topic: "News"},
		{Title: "Best programming languages in 2025", Content: "Let's discuss!", Likes: 20, Dislikes: 2, Tags: "tech,programming", UserID:1, Topic: "Tech"},
		{Title: "Top games released this year", Content: "Gaming is evolving fast.", Likes: 15, Dislikes: 3, Tags: "games,review", UserID:1, Topic: "Gaming"},
		{Title: "Investing 101", Content: "Basics of investing your money.", Likes: 25, Dislikes: 1, Tags: "finance,beginners", UserID:1, Topic: "Finance"},
		{Title: "Modern art or nonsense?", Content: "What's your take on abstract art?", Likes: 8, Dislikes: 5, Tags: "art,debate", UserID: 1, Topic: "Art"},
		{Title: "Tips for online learning", Content: "Remote education is here to stay.", Likes: 12, Dislikes: 2, Tags: "education,tips", UserID:1, Topic: "Education"},
		{Title: "Breaking news: AI in every home", Content: "How AI is changing daily life.", Likes: 18, Dislikes: 4, Tags: "ai,future", UserID:1, Topic: "News"},
		{Title: "Funniest memes of the week", Content: "Laughter guaranteed!", Likes: 30, Dislikes: 1, Tags: "memes,funny", UserID:1, Topic: "Memes"},
		{Title: "Career switch stories", Content: "Real stories of changing paths.", Likes: 11, Dislikes: 0, Tags: "career,motivation", UserID:1, Topic: "Career"},
		{Title: "Your favorite coding music?", Content: "Share your playlists!", Likes: 22, Dislikes: 3, Tags: "tech,music", UserID: 1, Topic: "Tech"},
	}

	// Insert posts
	for i, post := range posts {
		if err := db.Create(&post).Error; err != nil{
			log.Fatalf("Failed to insert post %d: %v", i+1, err)
		}

		// Add at least one comment per post
		comment := model.Comment{
			Content:  "Interesting post!",
			Likes:    uint(3 + i),
			Dislikes: uint(i % 2),
			Username: "user" + string('A'+i),
			PostID:   post.ID,
		}
		if err := db.Create(&comment).Error; err != nil {
			log.Fatalf("Failed to insert comment for post %d: %v", i+1, err)
		}

		// On the first post, add a reply (nested comment)
		if i == 0 {
			reply := model.Comment{
				Content:  "I agree!",
				Likes:    2,
				Dislikes: 0,
				Username: "replyUser",
				PostID:   post.ID,
				ParentID: &comment.ID,
			}
			if err := db.Create(&reply).Error; err != nil {
				log.Fatal("Failed to insert nested comment: ", err)
			}
		}
	}

	log.Println("Seed data (10 posts and comments) inserted successfully")
}
