const fs = require('fs');
const path = require('path');
const request = require('request');
const { checkProxy, makeProxyUrl } = require('./proxy');

var options = {
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  },
};

function handleError(err, cb) {
  cb('No descargado');
}

function download(url, pathname, name, cb) {
  
  if (!url)
    throw new Error('The url is required.');

  options.encoding = null;
  options.url = url;
  //options.url = 'https://s7d5.scene7.com/is/image/FalabellaPE/881331072?scl=1&qlt=100,1';
  checkProxy(function (proxy) {
    options.proxy = proxy ? makeProxyUrl() : false;

    var filename = path.join(pathname, name || path.basename(options.url));
    //console.log(filename);
    request(options, function (err, res, body) {
      if (err)
        return handleError(err, cb);

      if (!body)
        return handleError(new Error('Image loading error - empty body. URL: ' + options.url), cb);

      var statusCode = res.statusCode;
      
      if (statusCode !== 200 && statusCode !== 201)
        return handleError(new Error('Image loading error - ' + statusCode + '. URL: ' + options.url), cb);
      //console.log('contenido: ');
      //console.log(res.headers);
      try {
        fs.writeFileSync(filename, body, 'binary');
        cb('Descargado');
      }
      catch (err) {
        return handleError(err, cb);
      }
    });
  });
}

module.exports = download;
