FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es1b1
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG MONGODB_URI
ENV REACT_APP_MONGODB_URI=$MONGODB_URI

CMD [ "npm", "start" ]
