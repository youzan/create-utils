/**
 * tozhCN 把字符串转成以分为单位的整数。
 * @memberof module:money
 * @param {number|string} num 金额
 * @returns {string} 中文大写的金额, 标准会计格式
 * @runkit true
 * @example
 * const tozhCN = require('zan-utils/money/tozhCN');
 * tozhCN(500.3);
 * // => 伍佰元叁角整
 */
function tozhCN(num: string | number): string {
  if (typeof num === 'number') {
    num = String(num);
  }
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    throw new Error(`非法数据: ${JSON.stringify(num)}`);
  }
  let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分';
  let str: string = '';
  num += '00';
  const pos = num.indexOf('.');
  if (pos >= 0) {
    num = num.substring(0, pos) + num.substr(pos + 1, 2);
  }
  unit = unit.substr(unit.length - num.length);
  for (let i = 0, len = num.length; i < len; i++) {
    str +=
      '零壹贰叁肆伍陆柒捌玖'.charAt(Number(num.charAt(i))) + unit.charAt(i);
  }
  return str
    .replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(兆|万|亿|元)/g, '$1')
    .replace(/(兆|亿)万/g, '$1')
    .replace(/(京|兆)亿/g, '$1')
    .replace(/(京)兆/g, '$1')
    .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟')
    .replace(/^元零?|零分/g, '')
    .replace(/(元|角)$/g, '$1整');
}

export = tozhCN;
