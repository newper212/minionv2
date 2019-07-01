const $ = require('jquery');
const $body = $('body');

function _overlay(name) {
  var $overlay = $body.find('.overlay');

  if ($overlay.length)
    $overlay.remove();

  $overlay = $('<div class="overlay ' + name + '"></div>');
  $body.append($overlay);
  return $overlay;
}

function _createControl(opts, cb) {
  const $control = $('<div class="prompt-control"><div class="prompt-control-label">' + opts.label + '</div></div>');
  const $controlInput = $('<input class="prompt-control-input" type="' + opts.type + '" placeholder="' + opts.placeholder + '">');

  $controlInput.on('input', function (e) {
    cb(e.target.value);
  });

  $control.append($controlInput);

  return $control;
}

function prompt(opts, cb) {
  var $overlay = _overlay('prompt');
  var $content = $('<div class="prompt-content"></div>');

  $overlay.append($content);

  $content.append($('<div class="prompt-title">' + opts.title + '</div>'));
  $content.append($('<div class="prompt-message">' + opts.message + '</div>'));

  var params = {};
  $.each(opts.controls, function (controlIndex, control) {
    $content.append(_createControl(control, function (value) {
      params[control.name] = value;
    }));
  });

  var $done = $('<div class="prompt-done">OK</div>');

  $done.on('click', function () {
    cb(params);
  });

  $content.append($done);
}

function wait(opts, cb) {
  var $overlay = _overlay('wait');
}

function unwait(opts, cb) {
  $body.find('.overlay').remove();
}

module.exports = {
  wait, unwait, prompt,
}
