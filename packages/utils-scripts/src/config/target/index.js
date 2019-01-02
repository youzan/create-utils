const esConfig = require('./es');
const cjsConfig = require('./cjs');

const target = process.env.target || 'commonjs';

const targetConfigMap = {
  es: esConfig,
  cjs: cjsConfig,
  commonjs: cjsConfig,
};

/**
 * 获取编译时的目标模块类型配置
 * @param {'cjs' | 'es'} target
 * @returns
 */
function getTargetConfig(target) {
  if (Object.getOwnPropertyNames(targetConfigMap).includes(target)) {
    return targetConfigMap[target];
  }
  return targetConfigMap.es;
}

module.exports = {
  ...getTargetConfig(target),
};
