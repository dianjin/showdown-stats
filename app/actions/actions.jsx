import * as types from './../constants/action-types'

export function changeEntity(entity) {
  return {
    type: types.CHANGE_ENTITY,
    entity
  }
}

export function toggleShiny() {
  return {
    type: types.TOGGLE_SHINY
  }
}

export function changeContext(context) {
  return {
    type: types.CHANGE_CONTEXT,
    context
  }
}

export function changeSortByList(list, prop) {
  return {
    type: types.CHANGE_SORTBY_LIST,
    list,
    prop
  }
}

export function changeSortBy(sortBy) {
  return {
    type: types.CHANGE_SORTBY,
    sortBy
  }
}

export function changePerspective(key, value) {
  return {
    type: types.CHANGE_PERSPECTIVE,
    key,
    value
  }
}
export function toggleList(list) {
  return {
    type: types.TOGGLE_LIST,
    list
  }
}

export function receiveMap(map) {
  return {
    type: types.RECEIVE_MAP,
    map
  }
}

export function fetchMap() {
  return {
    type: types.FETCH_MAP
  }
}
