FROM oven/bun:1 AS build

WORKDIR /app

COPY --link package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY --link . .

RUN bun run build

FROM oven/bun:1-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]