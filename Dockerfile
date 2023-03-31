FROM --platform=linux/amd64 node:19 AS builder

WORKDIR /app

COPY "./build" "/app"
COPY "./node_modules" "/app/node_modules"

EXPOSE 5001

CMD [ "node", "index.js" ]