# base image
FROM node:8

# set working directory
RUN mkdir /usr/src/training
WORKDIR /usr/src/training

# install and cache app dependencies
COPY package.json /usr/src/training/package.json

RUN npm install
RUN npm install -g @angular/cli@6.0.7  --unsafe

COPY . /usr/src/training

CMD ng serve --host 0.0.0.0