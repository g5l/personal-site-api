FROM node:12-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3030

CMD ["node", "server.js"]