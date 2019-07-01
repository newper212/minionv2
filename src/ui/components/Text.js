const { createElement } = require('react');
const { dialog } = require('electron').remote;

const Text = ({ title, type, value, onChange }) => createElement('div', { className: 'form-control' }, [
  createElement('div', { className: 'form-control-title' }, title),
  createElement('div', { className: 'form-control-content' }, [
    // createElement('label', { className: 'text' }, [
    //   createElement('input', {
    //     id: 'filepath',
    //     type: 'file',
    //     style: { display: 'none' },
    //     onChange: onChange,
    //   }),
    //   value,
    // ]),
    createElement('input', { type: 'text', className: 'text', value: value, onInput: (e) => {
      onChange([e.target.value]);
    }}),
    createElement('div', { className: 'text-open', onClick: () => {
      onChange(dialog.showOpenDialog({
        properties: [type]
      }));
    }},
    createElement('img', {
      src: 'folder.png',
      style: {
        'height': '16px',
        'width': '16px',
      },
    }),), // 📂
  ]),
]);

module.exports = Text;
