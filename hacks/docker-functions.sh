#!/usr/bin/env sh
. ./hacks/git-functions.sh

docker__build_all() {
  git_tag="$(git__get_tag_without_v)"

  docker build ./frontend -f frontend/Dockerfile -t aallbrig/frontend:latest -t aallbrig/frontend:"${git_tag}"
  docker build ./api -f api/Dockerfile -t aallbrig/api:latest -t aallbrig/api:"${git_tag}"
  docker build ./nginx -f nginx/Dockerfile -t aallbrig/nginx:latest -t aallbrig/nginx:"${git_tag}"
}

docker__publish_all() {
  git_tag="$(git__get_tag_without_v)"

  docker push aallbrig/api:"${git_tag}"
  docker push aallbrig/api:latest
  docker push aallbrig/nginx:"${git_tag}"
  docker push aallbrig/nginx:latest
  docker push aallbrig/frontend:"${git_tag}"
  docker push aallbrig/frontend:latest
}

docker__run_all() {
  docker network create --driver bridge web-gaming-sandbox || true
  docker run -d --name frontend --network web-gaming-sandbox aallbrig/frontend:latest
  docker run -d --name api --network web-gaming-sandbox aallbrig/api:latest
  docker run -d \
    -p9000:80 \
    -e STATIC_HOST="frontend" \
    -e STATIC_PORT="8080" \
    -e API_HOST="api" \
    -e API_PORT="8080" \
    --name nginx \
    --network \
    web-gaming-sandbox aallbrig/nginx:latest
}

docker__stop_all() {
  docker stop nginx || true
  docker rm nginx || true
  docker stop frontend || true
  docker rm frontend || true
  docker stop api || true
  docker rm api || true
  docker network rm web-gaming-sandbox || true
}
