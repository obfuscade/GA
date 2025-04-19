FROM node:latest

WORKDIR /app/frontend

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "start"]