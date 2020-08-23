FROM golang:1.15 AS development

RUN go get github.com/go-delve/delve/cmd/dlv

RUN mkdir -p /app
WORKDIR /app

COPY go.mod .
# COPY go.sum .
RUN go mod download

COPY . .

RUN go build -gcflags "all=-N -l" github.com/aallbrig/web-gaming-sandbox-api
CMD ["dlv", "debug", "--listen=0.0.0.0:40000", "--headless=true", "--api-version=2", "--accept-multiclient", "exec", "./web-gaming-sandbox-api"]
ENTRYPOINT ["./web-gaming-sandbox-api"]
EXPOSE 8000 40000

