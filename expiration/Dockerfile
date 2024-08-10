FROM node:alpine as common
WORKDIR /app/common
COPY ./common/package.json ./package.json
RUN npm install
COPY ./common .
RUN npm run build


FROM node:alpine as expiration
WORKDIR /app/expiration
COPY ./package.json /app
COPY ./common/package.json /app/common/package.json
COPY --from=common /app/common/dist /app/common/dist
COPY ./expiration/package.json ./package.json
RUN npm install --omit=dev
COPY ./expiration .


FROM node:alpine as run
WORKDIR /app
COPY --from=common /app/common/dist ./common/dist
COPY --from=common /app/common/package.json ./common
COPY --from=expiration /app/expiration ./expiration
COPY --from=expiration /app/package.json .
COPY --from=expiration /app/node_modules ./node_modules

WORKDIR /app/expiration
EXPOSE 5003

CMD ["npm", "start"]