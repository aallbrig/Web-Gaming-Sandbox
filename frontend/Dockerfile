FROM node:14.8.0-alpine AS development

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "serve-dev"]

FROM node:14.8.0-alpine AS builder

COPY --from=development /app .
RUN npm run build

FROM node:14.8.0-alpine AS production
COPY --from=builder dist .
CMD ["npm", "run", "serve"]
EXPOSE 8080
