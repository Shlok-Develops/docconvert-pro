FROM node:18-slim

# Install LibreOffice, ImageMagick, and other dependencies
RUN apt-get update && apt-get install -y \
    libreoffice \
    imagemagick \
    ghostscript \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy application files
COPY . .

# Build client
RUN npm run build

# Create necessary directories
RUN mkdir -p uploads converted

EXPOSE 3001

CMD ["npm", "start"]
