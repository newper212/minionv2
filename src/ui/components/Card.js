const { createElement } = require('react');

function Card({ children }) {
  return createElement('div', { className: 'card' }, [
    createElement('div', { className: 'card-title' }, 'Settings'),
    children
  ]);
}

module.exports = Card;
