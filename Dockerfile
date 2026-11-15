# Production Dockerfile for HC Group Backend (Context: root repository)
FROM node:20-alpine

# Install build dependencies for native compilation (sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency definition
COPY backend/package*.json ./backend/

# Install production dependencies
RUN cd backend && npm ci --only=production

# Copy backend source and database seed files
COPY backend ./backend
COPY database ./database

# Create persistent storage mount point for Coolify persistent volumes
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=5001
ENV DB_PATH=/app/data/market.db
ENV DB_INIT_DIR=/app/database

WORKDIR /app/backend

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/v1/status || exit 1

CMD ["node", "server.js"]
