const cli = require('cli-progress');

const mainBar = new cli.Bar({
  hideCursor: true,
  format: '{bar} {percentage}% | falta: {eta}s | {value} de {total} imágenes',
}, cli.Presets.shades_classic);

const downloadBar = new cli.Bar({
  hideCursor: true,
  format: '[{bar}] {percentage}% | falta: {eta}s | {speed}kbit',
}, cli.Presets.shades_classic);

// module.exports = { mainBar, downloadBar };

// fake
module.exports = {
  mainBar: {
    start: function () {
      // console.log('start');
      mainBar.start(...arguments);
    },
    update: function () {
      // console.log(...arguments);
      mainBar.update(...arguments);
    },
    stop: function () {
      // console.log('stop');
      mainBar.stop(...arguments);
    }
  },
  // downloadBar: {
  //   start: function () {
  //     // console.log('start');
  //     downloadBar.start(...arguments);
  //   },
  //   update: function () {
  //     // console.log('update');
  //     downloadBar.update(...arguments);
  //   },
  //   stop: function () {
  //     // console.log('stop');
  //     downloadBar.stop(...arguments);
  //   }
  // }
};
