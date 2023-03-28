FROM node:19

WORKDIR /app

COPY "./build" "/app"
COPY "./node_modules" "/app/node_modules"

EXPOSE 8080

CMD [ "node", "index.js" ]