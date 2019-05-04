FROM node:carbon-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app deps
COPY package*.json /usr/src/app/

RUN npm install --production
COPY . /usr/src/app

# ENV here
ENV NODE_ENV=production
ENV TOEC_SECRET=toecsecret
ENV TOEC_DBUSER_ID=root
ENV TOEC_DBUSER_PW=samick17
ENV TOEC_DB_HOST=host.docker.internal
ENV TOEC_DB_PORT=3306 TOEC_DB_NAME=db

EXPOSE 54000

CMD ["npm", "start"]
