FROM node:20-alpine

RUN mkdir -p /home/docker/app

COPY . /home/docker/app/

WORKDIR /home/docker/app

RUN npm install

ENV ENV=DEV \
    PORT=3000

CMD [ "npm", "start" ]

