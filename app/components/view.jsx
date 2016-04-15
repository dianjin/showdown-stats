import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { startFetching, fetchMap } from './../actions/actions'
import pokedex from '../dex/pokedex'
import Pokemon from './pokemon/pokemon'
import objectAssign from 'object-assign'
import PokemonList from './pokemon-list/pokemon-list'
import { toContextMap, getOptions } from '../utils/map-utils'
import Immutable from 'immutable'
import { changeSortBy, changeEntity } from '../actions/actions'
import { EntitySelect } from './options/list-select'
import './view.less'

const ViewWrapper = (props) => {
  const { fetching, shiny, context, map, entity, sortBy, order, onChangeSortBy, onChangeEntity } = props
  if (map) {
    var container;
    if (context === 'pokemon') {
       container = (
        <Pokemon
          shiny={shiny}
          entity={entity}
          mapData={map.getIn([context, entity])}
          dexData={pokedex[entity]} />
        )
    } else {
      const sortByFn = (pokemon) => {
        if (order > 0) {
          return pokemon.get(sortBy)
        } else {
          return 1 / pokemon.get(sortBy)
        }
      }
      container = (
        <PokemonList
          shiny={shiny}
          pokemonList={map.getIn([context, entity])}
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
          order={order} />
      )
    }

    return (
      <div className='View'>
        <EntitySelect
          width='300px'
          entity={entity}
          map={map}
          context={context}
          onChangeEntity={onChangeEntity}/>
        {container}
      </div>
    )
  } else {
    return <span/>
  }
}

const mapStateToProps = (state) => {
  return {
    shiny: state.get('shiny'),
    fetching: state.get('fetching'),
    context: state.get('context'),
    entity: state.get('entity'),
    map: state.get('map'),
    sortBy: state.getIn(['pokemonList', 'sortBy']),
    order: state.getIn(['pokemonList', 'order'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSortBy: (sortBy) => dispatch(changeSortBy(sortBy)),
    onChangeEntity: (entity) => dispatch(changeEntity(entity))
  }
}

const View = connect(mapStateToProps, mapDispatchToProps)(ViewWrapper)

export default View
