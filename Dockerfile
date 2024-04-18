FROM node:16 as builder
WORKDIR /usr/src/app
COPY maritime/package.json maritime/package-lock.json ./
RUN npm install
COPY maritime/ ./
RUN npm run build
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
