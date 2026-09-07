ARG NODE_VERSION=22

# ----------------------- Stage builder -----------------------
FROM node:${NODE_VERSION}-alpine AS builder
ENV LANG=C.UTF-8

WORKDIR /app

# Configuration de pnpm avec tolérance réseau élevée
RUN npm install -g pnpm && npm cache clean --force \
    && pnpm config set fetch-timeout 300000 \
    && pnpm config set fetch-retry-maxtimeout 120000 \
    && pnpm config set fetch-retry-mintimeout 20000 \
    && pnpm config set fetch-retries 5 \
    && pnpm config set network-concurrency 4

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

# Build
RUN pnpm build:prod

# Extraction des variables d'environnement
RUN grep -E '^(API_BASE_URL|CDN_URL|NEXT_AUTH_URL|NEXT_PUBLIC_WEBSITE_URL|NEXT_PUBLIC_WS_URL|NEXT_AUTH_SECRET|CDN_KEY|SCHOOL_ID|SCHOOL_TYPE|SCHOOL_API_KEY)=' .env > .env.runtime

# ----------------------- Stage runner -----------------------
FROM node:${NODE_VERSION}-alpine AS runner
ENV LANG=C.UTF-8
ENV NODE_ENV=production

WORKDIR /app

# Configuration réseau identique pour l'étape de production
RUN npm install -g pnpm \
    && pnpm config set fetch-timeout 300000 \
    && pnpm config set network-concurrency 4

# OPTIMISATION : Copier le store pnpm ou utiliser le mode offline si possible.
# À défaut, on copie les fichiers nécessaires
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Installation des dépendances de production AVANT de copier le reste du code
# Cela évite de retélécharger si seul votre code Next.js change
RUN pnpm install --prod --ignore-scripts \
    && pnpm add dotenv-cli --ignore-scripts

# Copie du build et des assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.runtime ./.env

COPY docker/app/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
