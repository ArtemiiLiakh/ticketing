FROM node:alpine as common
WORKDIR /app/common
COPY ./common/package.json ./package.json
RUN npm install
COPY ./common .
RUN npm run build


FROM node:alpine as tickets
WORKDIR /app/tickets
COPY ./package.json /app
COPY ./tickets/package.json ./package.json
COPY ./common/package.json /app/common/package.json
COPY --from=common /app/common/dist /app/common/dist
RUN npm install --omit=dev
COPY ./tickets .


FROM node:alpine as run
WORKDIR /app
COPY --from=common /app/common/dist ./common/dist
COPY --from=common /app/common/package.json ./common
COPY --from=tickets /app/package.json .
COPY --from=tickets /app/node_modules ./node_modules
COPY --from=tickets /app/tickets ./tickets

WORKDIR /app/tickets
EXPOSE 5001

CMD ["npm", "start"]