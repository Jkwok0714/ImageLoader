var Promise = require('bluebird');
var fs = require('fs');
// var http = require('http');
// var https = require('https');
var helpers = require('./helpers/helpers');

// var url = 'https://images-na.ssl-images-amazon.com/images/I/81A3eCGlXkL._SL500_.jpg';
var targetFolder = '/DL/batchTest3/';
var urls = ['https://images-na.ssl-images-amazon.com/images/I/81A3eCGlXkL._SL500_.jpg',
'https://udemy-images.udemy.com/course/750x422/394968_538b_7.jpg',
'https://iso.500px.com/wp-content/uploads/2016/03/pedroquintela.jpg',
'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/123/landscape/electronlogo.png?1499962406',
'https://download.qnap.com/Origin/i/_index/images/TVS-882ST3_main.png'];



var asyncMultiDownload = function(arr, targetDir) {
  var i = 0;
  var currentItem;
  helpers.checkDir(targetDir);
  var loop = function() {
    if (i >= arr.length) {
      return;
    } else {
      currentItem = arr[i];
      console.log('Attempting DL:', currentItem);
      helpers.getDownload(currentItem, targetDir).then((results) => {
        console.log('DL Done');
        loop();
        i++;
      }).catch((err) => {
        throw err;
      });
    }
  }
  loop();
};

asyncMultiDownload(urls, __dirname + targetFolder);
