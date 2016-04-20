'use strict';
const fs = require('fs');
const filendir = require('filendir');
const path = require('path');
const glob = require('glob');
const colors = require('colors');
const uglify = require("uglify-js");

const minificator = (fileName, src, dest, c) => {

  var res = uglify.minify(fileName);
  var fileContent = res.code;
  var newFilePath;

  if(c) {
    newFilePath = path.join(dest, 'concat.min.js');
  } else {
    newFilePath = path.join(dest, path.relative(src, fileName));
  }

  filendir.writeFileAsync(newFilePath, fileContent, err => {
    if(err) return console.log(err);
    console.log(newFilePath.magenta)
  });
};

module.exports = (config) => () => {
  console.log('.......................'.yellow);
  console.log('Running JS compilation:');
  console.log('.......................'.yellow);
  console.log('Files were processed:');

  glob(`${config.src}/**/*.js`, (err, files) => {
    for(var i in files){
      minificator(files[i], config.src, config.dest, config.с );
    }
  });
};

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});
