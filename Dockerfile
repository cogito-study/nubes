FROM node:8.10
RUN mkdir /usr/src/server
WORKDIR /usr/src/server
ENV PATH /usr/src/server/node_modules/.bin:$PATH
COPY package.json /usr/src/server/package.json
COPY package-lock.json /usr/src/server/package-lock.json
RUN npm install -g npm
RUN npm install
COPY . /usr/src/server
CMD ["npm","start"]
