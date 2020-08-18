#!/usr/bin/env sh

docker stop nginx || true
docker rm nginx || true
docker stop frontend || true
docker rm frontend || true
docker network rm web-gaming-sandbox || true
