const renameProcess = require('../../renameProcess');
const downloadProcess = require('../../downloadProcess');



// rename

function renameInputUpdate(text) {
  return {
    type: 'RENAME_INPUT_UPDATE',
    text,
  };
}

function renameOutputUpdate(text) {
  return {
    type: 'RENAME_OUTPUT_UPDATE',
    text,
  };
}

var renameProcessEnd;
function renameRun() {
  return (dispatch, getState) => {
   // console.log(getState());
    if (!getState().rename.running) {
      var renameState = getState().rename;

      renameProcessEnd = renameProcess({
        input: renameState.input[0],
        output: renameState.output[0],
        onStart: function () {
          dispatch(renameBarUpdate(0));
          dispatch({ type: 'RENAME_RUN' });
        },
        onProgress: function (value) {
          dispatch(renameBarUpdate(value));
        },
        onEnd: function () {
          dispatch(renameStop());
        },
      });
    }
  };
}

function renameStop() {
  return (dispatch, getState) => {
    var renameState = getState().rename;

    if (renameState.running) {
      renameProcessEnd = renameProcessEnd(function () {
        dispatch({ type: 'RENAME_STOP' });
      });
    }
  };
}

function renameBarUpdate(value) {
  return {
    type: 'RENAME_BAR_UPDATE',
    value,
  };
}

// download

function downloadBrandUpdate(text) {
  return {
    type: 'DOWNLOAD_BRAND_UPDATE',
    text,
  };
}

function downloadInputUpdate(text) {
  return {
    type: 'DOWNLOAD_INPUT_UPDATE',
    text,
  };
}

function downloadOutputUpdate(text) {
  return {
    type: 'DOWNLOAD_OUTPUT_UPDATE',
    text,
  };
}

var downloadProcessEnd;
function downloadRun() {
  return (dispatch, getState) => {
    var downloadState = getState().download;

    if (!downloadState.running) {
      downloadProcessEnd = downloadProcess({
        brand: downloadState.brand,
        input: downloadState.input[0],
        output: downloadState.output[0],
        onStart: function () {
          dispatch(downloadBarUpdate(0));
          dispatch({ type: 'DOWNLOAD_RUN' });
        },
        onProgress: function (value) {
          dispatch(downloadBarUpdate(value));
        },
        onEnd: function () {
          dispatch(downloadStop());
        },
      });
    }

  };
}

function downloadStop() {
  return (dispatch, getState) => {
    var downloadState = getState().download;
    if (downloadState.running) {
      downloadProcessEnd = downloadProcessEnd(function () {

        //test aqui se renombra despues de descargar
        var fs = require('fs');
        var path = require('path');
        var _ = require('underscore');
        var pathOutput = getState().download.output[0];

        fs.readdir(pathOutput, function (err, files) {
          if (err)
            return;

          files = _.sortBy(files);

          var currentSku = '';
          var count;
          _.each(files, function (file, fileIndex) {
            var ext = path.extname(file);
            var sku = file.split('_')[0];
           
            if(ext=='')
              ext='.jpg';

            if (sku == '.DS')
              return;
            if (sku.indexOf('Reporte-') > -1)
              return;

            if (currentSku != sku) {
              currentSku = sku;
              count = 0;
            }

            count++;

            fs.renameSync(path.join(pathOutput, file), path.join(pathOutput, currentSku + '_' + count + ext));
          });
        });
        //endtest

        dispatch({ type: 'DOWNLOAD_STOP' });
      });
    }
  };
}

function downloadBarUpdate(value) {
  return {
    type: 'DOWNLOAD_BAR_UPDATE',
    value,
  };
}


module.exports = {
  // rename
  renameInputUpdate,
  renameOutputUpdate,
  renameRun,
  renameStop,

  // download
  downloadBrandUpdate,
  downloadInputUpdate,
  downloadOutputUpdate,
  downloadRun,
  downloadStop,
};
