const path = require('path');
const { readCSV, writeCSV } = require('./io');

const prefix = 'Reporte-';

function readLog(filename, pathname) {
  return readCSV(path.join(pathname, prefix + filename)) || [];
}

function writeLog(filename, pathname, row) {
  return writeCSV(path.join(pathname, prefix + filename), [row]);
}

module.exports = { readLog, writeLog };
