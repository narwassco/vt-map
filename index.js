const {postgis2vectortiles} = require('@watergis/postgis2vectortiles');
const {postgis2geojson} = require('@watergis/postgis2geojson');
const config = require('./config');
const configSearch = require('./config-search');

const VtMapCreator = () =>{
    console.time('vt-map');
    const pg2vt = new postgis2vectortiles(config);
    pg2vt.create(config.ghpages.tiles)
    .then(res=>{
        console.log(`Created ${res.no_tiles} vectortiles under folder: ${res.output}`);
        //create geojson file for search function
        const pg2json = new postgis2geojson(configSearch);
        return pg2json.run();
    })
    .then(files=>{files.forEach(f=>{
        console.log(`Created GeoJSON file:${f}`);
        console.log('Now you are ready to command "npm run deploy" to push vectortiles to gh-pages.');
    });})
    .catch(err=>{console.log(err);})
    .finally(()=>{
        console.timeEnd('vt-map');
    })
};

module.exports = VtMapCreator();