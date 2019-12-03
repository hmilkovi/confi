FROM node:13.2.0-alpine3.10

RUN mkdir /app

COPY . /app
WORKDIR /app
RUN npm i

EXPOSE 3000

CMD ["node", "app.js"]