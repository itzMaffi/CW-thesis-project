# syntax=docker/dockerfile:1

# Base Node Image
FROM node:20.9.0-slim AS build
WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Copy package.json and package-lock.json for the Agenda-client
COPY Agenda-client/package*.json ./Agenda-client/

# Change to Agenda-client directory
WORKDIR /app/Agenda-client

# Install node modules
RUN npm ci --include=dev

# Copy application code from Agenda-client
COPY Agenda-client/ ./

# Build the application
RUN npm run build

# Final Stage - Nginx to serve the client
FROM nginx:alpine
COPY --from=build /app/Agenda-client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
