const postgis2geojson = require('postgis2geojson');
const Mbtiles2pbf = require('mbtiles2pbf');
const config = require('./config');

const VtMapCreator = () =>{
    console.time('vt-map');
    const pg2json = new postgis2geojson(config);
    pg2json.run().then(res=>{
        console.log(res);
        const mbtiles2pbf = new Mbtiles2pbf(config.mbtiles, config.ghpages.tiles);
        mbtiles2pbf.run();
    }).catch(err=>{
        console.log(err);
    }).finally(()=>{
        console.timeEnd('vt-map');
    })
};

module.exports = VtMapCreator();