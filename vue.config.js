// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
var PACKAGE = require('./package.json')
var buildVersion = PACKAGE.version;
var buildName = PACKAGE.name;
var prodUrl = PACKAGE.production.url + '/' + buildName + '@' + buildVersion +  '/dist/' ;


module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? prodUrl
      : '/',
      filenameHashing: false
}
