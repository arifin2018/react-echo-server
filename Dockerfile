
# 1. For build React app
FROM node:20.5.1-alpine

# # Set working directory
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app
# ENV PORT=3004
# EXPOSE 3004

CMD [ "npm", "start" ]

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install
# COPY . .
# EXPOSE 3000

# CMD [ "npm", "start" ]