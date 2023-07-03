FROM node:17-alpine3.12
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install # -g npm@8.9.0
COPY . .
EXPOSE 3000
CMD ["npm", "start"]