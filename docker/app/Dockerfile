ARG NODE_VERSION=22

# ----------------------- Stage builder -----------------------
FROM node:${NODE_VERSION}-alpine AS builder
ENV LANG=C.UTF-8

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm && npm cache clean --force

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

# Build
RUN pnpm build:prod

# Load private environment variables
RUN grep -E '^(API_BASE_URL|NEXT_AUTH_URL|NEXT_AUTH_SECRET|CDN_KEY|SCHOOL_ID|SCHOOL_TYPE|SCHOOL_API_KEY)=' .env > .env.runtime

# ----------------------- Stage runner -----------------------
FROM node:${NODE_VERSION}-alpine AS runner
ENV LANG=C.UTF-8
ENV NODE_ENV=production

WORKDIR /app

# Install pnpm in the runner stage
RUN npm install -g pnpm

# Copy the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder /app/.env.runtime ./.env

#COPY ./docker/app/entrypoint.sh ./entrypoint.sh
#COPY docker/app/entrypoint.sh ./entrypoint.sh
COPY docker/app/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Install production dependencies
RUN pnpm install --prod --ignore-scripts
RUN pnpm add dotenv-cli --ignore-scripts

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
