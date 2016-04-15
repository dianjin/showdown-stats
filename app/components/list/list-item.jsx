import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

require('./list-item.less')

const ListItem = ({propSettings, item}) => {
  return (
    <div className='ListItem'>
      {propSettings.map((propSetting) => {
        var key = propSetting.key
        var className = '-' + key
        var style = {width: propSetting.width}
        var value = item[key].value
        if (propSetting.undefinedValue === value) {
          value = undefined
        } else {
          if (propSetting.showSign) {
            value = value > 0 ? '+' + value : value
          }
          if (propSetting.isPercent) {
            value = value + '%'
          }
        }
        return (<span key={key} className={className} style={style}>{value}</span>)
      })}
    </div>
  )
}

export default ListItem
