FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["npm", "start"]

# Dev target used by docker-compose
FROM base AS dev
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
