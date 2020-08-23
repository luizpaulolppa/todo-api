FROM node:12

WORKDIR /todo_api

COPY package*.json ./

RUN yarn install --silent

COPY . .

EXPOSE 3000
CMD ["yarn", "dev:server"]
