var toFunction = require('to-function')
var assign = require('object-assign')

module.exports = function nestByTuple (object, fn) {
  fn = toFunction(fn)

  var otherKeys = Array.prototype.slice.call(arguments, 2)

  var result = Array.isArray(object)
    ? groupByArray(object, fn)
    : groupByObject(object, fn)

  if (otherKeys.length > 0) {
    var keys = Object.keys(result)
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      result[key].values = nestByTuple.apply(this, [ result[key].values ].concat(otherKeys))
    }
  }

  return result
}

function groupByArray (object, fn) {
  var result = {}
  for (var i = 0, len = object.length; i < len; i++) {
    var fnres = tuple(fn(object[i], i, i))
    var prop = fnres[0]
    var propVal = fnres[1]
    if (!result[prop]) result[prop] = assign({}, propVal, { values: [] })
    result[prop].values.push(object[i])
  }
  return result
}

function groupByObject (object, fn) {
  var result = {}
  var keys = Object.keys(object)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    var fnres = tuple(fn(object[key], i, i))
    var prop = fnres[0]
    var propVal = fnres[1]
    if (!result[prop]) result[prop] = assign({}, propVal, { values: {} })
    result[prop].values[key] = object[key]
  }
  return result
}

function tuple (result) {
  if (Array.isArray(result)) {
    return result
  }

  return [ result, { property: result } ]
}
