"use strict";
var tslib_1 = require("tslib");
var esConfig = require('./es');
var cjsConfig = require('./cjs');
var target = process.env.target || 'commonjs';
var targetConfigMap = {
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
module.exports = tslib_1.__assign({}, getTargetConfig(target));
