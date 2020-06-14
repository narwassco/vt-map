const spritezero = require('@mapbox/spritezero');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const rimraf = require('rimraf');

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

const generateSvgs = (input_dir) => {
    return svgs = glob.sync(path.resolve(input_dir))
    .map(function(f) {
        return {
            svg: fs.readFileSync(f),
            id: path.basename(f).replace('.svg', '')
        };
    });
  }

const suffix = (pxRatio) => {
    if (pxRatio === 1) {
      return ''
    } else {
      return `@${pxRatio}x`
    }
}

const generateSprite = (pxRatio, svgs) => {
    const output_dir = config.sprite.output_dir;
    if (!fs.existsSync(output_dir)){
      fs.mkdirSync(output_dir);
    }
    var pngPath = path.resolve(path.join(output_dir, `/sprite${suffix(pxRatio)}.png`));
    var jsonPath = path.resolve(path.join(output_dir, `/sprite${suffix(pxRatio)}.json`));

    spritezero.generateLayout({
      imgs: svgs,
      pixelRatio: pxRatio,
      format: true
    }, (err, dataLayout) => {
      if (err) throw err
      fs.writeFileSync(
        jsonPath,
        JSON.stringify(dataLayout, null, 2)
      )
    })
    spritezero.generateLayout({
      imgs: svgs,
      pixelRatio: pxRatio,
      format: false
    }, (err, imageLayout) => {
      if (err) throw err
      spritezero.generateImage(imageLayout, (err, image) => {
        if (err) throw err
        fs.writeFileSync(pngPath, image)
      })
    })
  }

/**
 * Create Sprite files for Mapbox
 */
const SpriteCreator = () =>{
    copyFilesToDir(config.sprite.icons.maki, config.sprite.input_dir);
    copyFilesToDir(config.sprite.icons.water, config.sprite.input_dir);

    const input_dir = path.join(config.sprite.input_dir, '/*.svg')
    const svgs = generateSvgs(input_dir);

    [1, 2, 4].forEach(function(pxRatio) {
        generateSprite(pxRatio, svgs);
    });
};

module.exports = SpriteCreator();