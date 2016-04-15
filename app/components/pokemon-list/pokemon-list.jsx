import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'

import './pokemon-list.less'
import { getNameFromKey, getSpriteStyleFromKey } from '../../utils/style-utils'
import { upArrow, downArrow } from '../../utils/string-utils'



const PokemonList = ({pokemonList, sortBy, order, onChangeSortBy, shiny}) => {

  const PokemonListItem = (pokemon) => {
    const key = pokemon.get('key')
    return (
      <div key={key} style={{height: '60px'}}>
        <icon className='-icon' style={getSpriteStyleFromKey(key, shiny)}/>
        <div className='-column' style={{width: '140px'}}>{getNameFromKey(key)}</div>
        <div className='-column'>{pokemon.get('usage') + '%'}</div>
        <div className='-column'>{pokemon.get('rank')}</div>
      </div>
    )
  }

  const sortByFn = (pokemon) => {
    if (order < 0) {
      return 1 / pokemon.get(sortBy)
    } else {
      return pokemon.get(sortBy)
    }
  }

  const arrow = order > 0 ? upArrow : downArrow
  const usage = 'Usage' + (sortBy === 'usage' ? arrow : '')
  const rank = 'Rank' + (sortBy === 'rank' ? arrow : '')

  if (pokemonList) {
    return (
      <div className='pokemonList'>
        <icon className='-icon' style={{background: 'none'}}/>
        <div className={classNames('-header')} style={{width: '140px'}}>Pokemon</div>
        <div className={classNames('-header', 'clickable')} onClick={() => onChangeSortBy('usage')}>{usage}</div>
        <div className={classNames('-header', 'clickable')} onClick={() => onChangeSortBy('rank')}>{rank}</div>
        {pokemonList.sortBy(sortByFn).map(PokemonListItem)}
      </div>
    )
  } else {
    return (
      <div>No data.</div>
    )
  }

}

export default PokemonList
