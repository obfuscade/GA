FROM node:20-alpine

WORKDIR /app/backend

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]