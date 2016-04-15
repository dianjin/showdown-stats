import React, { Component, PropTypes } from 'react'
import { upArrow, downArrow } from '../../utils/string-utils'
import classNames from 'classnames'

require('./list-header.less')

const ListHeader = ({propSettings, sortBy, order, onChange}) => {
  const column = (propSetting) => {
    var style = {
      width: propSetting.width
    }
    var node = sortBy === propSetting.key ? (order > 0 ? upArrow : downArrow) : ''
    return (
      <span
        key={propSetting.key}
        style={style}
        onClick={() => onChange(propSetting.key)}>
        {propSetting.displayName}
        <span className='-arrow'>{node}</span>
      </span>
    )
  }
  return (
    <div className={classNames('Header', 'clickable')}>
      {propSettings.map(column)}
    </div>
  )
}

export default ListHeader
