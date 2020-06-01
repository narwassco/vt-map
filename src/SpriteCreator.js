const spritezero = require('@mapbox/spritezero');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const config = require('../config');

/**
 * get the list of filenames under target directory
 * @param {string} srcDir source directory
 * @returns {Array<string>} the array of filenames
 */
const getFileNameList = async (srcDir) => {
   return await fs.readdirSync(srcDir, (err, fileList) => {
       if (err) throw err
       return fileList
    })
}

/**
 * Copy all the files from source directory to target directory.
 * If target directory does not exist, it will be created automatically.
 * @param {string} srcDir source directory
 * @param {string} distDir target directory
 */
const copyFilesToDir = async(srcDir, distDir) => {
    if (!fs.existsSync(distDir)){
        fs.mkdirSync(distDir);
    }
    const fileNameList = await getFileNameList(path.resolve(srcDir+ '/'));
    fileNameList.forEach(fileName=>{
        fs.copyFileSync(path.resolve(srcDir + '/' + fileName), path.resolve(distDir + '/' + fileName))
    })
}

/**
 * Create Sprite files for Mapbox
 */
const SpriteCreator = () =>{
    copyFilesToDir(config.sprite.icons.maki, config.sprite.input_dir);
    copyFilesToDir(config.sprite.icons.water, config.sprite.input_dir);

    [1, 2, 4].forEach(function(pxRatio) {
        const input_dir = path.join(config.sprite.input_dir, '/*.svg')
        const output_dir = config.sprite.output_dir;

        var svgs = glob.sync(path.resolve(input_dir))
            .map(function(f) {
                return {
                    svg: fs.readFileSync(f),
                    id: path.basename(f).replace('.svg', '')
                };
            });
        var pngPath = path.resolve(path.join(output_dir, '/sprite@' + pxRatio + '.png'));
        var jsonPath = path.resolve(path.join(output_dir, '/sprite@' + pxRatio + '.json'));
    
        // Pass `true` in the layout parameter to generate a data layout
        // suitable for exporting to a JSON sprite manifest file.
        spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: true }, function(err, dataLayout) {
            if (err) return;
            fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
        });
    
        // Pass `false` in the layout parameter to generate an image layout
        // suitable for exporting to a PNG sprite image file.
        spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: false }, function(err, imageLayout) {
            spritezero.generateImage(imageLayout, function(err, image) {
                if (err) return;
                fs.writeFileSync(pngPath, image);
            });
        });
    });
};

module.exports = SpriteCreator();