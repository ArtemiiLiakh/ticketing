FROM node:alpine as common
WORKDIR /app/common
COPY ./common/package.json ./package.json
RUN npm install
COPY ./common .
RUN npm run build


FROM node:alpine as orders
WORKDIR /app/orders
COPY ./package.json /app
COPY ./common/package.json /app/common/package.json
COPY --from=common /app/common/dist /app/common/dist
COPY ./orders/package.json ./package.json
RUN npm install --omit=dev
COPY ./orders .


FROM node:alpine as run
WORKDIR /app
COPY --from=common /app/common/dist ./common/dist
COPY --from=common /app/common/package.json ./common
COPY --from=orders /app/package.json .
COPY --from=orders /app/node_modules ./node_modules
COPY --from=orders /app/orders ./orders

WORKDIR /app/orders
EXPOSE 5002

CMD ["npm", "start"]