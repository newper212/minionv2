const { createElement } = require('react');

const Select = ({ options = [], title, value, onChange }) => createElement('div', { className: 'form-control' }, [
  createElement('div', { className: 'form-control-title' }, title),
  createElement('div', { className: 'form-control-content' }, [
    createElement('select', {
      className: 'select',
      value: value,
      onChange: (e) => {
        onChange(e.target.value);
      },
    },
      options.map((option) => createElement('option', {
        value: option.value,
        // selected: (option.value == value) ? true : false
      }, option.title))
    ),
  ]),
]);

module.exports = Select;
