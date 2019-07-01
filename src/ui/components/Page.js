const { createElement } = require('react');
const Section = require('./Section');
const Card = require('./Card');
const Select = require('./Select');
const Text = require('./Text');
const Tabs = require('./Tabs');
const Button = require('./Button');
const Bar = require('./Bar');

function Page({
  // rename
  renameInputValue,
  renameInputChange,
  renameOutputValue,
  renameOutputChange,
  renameRun,
  renameStop,
  renameBarValue,

  renameRunning,

  // download
  downloadBrandValue,
  downloadBrandChange,
  downloadInputValue,
  downloadInputChange,
  downloadOutputValue,
  downloadOutputChange,
  downloadRun,
  downloadStop,
  downloadBarValue,

  downloadRunning,
}) {
  return createElement('div', { className: 'page' }, [

    // icon
    createElement('div', {
      style: {
        'background-color': '#FBF9FC',
        // 'margin-bottom': '16px',
      }
    }, [
      // createElement('br'),
      createElement('img', {
        style: {
          'margin': 'auto',
          'width': '120px',
          'height': '120px',
          'display': 'block',
          // 'background-image': 'url(giphy.webp)',
          'background-color': '#FBF9FC',
          'background-blend-mode': 'multiply',
        },
        src: 'giphy.webp'
      }),
      createElement('br'),
    ]),

    // createElement('div', { style: { 'textAlign': 'center', 'marginBottom': '28px', 'font-size': '14px' } }, 'Selecciona la acción requerida'),

    createElement(Section, {}, [
      createElement(Tabs, {}, [











        {
          control: 'Descarga',
          content: [

            createElement('br'),

            // template link
            createElement('a', {
                href: '../templates/template-descarga.xlsx',
                download: 'template-descarga.xlsx',
                style: {
                  'cursor': 'pointer',
                  'color': '#555',
                  'float': 'right',
                  'fontSize': '10px',
                  'fontWeight': 'bold',
                  'lineHeight': '24px',
                  'textDecoration': 'none',
                  'textTransform': 'uppercase',
                },
              },
              'Plantilla',
              createElement('img', {
                title: 'Descargar plantilla',
                src: 'excel.png',
                style: {
                  'display': 'block',
                  'float': 'right',
                  'height': '24px',
                  'margin-left': '4px',
                  'width': '24px',
                },
              }),
            ),

            createElement('br'),

            createElement(Select, {
              title: 'Selecciona una marca',
              options: [
                { title: 'Aldo', value: 'ALDO' },
                { title: 'Call It Spring', value: 'CALL IT SPRING' },
                { title: 'Cortefiel', value: 'CORTEFIEL' },
                { title: 'Mango', value: 'MNG' },
                { title: 'Violeta', value: 'VIOLETA' },
                { title: 'He', value: 'HE' },
                { title: 'WareHouse', value: 'WAREHOUSE' },
                { title: 'Crate & Barrel', value: 'CYB' },
                /* { title: 'Falabella', value: 'FALABELLA' }, */
              ],
              value: downloadBrandValue,
              onChange: downloadBrandChange,
            }),

            // input
            createElement(Text, {
              title: 'Archivo base',
              type: 'openFile',
              value: downloadInputValue,
              onChange: downloadInputChange,
            }),

            // output
            createElement(Text, {
              title: 'Ruta de almacenamiento de fotos',
              type: 'openDirectory',
              value: downloadOutputValue,
              onChange: downloadOutputChange,
            }),

            // run
            createElement(Button, {
              onPress: downloadRun,
            }, downloadRunning ? 'Running' : 'Run'),

            // stop
            createElement(Button, {
              onPress: downloadStop,
            }, 'Stop'),

            // bar
            createElement(Bar, {
              value: downloadBarValue,
            }),

          ],
        },



















        {
          control: 'Renombre',
          content: [

            createElement('br'),

            // template link
            createElement('a', {
                href: '../templates/template-renombre.xlsx',
                download: 'template-renombre.xlsx',
                style: {
                  'cursor': 'pointer',
                  'color': '#555',
                  'float': 'right',
                  'fontSize': '10px',
                  'fontWeight': 'bold',
                  'lineHeight': '24px',
                  'textDecoration': 'none',
                  'textTransform': 'uppercase',
                },
              },
              'Plantilla',
              createElement('img', {
                title: 'Descargar plantilla',
                src: 'excel.png',
                style: {
                  'display': 'block',
                  'float': 'right',
                  'height': '24px',
                  'margin-left': '4px',
                  'width': '24px',
                },
              }),
            ),

            createElement('br'),

            // input
            createElement(Text, {
              title: 'Archivo base',
              type: 'openFile',
              value: renameInputValue,
              onChange: renameInputChange,
            }),

            // output
            createElement(Text, {
              title: 'Ruta de almacenamiento de fotos',
              type: 'openDirectory',
              value: renameOutputValue,
              onChange: renameOutputChange,
            }),

            // run
            createElement(Button, {
              onPress: renameRun,
            }, renameRunning ? 'Running' : 'Run'),

            // // stop
            // createElement(Button, {
            //   onPress: renameStop,
            // }, 'Stop'),

            // bar
            createElement(Bar, {
              value: renameBarValue,
            }),

          ],
        },















      ]),
    ]),

  ]);
}

module.exports = Page;
