FROM ubuntu
MAINTAINER Prasanna Suman
LABEL Description="This image for Dharara" Version="0.1"

RUN sudo apt-get update
RUN sudo apt-get install -y python wget mongodb

# Install Node.js
RUN \
  cd /tmp && \
  wget http://nodejs.org/dist/v0.10.38/node-v0.10.38-linux-x64.tar.gz && \
  tar --strip-components 1 -xvzf node-v0.10.38-linux-x64.tar.gz -C /usr/local
  
# Run MongoDB
RUN service mongodb start

ADD . /dharara

ENV NODE_ENV="production"
ENV MONGO_URI="mongodb://192.168.0.158:27017"

EXPOSE 3000

WORKDIR /dharara

RUN npm install

# CMD ["sh", "/dharara/go.sh"]
