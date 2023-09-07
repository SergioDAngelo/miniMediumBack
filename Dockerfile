FROM node:18-slim AS builder

WORKDIR /mediumapp-back

COPY package*.json ./
COPY tsconfig.json ./

COPY . .

RUN npm run db:generate
RUN npm run build

# Expone el puerto en el que escuchará tu aplicación Express.js
EXPOSE 8080

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD ["npm", "start"]

