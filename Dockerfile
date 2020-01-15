FROM node:12-alpine

WORKDIR /usr/app

COPY . .

ENV NODE_ENV production

RUN yarn install --production

CMD ["yarn", "start"]
