ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

FROM base AS build

RUN npm install -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts

COPY --link . .

RUN pnpm run build

FROM base

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]