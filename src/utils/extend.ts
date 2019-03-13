function extend (target: object, ...sources: object[]): object {
  for (var i = 0; i < sources.length; i++) {
    var src = sources[i]

    if (src) {
      for (var k in src) {
        target[k] = src[k]
      }
    }
  }

  return target
}

export default extend
