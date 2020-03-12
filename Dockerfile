FROM node:12-alpine

WORKDIR /app

COPY . /app

ENV  NODE_ENV=dev

RUN apk add --update bash python

RUN npm i -g pm2 && pm2 install typescript

RUN npm i && npm run build

EXPOSE 3000

CMD ["pm2" , "start" , "./dist/main.js" , "--no-daemon"]
