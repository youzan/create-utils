/**
 * pipe多个管道
 *
 * @param {NodeJS.ReadableStream} sourceStream
 * @param {Function[]} plugins
 * @returns {NodeJS.ReadableStream}
 */
export default function pipes(sourceStream, plugins) {
  return plugins.reduce((stream, plugin) => stream.pipe(plugin), sourceStream);
}

