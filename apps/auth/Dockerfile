FROM node:alpine as common
WORKDIR /app/common
COPY ./common/package.json ./package.json
RUN npm install
COPY ./common .
RUN npm run build


FROM node:alpine as auth
WORKDIR /app/auth
COPY ./package.json /app
COPY ./common/package.json /app/common/package.json
COPY --from=common /app/common/dist /app/common/dist
COPY ./auth/package.json ./package.json
RUN npm install --omit=dev
COPY ./auth .


FROM node:alpine as run
WORKDIR /app
COPY --from=common /app/common/dist ./common/dist
COPY --from=common /app/common/package.json ./common
COPY --from=auth /app/auth ./auth
COPY --from=auth /app/package.json .
COPY --from=auth /app/node_modules ./node_modules

WORKDIR /app/auth
EXPOSE 5000

CMD ["npm", "start"]