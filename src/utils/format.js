'use strict'

var REGEX = {
  days: /{[Dd]}/g,
  hours: /{[Hh]{2}}|{[Hh]}/g,
  minutes: /{[Mm]{2}}|{[Mm]}/g,
  seconds: /{[Ss]{2}}|{[Ss]}/g
}

export default function format (timestamp, format, ignore) {
  var result = ''

  if (timestamp < 0 || typeof format !== 'object') {
    return result
  }

  if (Object.prototype.toString.call(ignore) !== '[object Boolean]') {
    ignore = true
  }

  var timestampObject = {
    days: Math.floor(timestamp / 86400000),
    hours: Math.floor((timestamp % 86400000) / 3600000),
    minutes: Math.floor((timestamp % 3600000) / 60000),
    seconds: Math.floor((timestamp % 60000) / 1000)
  }

  for (var i in format) {
    if (!format.hasOwnProperty(i)) {
      continue
    }

    var value = timestampObject[i]
    if (value === 0 && result === '' && ignore && i !== 'seconds') {
      continue
    }

    result += format[i].replace(REGEX[i], function () {
      if (value < 10 && arguments[0].length > 3) {
        value = '0' + value
      }
      return value
    })
  }

  return result
}
