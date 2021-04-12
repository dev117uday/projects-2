package db

import "github.com/go-redis/redis/v8"

var rdb *redis.Client

func LoadRedisConfig() {
	rdb := redis.NewClient()
}
