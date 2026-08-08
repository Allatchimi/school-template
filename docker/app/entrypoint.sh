#!/bin/sh

if [ ! -d ".next" ]; then
    echo "❌ Build directory not found: .next"
    exit 1
fi

# Check the .env file
if [ ! -f ".env" ]; then
    echo "❌ Environment file not found: .env"
    exit 1
fi

# Start the server
echo "🚀 Starting Next.js"
pnpm start:prod
