#!/usr/bin/env sh
set -eu

envsubst '${API_HOST} ${API_PORT} ${STATIC_HOST} ${STATIC_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
