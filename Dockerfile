FROM node:12-alpine

COPY . .

RUN yarn

EXPOSE 3030

CMD ["node", "server.js"]