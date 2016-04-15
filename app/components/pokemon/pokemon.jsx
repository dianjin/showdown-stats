import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import {getSpriteFromKey, getSpriteCoords} from '../../utils/style-utils'
import List from '../list/list'
import Drawer from './drawer'
import Stats from './pokemon-stats'

require('./pokemon.less')

const Pokemon = ({entity, mapData, dexData, shiny}) => {
  const list = (context, width) => (
    <Drawer type={context} width='600px'>
      <List type={context} itemList={mapData.get(context).toJS()}/>
    </Drawer>
  )
  if (mapData) {
    return (
      <div>
        <img
          className='PokemonIcon'
          src={getSpriteFromKey(entity, shiny)}
          style={{width: '300px', height: '225px'}}/>
        <Stats
          types={dexData.types}
          rank={mapData.get('rank')}
          usage={mapData.get('usage')}
          stats={dexData.baseStats}/>
        <div className='PokemonInfo'>
          {list('items')}
          {list('abilities')}
          {list('teammates')}
          {list('moves')}
          {list('spreads')}
        </div>
      </div>
    )
  } else {
    return (
      <div className='NoData'>
        No data.
      </div>
    )
  }
}

Pokemon.propTypes = {
  pokemon: PropTypes.object
}

export default Pokemon
