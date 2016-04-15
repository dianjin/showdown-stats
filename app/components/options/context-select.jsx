import React, { Component, PropTypes } from 'react'
import contexts from '../../constants/contexts'
import { emptyStar, fullStar, capitalize } from '../../utils/string-utils'
import classNames from 'classnames'

require('./context-select.less')

const ContextSelect = ({context, onChangeContext, shiny, onToggleShiny}) => {
  const ContextButton = (str) => {
    const isBold = context === str
    return (
      <a
        className='-option'
        key={str}
        style={{fontWeight : isBold? 'bold': 'normal'}}
        onClick={() => onChangeContext(str)}>
        {capitalize(str)}
      </a>
    )
  }

  const star = shiny ? fullStar : emptyStar
  return (
    <div className="ContextSelect">
      Search by: {contexts.map(ContextButton)}
      <span className={classNames('-star', 'clickable')} onClick={() => onToggleShiny()}>{star}</span>
      <span style={{float: 'right'}}>
        Data from <a
          className='-credits'
          href={'http://www.smogon.com/forums/threads/official-smogon-university-usage-statistics-discussion-thread-mk-2.3508502/'}
          target='_blank'>Smogon</a>.
        View on <a
          className='-credits'
          href={'http://github.com/dianjin/showdown-stats'}
          target='_blank'>GitHub</a>.
      </span>
    </div>
  )
}

export default ContextSelect
