FROM node:14-alpine

WORKDIR ./:/usr/node_movie

COPY package*.json .

RUN npm install

EXPOSE 3001

CMD npm run dev

