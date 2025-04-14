package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


func InitDB() (*gorm.DB,error){
	dsn := "host=localhost user=postgres password=readit dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Kolkata"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Coudn't run postgres")
	}
	return db,nil

}