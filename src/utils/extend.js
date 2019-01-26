'use strict'

export default function extend () {
  var dest = arguments[0]

  for (var i = 1; i < arguments.length; i++) {
    var src = arguments[i]

    if (src) {
      for (var k in src) {
        dest[k] = src[k]
      }
    }
  }

  return dest
}
