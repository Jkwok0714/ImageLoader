var Promise = require('bluebird');
var fs = require('fs');
var http = require('http');
var https = require('https');

var url = 'https://boastr.net/wp-content/uploads/2014/11/bttintro2x.jpg';
var output = fs.createWriteStream(__dirname + '/DL/picture.jpg');
var req = https.get(url, (res) => {
  // if (res.statusCode === 200) {
  res.pipe(output);
  output.on('finish', () => {
    output.close();
  });
  // }
  // console.log('No 200 status code. Got', res.statusCode);
  req.setTimeout(10000, () => {
    req.abort();
  });
});
