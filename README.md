# vt-map
This is a simple tool to create vector tile map on Github pages.

## Installation
### tippenacanoe
This module uses [`tippecanoe`](https://github.com/mapbox/tippecanoe) to convert geojson files to mbtiles. Please make sure to install it before running.

for MacOS
```
$ brew install tippecanoe
```

for Ubuntu
```
$ git clone https://github.com/mapbox/tippecanoe.git
$ cd tippecanoe
$ make -j
$ make install
```

### mbutil
This module uses [mbutil](https://github.com/mapbox/mbutil) to extract mvt files from mbtiles. Please make sure install it on your python3.

for MacOS & Ubuntu
```
git clone git://github.com/mapbox/mbutil.git
cd mbutil
sudo python setup.py install
```

### main module
```
git clone https://github.com/narwassco/vt-map.git --recursive
npm install
```

## Configuration
All the settings are in `config.js`, so please make sure your own settings on this file before producing vector tile.

Please also create your own stylefile `style.json` for your layers.

## Create vector tile from your PostGIS database
It will retrieve the data from PostGIS as mbtiles format, then vector tiles (.mvt) were extracted under `public/tiles` folder.
```
npm run build
```

## Create sprite file
There are SVG images under `resources` folder. It will create sprite file by `spritezero` module. The sprite files will be created under `public/sprite` folder.
```
npm run sprite
```

## Deploy to gh-pages
It will push all of website contents  under public folder to Github pages.
```
npm run deploy
```

# Using Docker

Build Docker Image
```
docker build -t narwassco/vt-map .
```

Create Vector Tile and sprite files under public directory.
```
docker-compose up
```

# License

This source code under the repository is licensed by 
MIT license. You can use it freely for your purposes.

However, these data under [public](./public) is owned and maintained by `Narok Water and Sewerage Services Company (NARWASSCO)` in Kenya. It is under a [Creative Commons Attribution 4.0 International
License](http://creativecommons.org/licenses/by/4.0/), which is different from main repository. You can use this data freely, but please mention our credit `©NARWASSCO,Ltd.` on attribution of your web application.

---
Copyright (c) 2020 Narok Water and Sewerage Services Co., Ltd.