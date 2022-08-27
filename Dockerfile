FROM node:16.13.2-alpine as build
WORKDIR /app

COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN yarn build

#FROM nginx:1.21.6-alpine
FROM nginx:1.21.6
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/ngnix.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

