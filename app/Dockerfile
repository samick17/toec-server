FROM node:carbon-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app deps
COPY package*.json /usr/src/app/

RUN npm install --production
COPY . /usr/src/app

# ENV here
ENV NODE_ENV=production
ENV TOEC_SECRET=${TOEC_SECRET}
ENV TOEC_DBUSER_ID=${TOEC_DBUSER_ID}
ENV TOEC_DBUSER_PW=${TOEC_DBUSER_PW}
ENV TOEC_DB_HOST=${TOEC_DB_HOST}
ENV TOEC_DB_PORT=${TOEC_DB_PORT}
ENV TOEC_DB_NAME=${TOEC_DB_NAME}

EXPOSE ${INTERNAL_SERVER_PORT}

CMD ["npm", "start"]
