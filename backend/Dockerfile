FROM node:16-alpine

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install
RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . /usr/src/backend


EXPOSE 8080
CMD [ "npm", "start" ]
