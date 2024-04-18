FROM node:16 as builder
WORKDIR /usr/src/app
COPY maritime-app/package.json maritime-app/package-lock.json ./
RUN npm install
COPY maritime-app/ ./
RUN npm run build
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
