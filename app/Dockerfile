FROM node:8.16.0-alpine

WORKDIR /app
ADD . /app

# ENV here
ENV NODE_ENV=production

# Install app deps.
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 54000

CMD ["npm", "start"]
