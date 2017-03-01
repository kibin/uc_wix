const {merge, pick, keys} = require('ramda')

const defaults = {
  NODE_ENV: 'development',
  BASE_URL: 'http://localhost:8080/',
  PORT: '8080',
}

module.exports = merge(defaults, pick(keys(defaults), process.env))
