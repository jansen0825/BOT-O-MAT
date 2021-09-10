FROM node:12.16-alpine as client

RUN apk update && apk add bash git && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --check-files

COPY . /app

CMD ["yarn", "start"]