#!/usr/bin/env sh

docker build ./frontend -f frontend/Dockerfile -t frontend
docker build ./api -f api/Dockerfile -t api
docker build ./nginx -f nginx/Dockerfile -t nginx

docker network create --driver bridge web-gaming-sandbox || true
docker run -d --name frontend --network web-gaming-sandbox frontend
docker run -d --name api --network web-gaming-sandbox api
docker run -d \
  -p9000:80 \
  -e STATIC_HOST="frontend" \
  -e STATIC_PORT="8080" \
  -e API_HOST="api" \
  -e API_PORT="8080" \
  --name nginx \
  --network \
  web-gaming-sandbox nginx
