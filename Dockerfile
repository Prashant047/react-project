FROM node:18-alpine AS base

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./packag-lock..json

COPY . .

RUN npm install

RUN npm run build

ENV PORT=3000

CMD [ "npm", "start" ]