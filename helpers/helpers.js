var path = require('path');
var url = require('url');
var fs = require('fs');

exports.getFilename = function(url) {
  url = url.substring(url.lastIndexOf("/")+ 1);
  return (url.match(/[^.]+(\.[^?#]+)?/) || [])[0];
};

exports.getDownload = function(url, outPath) {
  return new Promise ((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    //Exit out of helpers folder
    outPath = '/../' + outPath + exports.getFilename(url);
    var output = fs.createWriteStream(outPath);
    console.log('Output path:', outPath);
    var req = lib.get(url, (res) => {
      // if (res.statusCode === 200) {
      console.log('Status code:', res.statusCode); //200 if success
      res.pipe(output);
      output.on('finish', () => {
        output.close();
        resolve();
      });
      // console.log('No 200 status code. Got', res.statusCode);
      req.setTimeout(10000, () => {
        req.abort();
      });
    });

    req.on('error', (err) => reject(err));
  });
};

exports.checkDir = function(targetDir) {
  if (!fs.existsSync(targetDir)){
    console.log('dir doesn\'t exist. making:', targetDir);
    fs.mkdirSync(targetDir);
  }
}
