FROM node:14.8.0-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=builder app/dist /usr/share/nginx/html
