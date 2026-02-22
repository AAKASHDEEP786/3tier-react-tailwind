# -------------------------
# Stage 1: Install dependencies
# -------------------------
FROM node:18 AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# -------------------------
# Stage 2: Lightweight runtime image
# -------------------------
FROM node:18-slim

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN adduser --disabled-password --gecos "" appuser

WORKDIR /app

ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app /app

# Set permissions
RUN chown -R appuser /app
USER appuser

# Expose backend port
EXPOSE 5000

# Container Healthcheck (checks only server liveness)
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start server
CMD ["node", "server.js"]