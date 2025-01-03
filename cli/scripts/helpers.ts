export function suppressViteSourceMapWarning(callback: () => Promise<void>) {
  const stderrWrite = process.stderr.write;
  process.stderr.write = function (chunk: any, ...args: any[]) {
    const output = chunk.toString();
    if (output.includes('Failed to load source map') || output.includes('ENOENT')) {
      return true;
    }
    return stderrWrite.call(process.stderr, chunk, ...args.slice(0, 2));
  };

  return callback().finally(() => {
    // Restore original stderr
    process.stderr.write = stderrWrite;
  });
}
