package redis

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)
func RedisConnect() *redis.Client {
	redisAddr := os.Getenv("REDIS_ADDR")
	client := redis.NewClient(&redis.Options{
        Addr:	  redisAddr,
        Password: "",
        DB:		  0,  
    })
	ctx := context.Background()

	err := client.Set(ctx, "foo", "bar", 0).Err()
	if err != nil {
		panic(err)
	}

	val, err := client.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}

	fmt.Println("foo", val)
	return client
}