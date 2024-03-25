FROM node:20 as build-env

COPY . /app

WORKDIR /app

RUN npm i

RUN npm run drizzle-kit:push

RUN npm run build

RUN npm ci --omit dev

FROM gcr.io/distroless/nodejs20-debian11

COPY --from=build-env /app /app

WORKDIR /app

ENV HOST=0.0.0.0

ENV PORT=8009

EXPOSE 8009

CMD ["build"]
