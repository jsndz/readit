FROM golang:1.24.3-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o gateway-service ./cmd/server

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/gateway-service .

EXPOSE 8080

CMD ["./gateway-service"]
