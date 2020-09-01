#!/usr/bin/env sh

docker build ./frontend -f frontend/Dockerfile -t aallbrig/frontend
docker build ./api -f api/Dockerfile -t aallbrig/api
docker build ./nginx -f nginx/Dockerfile -t aallbrig/nginx

docker network create --driver bridge web-gaming-sandbox || true
docker run -d --name frontend --network web-gaming-sandbox aallbrig/frontend
docker run -d --name api --network web-gaming-sandbox aallbrig/api
docker run -d \
  -p9000:80 \
  -e STATIC_HOST="frontend" \
  -e STATIC_PORT="8080" \
  -e API_HOST="api" \
  -e API_PORT="8080" \
  --name nginx \
  --network \
  web-gaming-sandbox aallbrig/nginx
