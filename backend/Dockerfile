FROM node:24.14.1

WORKDIR /linkr

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]