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
  npm \
  python3 \
  python3-setuptools

# Build tippecanoe
RUN mkdir -p /tmp/src
WORKDIR /tmp/src
RUN git clone https://github.com/mapbox/tippecanoe.git
WORKDIR /tmp/src/tippecanoe
RUN make \
    && make install

# Install mbutil
WORKDIR /tmp/src
RUN git clone git://github.com/mapbox/mbutil.git
WORKDIR /tmp/src/mbutil
RUN python3 setup.py install

# Install Nodejs
RUN npm cache clean && npm install n -g && n stable \
    && n 12.14.1 && ln -sf /usr/local/bin/node /usr/bin/node

# Install vt-map
RUN cd /tmp/src \
    && git clone https://github.com/narwassco/vt-map.git \
    && cd vt-map \
    && npm install

ADD docker-entrypoint.sh /tmp/docker-entrypoint.sh
RUN chmod +x /tmp/docker-entrypoint.sh
CMD ["/tmp/docker-entrypoint.sh"]