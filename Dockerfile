# syntax=docker/dockerfile:1

FROM node:17
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production̦
COPY . .
EXPOSE 9000
CMD [ "node" ,"app.js" ]
