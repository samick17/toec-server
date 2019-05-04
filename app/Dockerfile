FROM node:8.16.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app deps
COPY package*.json /usr/src/app/

RUN npm install --production
COPY . /usr/src/app

# ENV here
ENV NODE_ENV=production

EXPOSE 54000

CMD ["npm", "start"]
