#!/usr/bin/env sh
. ./hacks/docker-functions.sh

docker__build_all
docker__publish_all
