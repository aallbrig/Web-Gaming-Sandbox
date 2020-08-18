FROM nginx:1.19-alpine

ENV STATIC_HOST frontend
ENV STATIC_PORT 8080

ENV API_HOST localhost
ENV API_PORT 8888

COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
