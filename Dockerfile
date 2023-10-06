FROM node:20-slim

WORKDIR /app

COPY "./build" "/app"
COPY "./node_modules" "/app/node_modules"

EXPOSE 5001

CMD [ "node", "index.js" ]