FROM node:latest

RUN mkdir /app
WORKDIR /app

CMD yarn && yarn start
