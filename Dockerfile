FROM node:latest as builder
COPY package.json package-lock.json ./
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build --output-path=dist

FROM nginx:latest
COPY .nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/terrible-spa/ /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html/*
CMD ["nginx", "-g", "daemon off;"]
