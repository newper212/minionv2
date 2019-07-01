function render(template, data) {
  Object.keys(data).forEach(function (key) {
    let value = data[key];

    template = template.replace(
      new RegExp('{{' + key + '}}', 'g'),
      value? value.toString().trim() : ''
    );
  });

  return template.replace(/{{(.*?)}}/g, '');
}

module.exports = render;
