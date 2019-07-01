const { createElement } = require('react');

function Button({ children, onPress }) {
  return createElement('button', {
    className: 'button',
    onClick: (e) => onPress(),
  }, children);
}

module.exports = Button;
