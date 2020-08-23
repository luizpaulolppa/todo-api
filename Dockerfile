FROM node:12

WORKDIR /todo_api

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev:server"]
