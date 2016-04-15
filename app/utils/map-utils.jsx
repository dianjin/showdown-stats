import Immutable from 'immutable'
import pokemon from '../dex/pokedex'
import items from '../dex/items'
import abilities from '../dex/abilities'
import moves from '../dex/moves'

const dex = {
  pokemon,
  items,
  abilities,
  moves
}

const USAGE_THRESHOLD = 0.1

var mapReducer = (currentList, contextObj, key, nameKey, context) => {
  if (dex[context][key] === undefined) {
    console.log(context, key)
  }
    return currentList.push({
      label: dex[context][key][nameKey],
      key: key,
      rank: contextObj.get('rank')
    })

}

const getOptions = (map, context) => {
  var nameKey
  if (context === 'pokemon') {
    nameKey = 'species'
  } else {
    nameKey = 'name'
  }
  if (!Immutable.Map.isMap(map)) map = Immutable.fromJS(map)
  return map.reduce(
    (reduced, value, key) => mapReducer(reduced, value, key, nameKey, context),
    Immutable.List()).sortBy((value) => value.rank).toJS()
}

const toContextMap = (rootMap, context) => {
  var contextMap = rootMap.map(function(pokemon, name) {
    return pokemon.get(context)
  }).reduce((moveMap, moveList, pokemonName) => {
    var pokemonRank = rootMap.getIn([pokemonName, 'rank'])
    moveList.forEach(function(move) {
      var moveKey = move.get('key');
      var usage = move.get('usage');
      if (usage > USAGE_THRESHOLD && moveKey !== 'nothing') {
        var newValue = Immutable.fromJS({
          rank: pokemonRank,
          usage: usage > 100 ? 100 : usage,
          key: pokemonName.replace(/-/g, '').toLowerCase()
        })
        moveMap = moveMap.update(moveKey, Immutable.List(), currentList => currentList.push(newValue))
      }
    })
    return moveMap
  }, Immutable.Map())
  return contextMap
}

export {
  getOptions, toContextMap
}
