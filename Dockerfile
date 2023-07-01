# REACT
FROM node:14-alpine as react-build
# by only copying package.json, before running npm install. We can leverage dockers caching strategy for steps. Otherwise docker needs to run npm install every time you change any of the code.
COPY package.json ./
RUN npm install
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui
COPY . .
# in this step the static React files are created. For more info see package.json
RUN npm run build

# Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

RUN rm -rf /usr/share/nginx/html/*
COPY --from=react-build /app-ui/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

