# FROM node:12-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# COPY . .
# RUN npm install
# RUN npm run build

FROM node:12-alpine AS server
WORKDIR /app
COPY package* ./
COPY ./dist ./dist
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"]
