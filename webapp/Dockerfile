FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/arquisoft/lomap_es1b1
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="https://localhost:5000/api"
ARG APP_URI="https://localhost:443"
ARG API_KEY_GOOGLE_MAPS
ENV REACT_APP_API_URI=$API_URI
ENV REACT_APP_APP_URI=$APP_URI
ENV REACT_APP_API_KEY_GOOGLE_MAPS=$API_KEY_GOOGLE_MAPS

#Create an optimized version of the webapp
RUN npm run build

#Execute npm run prod to run the server
#CMD [ "npm", "run", "prod" ]
CMD ["npm", "start"]
