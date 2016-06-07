import * as types from './../constants/action-types'
import defaultSelected from './../constants/default-selected'
import Immutable from 'immutable'
import { toContextMap } from '../utils/map-utils'

const randomInt = (min, max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}

const initialState = Immutable.fromJS({
  fetching: true,
  shiny: false,
  context: 'pokemon',
  perspective: {
    year: 2016,
    month: 5,
    tier: 1630
  },
  lists: {
    items: { open: false, sortBy: 'usage', order: -1 },
    moves: { open: true, sortBy: 'usage', order: -1 },
    abilities: { open: false, sortBy: 'usage', order: -1 },
    spreads: { open: false, sortBy: 'usage', order: -1 },
    teammates: { open: false, sortBy: 'usage', order: -1 }
  },
  pokemonList: {
    sortBy: 'rank',
    order: 1
  },
  prevSelected: defaultSelected
})

const DEFAULT_MAXRANK = 100

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MAP:
      return state.set('fetching', true)
    case types.RECEIVE_MAP:
      const rootMap = Immutable.fromJS(action.map)
      const setDefaultEntity = (entity) => {
        if (!entity) {
          let names = rootMap.filter((pokemon) => pokemon.get('rank') < DEFAULT_MAXRANK).keySeq()
          return names.get(randomInt(0, names.count() - 1))
        } else {
          return entity
        }
      }
      return state
        .update('entity', setDefaultEntity)
        .setIn(['map', 'pokemon'], rootMap)
        .setIn(['map', 'items'], toContextMap(rootMap, 'items'))
        .setIn(['map', 'abilities'], toContextMap(rootMap, 'abilities'))
        .setIn(['map', 'moves'], toContextMap(rootMap, 'moves'))
        .set('fetching', false)
    case types.CHANGE_ENTITY:
      return state
        .set('entity', action.entity)
    case types.CHANGE_PERSPECTIVE:
      return state.setIn(['perspective', action.key], action.value)
    case types.CHANGE_CONTEXT:
      if (state.get('context') === action.context) {
        return state
      } else {
        return state
          .set('context', action.context)
          .setIn(['prevSelected', state.get('context')], state.get('entity'))
          .set('entity', state.getIn(['prevSelected', action.context]))
      }
    case types.TOGGLE_SHINY:
      return state.update('shiny', shiny => !shiny)
    case types.CHANGE_SORTBY:
      const currentSortBy = state.getIn(['pokemonList', 'sortBy'])
      if (currentSortBy === action.sortBy) {
        return state.updateIn(['pokemonList', 'order'], order => order * -1)
      } else {
        return state.setIn(['pokemonList', 'sortBy'], action.sortBy)
          .setIn(['pokemonList', 'order'], action.sortBy === 'rank' ? 1 : -1)
      }
    case types.CHANGE_SORTBY_LIST:
      var currentList = state.getIn(['lists', action.list])
      var order = currentList.get('order')
      var sortBy = currentList.get('sortBy')
      var newOrder;
      if (action.prop === sortBy) {
        newOrder = order * -1;
      } else {
        newOrder = order
      }
      return state
        .setIn(['lists', action.list, 'sortBy'], action.prop)
        .setIn(['lists', action.list, 'order'], newOrder)
    case types.TOGGLE_LIST:
      return state.updateIn(['lists', action.list, 'open'], (open) => !open)
    default:
      return state
  }
}
