# Production Dockerfile for HC Group Backend (Context: backend directory)
FROM node:20-alpine

# Install native build tools for sqlite3 compilation
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies first for optimal Docker layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy application code and database files
COPY . .

# Create volume mount directory for persistent storage in Coolify
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=5001
ENV DB_PATH=/app/data/market.db

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/v1/status || exit 1

CMD ["node", "server.js"]
