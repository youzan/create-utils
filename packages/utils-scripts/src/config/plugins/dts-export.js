// through2 是一个对 node 的 transform streams 简单封装
const through = require('through2');

// 插件级别函数 (处理文件)
function dtsExport() {
  // 创建一个让每个文件通过的 stream 通道
  const stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new Error('dtsExport plugin is not support stream'));
    }
    if (file.isBuffer()) {
      const typingStr = file.contents.toString(enc);
      const transformedStr = typingStr.split('\n').map(line => {
        if (line.startsWith('export default')) {
          return line + '\n' + line.replace('export default', 'export =');
        }
        return line;
      }).join('\n');
      file.contents = Buffer.from(transformedStr, enc);
    }
    cb(null, file);
  });

  return stream;
}

// 暴露（export）插件主函数
module.exports = dtsExport;
