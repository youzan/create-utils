module.exports = {
  prod: false,
  connect: {
    port: parseInt(process.env.PORT) || 3001,
    host: '127.0.0.1',
    debug: false,
    livereload: true,
  }
};
