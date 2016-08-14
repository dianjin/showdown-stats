var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var ELOtiers = [0, 1500, 1630, 1760]
var getTier = function(ELOtier) {
  return 'vgc2016-' + ELOtier;
}

// Data should be stored as follows:
// kdjin.me/vgc-stats/static/data/2016-02/0/ps-map.js

// ***** STUFF TO MODIFY
var year = '2016';
var month = '07';
var n = 3

// ***** DONT TOUCH STUFF BELOW THIS LINE!

var season = year + '-' + month
var tier = ELOtiers[n]

var dataDir = path.join(__dirname, '../build/static/')
mkdirp(dataDir)


var chaosUrl = function(season, tier) {
  return 'http://www.smogon.com/stats/' + season + '/chaos/' + getTier(tier) + '.json'
}
var extraUrl = function(season, tier) {
  return 'http://www.smogon.com/stats/' + season + '/moveset/' + getTier(tier) + '.txt'
}
var prettyStringify = function(json) {
  return JSON.stringify(json, null, '\t')
}

request.get(extraUrl(season, tier), function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var lines = body.split('\n')
    var indices = []
    for (var i = 0; i < lines.length ; i++) {
      if (lines[i].startsWith(' | Avg.')) {
        indices.push(i)
      }
    }
    var extraData = indices.reduce(function(currentObj, index, rank) {
      var removeWhiteSpaceAndSep = function(line) {
        return line.replace(/[ |]/g,'')
      }
      var removeSep = function(line) {
        return line.replace(/[|]/g, '')
      }
      var pokemonName = removeSep(lines[index-3]).trim();
      var weight = removeWhiteSpaceAndSep(lines[index]).substring('Avg.weight:'.length);
      var rawCount = removeWhiteSpaceAndSep(lines[index-1]).substring('Rawcount:'.length);
      currentObj[pokemonName] = {
        rank: rank + 1,
        denominator: parseFloat(weight) * rawCount
      }
      return currentObj
    }, {})

    var myJSON = JSON.stringify(extraData)
    fs.writeFile(__dirname + "/constants/extra-data.js", 'module.exports = ' + myJSON, function(err) {
      if(err) {
        return console.log(err);
      }
      // console.log(myJSON)
      console.log('Wrote to extra-data.js')
    })
  }
});

var writeFile = function(key, output) {
  var filename = '/' + [year, month, tier].join('-') + '.js'
  fs.writeFile(dataDir + filename, prettyStringify(output[key]), function(err) {
    if(err) { return console.log(err); }
    console.log('Wrote to ' + filename)
  })
}

request.get(chaosUrl(season, tier), function (error, response, body) {
  var parseChaos = require(__dirname + '/chaos-parser.js')
  var filename = '/' + [year, month, tier].join('-') + '.js'
  if (!error && response.statusCode == 200) {
    var bodyData = JSON.parse(body).data;
    var output = parseChaos(bodyData);
    fs.writeFile(dataDir + filename, prettyStringify(output), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Wrote to " + filename)
    })
    // var keys = Object.keys(output)
    // for (var i = 0; i < keys.length; i++) {
      // writeFile(keys[i], output)
    // }
  }
});
