FROM node:22-slim

WORKDIR /app

# Copy package files first for layer caching
COPY server/package*.json ./
RUN npm install

# Copy rest of the server code
COPY server/src/ ./src/

EXPOSE 3000

CMD ["node", "--watch", "src/index.js"]
