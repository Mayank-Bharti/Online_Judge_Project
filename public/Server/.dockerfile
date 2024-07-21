FROM node:20.15.1-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD ["node","src/server.js"]