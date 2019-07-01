const FILENAME = '.minion-settings.json';
const settings = require('user-settings').file(FILENAME);
settings.set('rename',{"search":["ESTILO"], "priority":[]});
module.exports = settings;
