import React, { Component, PropTypes } from 'react'
import { getColor } from '../../utils/style-utils'

require('./pokemon-stats.less')

const Stats = ({types, stats, rank, usage}) => {
  const keys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe']
  return (
    <div className='PokemonStats' >
      <div className='-data'>
        <span className='-text'>Rank</span>
        <span className='-number'>{rank}</span>
      </div>
      <div className='-data'>
        <span className='-text'>Usage</span>
        <span className='-number'>{usage + '%'}</span>
      </div>
      {keys.map((stat, index) => {
        return <StatBar key={stat} value={stats[stat]} bgColor={getColor(types, index)}/>
      })}
    </div>
  )
}

const StatBar = ({value, bgColor}) => {
  var style = {
    width: value * 1.2 + 'px',
    backgroundColor: bgColor
  }
  return (
    <div className='StatBar'>
      <span className='-stat'>{value}</span>
      <span className='-bar' style={style}/>
    </div>
  )
}

export default Stats
