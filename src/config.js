const convict = require('convict');
const dotenv = require('dotenv');

dotenv.config();
const config = convict({
  env: {
    doc: 'The environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
});

module.exports = config;
