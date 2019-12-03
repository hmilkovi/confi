FROM node:13.2.0-alpine3.10

RUN mkdir /app

COPY . /app
WORKDIR /app
RUN npm i

CMD ["node", "app.js"]