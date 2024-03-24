FROM node:20 AS build-env

COPY . /app

WORKDIR /app

RUN npm i

RUN npm run drizzle-kit:push

RUN npm run build

RUN npm ci --omit dev

FROM gcr.io/distroless/nodejs20-debian12:latest

COPY --from=build-env /app /app

WORKDIR /app

EXPOSE 8009

CMD ['HOST','=','127.0.0.1', 'PORT','=','8009','node','build']
