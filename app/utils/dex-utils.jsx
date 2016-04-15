import objectAssign from 'object-assign'
import PropSettings from '../constants/prop-settings'

import movedex from '../dex/moves'
import abilitydex from '../dex/abilities'
import itemdex from '../dex/items'
import pokedex from '../dex/pokedex'

const DexList = {
  items: itemdex,
  moves: movedex,
  abilities: abilitydex,
  natures: undefined,
  teammates: pokedex
}

const mapTypeToProps = (item, type) => {
  const dex = DexList[type]
  const propSettings = PropSettings[type]
  return propSettings.reduce((props, propSetting) => {
    var value;
    const width = propSetting.width;
    switch (propSetting.key) {
      // These properties can be obtained from the item
      case 'hp':
      case 'atk':
      case 'def':
      case 'spa':
      case 'spd':
      case 'spe':
      case 'nature':
      case 'usage':
        value = item[propSetting.key]
        break
      case 'rank':
        value = item.rank
        break
      case 'species':
        value = item.key
        break
      // Other properties must be obtained from the dex
      default:
        var dexKey = item.key
        if (item.key === 'nothing') {
          value = 'Nothing'
        } else {
          value = dex[dexKey][propSetting.key]
        }
        break;
    }
    props[propSetting.key] = {
      value,
      width
    }
    return props;
  }, {})
}

const mergeItemWithDex = (item, type) => {
  return objectAssign({}, {key: item.key}, mapTypeToProps(item, type))
}

export {
  mergeItemWithDex
}
