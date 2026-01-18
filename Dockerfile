# ================================
# Stage 1: Build the application
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ================================
# Stage 2: Production image
# ================================
FROM node:20-alpine AS production

ARG VERSION=1.0.0

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy server and entrypoint
COPY server.js ./
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Copy default config
COPY public/config.json ./dist/config.json

# Add Open Container Initiative labels
LABEL org.opencontainers.image.title="Home Links"
LABEL org.opencontainers.image.description="An elegant and modern home page to organize your favorite links"
LABEL org.opencontainers.image.vendor="Home Links"
LABEL org.opencontainers.image.version="${VERSION}"

# Change ownership to non-root user
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["./entrypoint.sh"]
