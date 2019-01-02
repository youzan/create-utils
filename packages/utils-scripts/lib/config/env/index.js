"use strict";
var devConfig = require('./dev');
var prodConfig = require('./prod');
var isProd = process.env.NODE_ENV === 'production';
module.exports = isProd ? prodConfig : devConfig;
