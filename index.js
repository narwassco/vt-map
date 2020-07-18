const postgis2mbtiles = require('postgis2mbtiles');
const {Mbtiles2Pbf} = require('@watergis/mbtiles2pbf');
const {postgis2geojson} = require('@watergis/postgis2geojson');
const config = require('./config');
const configSearch = require('./config-search');

const VtMapCreator = () =>{
    console.time('vt-map');
    //create geojson file for search function
    createGeoJSONSearch();

    const pg2mbtiles = new postgis2mbtiles(config);
    const mbtiles2pbf = new Mbtiles2Pbf(config.mbtiles, config.ghpages.tiles, ".mvt");
    pg2mbtiles.run()
    .then(res=>{return mbtiles2pbf.run()})
    .catch(err=>{console.log(err);}).finally(()=>{
        console.timeEnd('vt-map');
    })
};

const createGeoJSONSearch = async() =>{
    const pg2json = new postgis2geojson(configSearch);
    const files = await pg2json.run();
    files.forEach(f=>{console.log(f)});
}

module.exports = VtMapCreator();