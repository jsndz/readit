FROM golang:1.24.3-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o service-service ./cmd/server

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/service-service .

EXPOSE 3002

CMD ["./service-service"]
