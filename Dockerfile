FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/

ENTRYPOINT ["nginx", "-g", "daemon off;"]