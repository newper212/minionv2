const request = require('request');
const settings = require('./settings');
const { wait, unwait, prompt } = require('./modal');

const PROXY_TIMEOUT = 4000;
const PROXY_PROTOCOL = 'http://';
const PROXY_HOST = '172.22.252.169:80';
const PROXY_URL = PROXY_PROTOCOL + PROXY_HOST;

var checked = false;
var proxyBehind = false;

function makeRequest(url, proxy, handler) {
  var options = {
    encoding: null,
    url: url,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    },
    proxy: proxy,
  };

  request(options, handler);
}

function isBehindAProxy(cb) {
  var behindAProxy;

  makeRequest(PROXY_URL, false, function (err, res) {
    if (!err)
      behindAProxy = true;
  });

  setTimeout(function () {
    cb(!!behindAProxy);
  }, PROXY_TIMEOUT);
}

function makeProxyUrl() {
  return PROXY_PROTOCOL + settings.get('user') + ':' + settings.get('pass') + '@' + PROXY_HOST;
}

// check if is behind proxy and if proxy is valid
function check(cb) {
  isBehindAProxy(function (proxy) {
    //test
    console.log('is behind a proxy? ' + proxy);
    //endtest

    proxyBehind = proxy;

    var valid;
    var testURL = 'http://st.mngbcn.com/rcs/pics/static/T1/fotos/S6/14090312_99.jpg';

    makeRequest(testURL, (proxy ? makeProxyUrl() : false), function (err, res) {
      if (!err)
        valid = true;

      cb(!!valid);
    });
  });
}

function checkAndPrompt(cb) {
  check(function handleCheck(valid) {
    //test
    console.log('is a valid proxy? ' + valid);
    //endtest

    if (valid) {
      cb();
      return unwait();
    }

    prompt({
      type: 'submit',
      title: 'Proxy',
      message: '',
      controls: [
        { type: 'text', name: 'user', label: 'Usuario de red:', placeholder: 'idiaza' },
        { type: 'password', name: 'pass', label: 'Contraseña:', placeholder: '********' },
      ],
    },
    function (result) {
      if (result.user && result.pass) {
        const user = result.user.toString().trim();
        const pass = result.pass.toString().trim();

        if (user && pass) {
          settings.set('user', user);
          settings.set('pass', pass);
        }
      }

      check(handleCheck);
    });
  });
}

function checkProxy(cb) {
  if (checked)
    return cb(proxyBehind);

  // wait();
  checkAndPrompt(function () {
    checked = true;
    cb(proxyBehind);
  });
}

module.exports = {
  /*check, checkAndPrompt, */makeProxyUrl, checkProxy
};
