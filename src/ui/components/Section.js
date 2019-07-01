const { createElement } = require('react');

function Section({ children }) {
  return createElement('div', { className: 'section' }, [
    createElement('div', { className: 'container' }, [
      createElement('div', { className: 'content' }, [
        children
      ]),
    ]),
  ]);
}

module.exports = Section;
