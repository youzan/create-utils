"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * pipe多个管道
 *
 * @param {NodeJS.ReadableStream} sourceStream
 * @param {Function[]} plugins
 * @returns {NodeJS.ReadableStream}
 */
function pipes(sourceStream, plugins) {
    return plugins.reduce(function (stream, plugin) { return stream.pipe(plugin); }, sourceStream);
}
exports.default = pipes;
