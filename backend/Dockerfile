# Stage 1: Build dependencies in a full node image
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy rest of the app
COPY . .

# Stage 2: Run app in a slim image
FROM node:18-slim

# Create a non-root user
RUN adduser --disabled-password --gecos "" appuser

WORKDIR /app

#NODE_ENV is set to production to optimize performance and security
ENV NODE_ENV=production

# Copy only the built app and node_modules from builder
COPY --from=builder /app /app

# Set ownership and switch to non-root
RUN chown -R appuser /app
USER appuser

# Expose app port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
