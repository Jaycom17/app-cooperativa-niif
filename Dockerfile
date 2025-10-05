# Etapa 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_PAGE_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PAGE_URL=$VITE_PAGE_URL

RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
