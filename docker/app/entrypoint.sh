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

# Kubernetes secrets can preserve CRLF line endings from the source .env.
# Normalize into a writable temporary file before exporting the variables.
runtime_env="/tmp/admin.env"
tr -d '\r' < ./.env > "$runtime_env"

# Export the mounted Kubernetes configuration so Next.js rewrites use
# the runtime API and CDN endpoints.
set -a
. "$runtime_env"
set +a

# Start the server
echo "🚀 Starting Next.js"
pnpm start:prod
