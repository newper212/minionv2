const { combineReducers } = require('redux');

const rename = require('./rename');
const download = require('./download');

module.exports = combineReducers({
  rename,
  download
});

// {
//   rename: {
//     input: '',
//     output: '',
//   },
//   download: download,
// }
