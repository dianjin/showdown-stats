var extraData = require('./extra-data')
var fs = require('fs');

var MAX_ARRAY_LENGTH = 10;
var PROPERTIES = [
  'abilities',
  'items',
  'spreads',
  'teammates',
  'usage',
  'moves'
];

var roundOff = function(number) {
  return parseFloat(number.toFixed(2))
}

var getPercent = function(value, denominator) {
  return parseFloat((value / denominator * 100).toFixed(2))
}

var toList = function (object, denominator, standardizedKey) {
  var getNameValuePair;
  switch(standardizedKey) {
    case 'spreads':
      getNameValuePair = function(key) {
        var spread = key.split(':');
        var EV = spread[1].split('/').map(function(n) { return parseInt(n)})
        var strKey = spread[0] + ':' + EV.join('/')
        return {
          nature: spread[0],
          hp: EV[0],
          atk: EV[1],
          def: EV[2],
          spa: EV[3],
          spd: EV[4],
          spe: EV[5],
          key: strKey,
          usage: getPercent(object[key], denominator)
        }
      }
      break;
    default:
      getNameValuePair = function(key) {
        return {
          key: key,
          usage: getPercent(object[key], denominator)
        }
      }
      break;
  }
  return Object.keys(object).map(getNameValuePair).filter(function(obj) {
    return obj.usage > 0;
  }).sort(function (a,b) {
    return 1/Math.abs(a.usage) - 1/Math.abs(b.usage)
  }).slice(0, MAX_ARRAY_LENGTH)
}

var camelize = function (key) {
  return key.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

var toPokemonType = function (name, object) {
  // name = 'Porygon'
  // object = {Abilities: Object, Items: Object}
  // var propertyList = Object.keys(object).map((key) => toProperty(key, object[key]))
  var extra = extraData[name]
  const denominator = extra['denominator']
  var propertyObject = Object.keys(object).reduce(function(state, key) {
    const value = object[key]
    const standardizedKey = camelize(key)
    if (PROPERTIES.indexOf(standardizedKey) > -1) {
      switch (typeof value) {
        case 'object':
          state[standardizedKey] = toList(value, denominator, standardizedKey)
          break
        case 'number':
          if (standardizedKey === 'usage') {
            state[standardizedKey] = parseFloat((value * 100).toFixed(2))
          } else {
            state[standardizedKey] = value
          }
          break
        case 'string':
          state[standardizedKey] = value
          break
      }
    }
    return state
  }, {})
  var ret = Object.assign({},
    {name: name},
    {rank: extra.rank},
    propertyObject)
  return ret;
}

var cleanName = function(name) {
  return name.toLowerCase().replace(/\W/g, '')
}

module.exports = function (data) {
  var byRank = function (p1, p2) {
    return p1.rank - p2.rank;
  }
  var list = Object.keys(data).map(function(name) {
    return toPokemonType(name, data[name])
  }).sort(byRank)

  return list.reduce(function(state, object) {
    state[cleanName(object.name)] = object;
    return state;
  }, {})
}
