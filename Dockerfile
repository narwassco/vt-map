# Start from ubuntu
FROM ubuntu:16.04

# Update repos and install dependencies
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install \
  build-essential \
  libsqlite3-dev \
  zlib1g-dev \
  curl \
  wget \
  git \
  nodejs \
  npm

# Build tippecanoe
RUN mkdir -p /tmp/src
WORKDIR /tmp/src
RUN git clone https://github.com/mapbox/tippecanoe.git
WORKDIR /tmp/src/tippecanoe
RUN make \
    && make install

# Install Nodejs
RUN npm cache clean && npm install n -g && n stable \
    && n 12.14.1 && ln -sf /usr/local/bin/node /usr/bin/node

# Install vt-map
RUN mkdir -p /tmp/src/vt-map
WORKDIR /tmp/src/vt-map
COPY . /tmp/src/vt-map
RUN npm install

RUN chmod a+x /tmp/src/vt-map/docker-entrypoint.sh
CMD ["/tmp/src/vt-map/docker-entrypoint.sh"]