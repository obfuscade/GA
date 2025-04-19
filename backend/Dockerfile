FROM node:latest

WORKDIR /app/backend

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "start"]