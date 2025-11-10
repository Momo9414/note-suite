# Multi-stage build for Angular Frontend

# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy source
COPY . .

# Build for production
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:1.25-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /build/dist/notes-frontend/browser /usr/share/nginx/html

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
