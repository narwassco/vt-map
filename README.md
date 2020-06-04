# vt-map
This is a simple tool to create vector tile map on Github pages.

## Installation
Install [mbutil](https://github.com/mapbox/mbutil) on Python

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

# License

This source code under the repository is licensed by 
MIT license. You can use it freely for your purposes.

However, these data under [public](./public) is owned and maintained by `Narok Water and Sewerage Services Company (NARWASSCO)` in Kenya. It is under a [Creative Commons Attribution 4.0 International
License](http://creativecommons.org/licenses/by/4.0/), which is different from main repository. 

---
Copyright (c) 2020 Narok Water and Sewerage Services Co., Ltd.