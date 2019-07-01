const { createElement } = require('react');

const Bar = ({ value }) => createElement('div', { className: 'bar' },
  createElement('div', {
    className: 'bar-fill',
    style: {
      'width': value + '%',
    }
  }),
);

// const Bar = ({ max, value }) => createElement('progress', {
//   max: max,
//   value: value,
// });

module.exports = Bar;
