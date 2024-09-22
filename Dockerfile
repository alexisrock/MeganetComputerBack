FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "ts-node", "index.ts" ]