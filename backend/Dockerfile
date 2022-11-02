FROM node:14.9

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY package-lock.json ./


COPY ./ ./
RUN npm install
RUN npm install -g typescript

CMD [ "npm", "run", "start:dev" ]