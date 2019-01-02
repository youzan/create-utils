const devConfig = require('./dev');
const prodConfig = require('./prod');

const isProd = process.env.NODE_ENV === 'production';
module.exports = isProd ? prodConfig : devConfig;
