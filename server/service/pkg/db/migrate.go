package db

import (
	"log"

	"github.com/readit/internal/app/model"
	"gorm.io/gorm"
)

func MigrateDB(db *gorm.DB){

	err:= db.AutoMigrate(
		&model.Comment{},
		&model.Post{},

	)

	if err!=nil {
		log.Fatal("migration failed: ", err)
	}

	log.Println("Database migrated successfully")
}