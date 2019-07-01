const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function contains(haystack, needle) {
  if (needle == '')
    return false;

  return (haystack.indexOf(needle) > -1);
}

function percent(current, total) {
  return (100 * current) / total;
}

function renameProcess(opts/*, settings*/) {
  console.log('renombre');
  // testing this feature, for now this not apply!
  // if (!settings)
    // const settings = JSON.parse(fs.readFileSync(path.join(PATH_IMAGES, 'rename-settings.json'), 'utf8'));
    const settings = require('./settings').get('rename');
    //console.log('valores del setting: ');
    //console.log(settings);
   
  var end = false;

  const PATH_XLSX = opts.input;
  const PATH_IMAGES = opts.output;
  const NAME_SHEET = 'plan';
  const NAME_SKU = 'SKU VAR';

  function rename(oldName, newName) {
    fs.renameSync(path.join(PATH_IMAGES, oldName), path.join(PATH_IMAGES, newName + path.extname(oldName)));
  }

  const wb = xlsx.readFile(PATH_XLSX);
  const dt = xlsx.utils.sheet_to_json(wb.Sheets[NAME_SHEET]);
  
  fs.readdir(PATH_IMAGES, function (err, files) {
    if (err)
      return;

    let currentSearch = '';

    opts.onStart();
    dt.forEach(function (row, rowIndex) {
      //console.log('valor fila');
      //console.log(row);
      //console.log(row[1]);
      // try {
      //   if (end) {
      //     opts.onEnd();
      //     throw BreakException;
      //   }
      // } catch (e) {
      //   // if (e !== BreakException) throw e;
      // }

      if (end) {
        return;
      }

      opts.onProgress(percent(rowIndex, dt.length))
      console.log('valores del setting 2: '+settings['search']);
      const search = settings['search'].map(function (word) {
        //console.log('search: '+search);
        console.log('word: '+word);
        return row[word].toString().trim().replace(/\s/g, '-');
      }).join('_');

      if (currentSearch == search)
        return;

      currentSearch = search;
      const currentSku = row[NAME_SKU];

      let count = 0;

      settings['priority'].forEach(function (word) {
        files.forEach(function (file, fileIndex) {
          if (contains(file, currentSearch)) {
            if (contains(file, word)) {
              rename(file, currentSku + '_' + ++count);
              delete files[fileIndex];
            }
          }
        });
      });

      files.forEach(function (file, fileIndex) {
        if (contains(file, currentSearch)) {
          rename(file, currentSku + '_' + ++count);
          delete files[fileIndex];
        }
      });

    });

    opts.onEnd();
  });

  return function renameProcessEnd(cb) {
    end = true;
    cb();
    return null;
  }

}

module.exports = renameProcess;
