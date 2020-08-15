FROM node:14.8.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "serve"]
