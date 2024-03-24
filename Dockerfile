FROM node:20

COPY . /app

WORKDIR /app

RUN npm i

RUN npm run drizzle-kit:push

RUN npm run build

RUN npm ci --omit dev

EXPOSE 8009

CMD ['HOST=127.0.0.1', 'PORT=8009','node','build']
