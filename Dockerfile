FROM node:20

WORKDIR /usr/src/app

# Copiar todos los archivos, excluyendo aquellos definidos en .dockerignore..
COPY . ./

RUN yarn install

RUN yarn build

CMD ["npm", "start"]
