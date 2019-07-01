const fs = require('fs');
const path = require('path');
// const deasync = require('deasync');
const request = require('request');
// const progress = require('request-progress');
// const { downloadBar } = require('./bar');
const settings = require('./settings');
const { getProxy } = require('./proxy');

var options = {
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  },
  proxy: getProxy(),
};

function handleError(err, cb) {
  // if (err.code)
  //   return

  // checkAndPrompt();
  cb('No descargado');
}

function download(url, pathname, name, cb) {
  if (!url)
    throw new Error('The url is required.');

  options.url = url;//.toString().trim();
  options.encoding = null;

                                       // name of file
  const filename = path.join(pathname, name || path.basename(options.url));

  var state;

  // downloadBar.start(1, 0, {
  //   speed: 0
  // });

  //test
  console.log(options.url);
  //endtest

  // progress(
    request(options, function (err, res, body) {
      state = 'No descargado';

      //test
      console.log(err);
      //endtest

      // if (err)
      //   return handleError(err, cb);
      //
      // if (!body)
      //   return handleError(new Error('Image loading error - empty body. URL: ' + options.url), cb);
      //
      // const statusCode = res.statusCode;
      //
      // if (statusCode !== 200 && statusCode !== 201)
      //   return handleError(new Error('Image loading error - ' + statusCode + '. URL: ' + options.url), cb);
      //
      // try {
      //
      //   // ALL IS DONE
      //
      //   fs.writeFileSync(filename, body, 'binary');
      //   state = 'Descargado';
      //   cb(state);
      //
      //   //end
      //   // console.log('download');
      //   // console.log(filename);
      //   // console.log(name);
      //   //endtest
      //
      // } catch (err) {
      //
      //   console.log('download error...');
      //   return handleError(err, cb);
      //
      // }

    });//, {
    //
    // }
  // )
  //   .on('progress', function (state) {
  //     // downloadBar.update(state.percent, { speed: state.speed });
  //   })
  //   .on('end', function () {
  //     // downloadBar.stop();
  //   });

  // deasync.loopWhile(() => !state);
  // (function loop() {
  //   if (!state)
  //     setTimeout(loop, 200);
  // })();

  return state;
}

module.exports = download;
