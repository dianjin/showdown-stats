const moveSettings = [
  { key: 'name', displayName: 'Move', width: '170px' },
  { key: 'usage', displayName: 'Usage', width: '80px', isPercent: true },
  { key: 'category', displayName: 'Category', width: '100px' },
  { key: 'type', displayName: 'Type', width: '80px' },
  { key: 'basePower', displayName: 'BP', width: '60px', undefinedValue: 0 },
  { key: 'accuracy', displayName: 'Accuracy', width: '80px', undefinedValue: true, isPercent: true }
]

const abilitySettings = [
  { key: 'name', displayName: 'Ability', width: '200px' },
  { key: 'usage', displayName: 'Usage', width: '80px', isPercent: true }
]

const itemSettings = [
  { key: 'name', displayName: 'Item', width: '200px' },
  { key: 'usage', displayName: 'Usage', width: '80px', isPercent: true }
]

const spreadSettings = [
  // Sum to 220
  { key: 'nature', displayName: 'Nature', width: '110px' },
  { key: 'usage', displayName: 'Usage', width: '110px', isPercent: true },
  // Sum to 360
  { key: 'hp', displayName: 'HP', width: '60px'},
  { key: 'atk', displayName: 'Atk', width: '60px'},
  { key: 'def', displayName: 'Def', width: '60px'},
  { key: 'spa', displayName: 'SpA', width: '60px'},
  { key: 'spd', displayName: 'SpD', width: '60px'},
  { key: 'spe', displayName: 'Spe', width: '60px'}
]

const teamSettings = [
  // Sum to 220
  { key: 'species', displayName: 'Pokemon', propName: 'name', width: '200px' },
  { key: 'usage', displayName: 'Usage', propName: 'usage', width: '120px', showSign: true, isPercent: true }
]

export default {
  moves: moveSettings,
  abilities: abilitySettings,
  items: itemSettings,
  spreads: spreadSettings,
  teammates: teamSettings
}
