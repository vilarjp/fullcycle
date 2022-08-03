FROM golang:alpine AS builder

WORKDIR /build

COPY hello-world.go .

RUN go build -ldflags="-s -w" hello-world.go

FROM scratch AS main

WORKDIR /app

COPY --from=builder /build /app

CMD ["./hello-world"]