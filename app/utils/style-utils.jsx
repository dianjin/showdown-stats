import pokedex from '../dex/pokedex'
import sprites from '../dex/sprites'

const getNameFromKey = (key, toLowerCase = false) => {
  if (toLowerCase) {
    return (pokedex[key].species.replace('\'', '')).toLowerCase()
  } else {
    return (pokedex[key].species.replace('\'', ''))
  }
}
const getSpriteFromKey = (key, shiny) => {
  const color = shiny ? 'shiny' : 'regular'
  return 'https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/' + color + '/'
    + getNameFromKey(key, true) + '.png'
}

const getSpriteStyleFromKey = (key, shiny) => {
  var tree = sprites;
  var branch;
  var nameSegments = getNameFromKey(key, true).split('-')
  var attrs = {
    'dir': null,
    'color': shiny ? 'shiny' : 'regular',
    'type': 'pkmn',
    'slug': nameSegments[0],
    'form': nameSegments[1],
    'gender': null
  }
  if (nameSegments[0] === 'ho') {
    attrs.slug = 'ho-oh'
  } else if (key === 'mrmime') {
    attrs.slug = 'mr-mime'
  }
  // The following list contains fallbacks. If a certain form
  // or variation is not found in the coordinates list, it will
  // either fall back to something from this list, or return an error.
  var attr, val, fbval;
  var fallbacks = {
    "type": null,
    "slug": null,
    "form": ".",
    "gender": ".",
    "color": "regular"
  };
  var props = {
    "flipped": attrs.dir === 'right'
  };

  for (attr in fallbacks) {
    // Check if we've reached an end node and quit iterating if so.
    if (tree.x >= 0) {
      break;
    }

    val = attrs[attr];
    fbval = fallbacks[attr];

    // If the value exists in the tree, continue via that branch.
    if (branch = tree[val]) {
      tree = branch;
      continue;
    }
    // If not, continue via the fallback value.
    else
    if (branch = tree[fbval]) {
      tree = branch;
      // If we're reverting from a non-existent right-facing icon,
      // keep note that this icon should be flipped later.
      if (val == "right") {
        props.flipped = true;
      }
      continue;
    }
    // If the fallback value doesn't exist, error out.
    else {
      tree = null;
      break;
    }
  }
  return {
    backgroundPosition: (-tree.x) + 'px ' + (-tree.y) + 'px'
  };
}

const colors = {
  'Normal': '#a8a878',
  'Fire': '#f08030',
  'Fighting': '#c03028',
  'Water': '#6890f0',
  'Flying': '#a890f0',
  'Grass': '#78c850',
  'Poison': '#a040a0',
  'Electric': '#f8d030',
  'Ground': '#e0c068',
  'Psychic': '#f85888',
  'Rock': '#b8a038',
  'Ice': '#98d8d8',
  'Bug': '#a8b820',
  'Dragon': '#7038f8',
  'Ghost': '#705898',
  'Dark': '#705848',
  'Steel': '#b8b8d0',
  'Fairy': '#ee99ac'
}

const getColor = (types, index) => {
  if (types.length === 1) {
    return colors[types[0]]
  } else {
    return colors[types[index % 2]]
  }
}

export {
  getNameFromKey,
  getSpriteFromKey,
  getSpriteStyleFromKey,
  getColor
}
