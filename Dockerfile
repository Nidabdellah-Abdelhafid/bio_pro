# Base image
FROM node:12-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json m

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build Angular app
RUN npm install

# Set command to serve Angular app
CMD ["npm", "start"]
