# Front-end build image (Vite + React)
# Builds the static assets into /app/dist

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies using pnpm (preferred), then run the project build via npm script
COPY package.json pnpm-lock.yaml ./

# Enable corepack -> pnpm and install deps with a frozen lockfile
RUN corepack enable \
  && corepack prepare pnpm@10.14.0 --activate \
  && pnpm install --frozen-lockfile

# Copy the rest of the front-end sources
COPY . .

# Build using the existing npm script (defined in package.json)
RUN npm run build

# Build artifact will be at /app/dist
# You can copy this directory into your Nginx image build context in CI.

