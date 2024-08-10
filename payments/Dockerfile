FROM node:alpine as common
WORKDIR /app/common
COPY ./common/package.json ./package.json
RUN npm install
COPY ./common .
RUN npm run build


FROM node:alpine as payments
WORKDIR /app/payments
COPY ./package.json /app
COPY ./common/package.json /app/common/package.json
COPY --from=common /app/common/dist /app/common/dist
COPY ./payments/package.json ./package.json
RUN npm install --omit=dev
COPY ./payments .


FROM node:alpine as run
WORKDIR /app
COPY --from=common /app/common/dist ./common/dist
COPY --from=common /app/common/package.json ./common
COPY --from=payments /app/payments ./payments
COPY --from=payments /app/package.json .
COPY --from=payments /app/node_modules ./node_modules

WORKDIR /app/payments
EXPOSE 5001

CMD ["npm", "start"]