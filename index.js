const execSync = require('child_process').execSync;
const fs = require('fs');
const rimraf = require("rimraf");
const MBTiles = require('@mapbox/mbtiles');
const postgis2geojson = require('postgis2geojson');
const config = require('./config');

const VtMapCreator = () =>{
    console.time('postgis2geojson');
    const pg2json = new postgis2geojson(config);
    pg2json.run().then(res=>{
        console.log(res);
        if (fs.existsSync(config.ghpages.tiles)){
            rimraf.sync(config.ghpages.tiles);
        }
        execSync(`mb-util ${config.mbtiles} ${config.ghpages.tiles} --scheme=xyz --image_format=pbf --silent`);
        console.log(`extracted pbf tiles from mbtiles under ${config.ghpages.tiles}.`);
    }).catch(err=>{
        console.log(err);
    }).finally(()=>{
        console.timeEnd('postgis2geojson');
    })
};

module.exports = VtMapCreator();