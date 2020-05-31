// const execSync = require('child_process').execSync;
const fs = require('fs');
// const path = require('path');
// const zlib = require('zlib');
// const rimraf = require("rimraf");
const postgis2geojson = require('postgis2geojson');
const Mbtiles2pbf = require('mbtiles2pbf');
const config = require('./config');

// const unzipTiles = (tileDir) =>{
//     fs.readdir(tileDir, {withFileTypes: true}, (err, dirents) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
    
//         for (const dirent of dirents) {
//           const fp = path.join(tileDir, dirent.name);
//           if (dirent.isDirectory()) {
//             unzipTiles(fp);
//           } else {
//             var gzipContent = fs.readFileSync(fp);
//             var ext = path.extname('pbf');
//             if (ext !== 'pbf'){
//                 continue;
//             }
//             const binary = zlib.gunzipSync(gzipContent);
//             const fp2 = fp.replace('pbf', 'mvt');
//             fs.writeFileSync(fp2, binary);
//             fs.unlinkSync(fp);
//             console.log(fp2);
//           }
//         }
//     });
// }

const VtMapCreator = () =>{
    console.time('postgis2geojson');
    const pg2json = new postgis2geojson(config);
    pg2json.run().then(res=>{
        console.log(res);
        const mbtiles2pbf = new Mbtiles2pbf(config.mbtiles, config.ghpages.tiles);
        mbtiles2pbf.run();
        // if (fs.existsSync(config.ghpages.tiles)){
        //     rimraf.sync(config.ghpages.tiles);
        // }
        // execSync(`mb-util ${config.mbtiles} ${config.ghpages.tiles} --scheme=xyz --image_format=pbf --silent`);

        // unzipTiles(config.ghpages.tiles);
        // spawnSync(`cd ${config.mbtiles} && gzip -d -r -S .pbf *`);
        // spawnSync(`cd ${config.mbtiles} && find . -type f -exec mv '{}' '{}'.pbf \;`);
        // console.log(`extracted pbf tiles from mbtiles under ${config.ghpages.tiles}.`);
    }).catch(err=>{
        console.log(err);
    }).finally(()=>{
        console.timeEnd('postgis2geojson');
    })
};

module.exports = VtMapCreator();