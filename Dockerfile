FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 5000

CMD [ "node", "build/index.js" ]