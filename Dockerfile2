# REACT
FROM node:14-alpine as react-build

# Install dependencies
WORKDIR /app-ui
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# RUN rm -rf /usr/share/nginx/html/*
COPY --from=react-build /app-ui/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

