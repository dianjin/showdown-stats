import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleList } from './../../actions/actions'
import { upTriangle, downTriangle, capitalize } from '../../utils/string-utils'
import classNames from 'classnames'

require('./drawer.less')

const mapStateToProps = (state) => {
  return {
    lists: state.get('lists')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (list) => dispatch(toggleList(list))
  }
}

const mergeProps = (stateProps, dispatchProps, parentProps) => {
  const type = parentProps.type
  return {
    title: type,
    open: stateProps.lists.getIn([type, 'open']),
    children: parentProps.children,
    onClick: dispatchProps.onClick.bind(undefined, type),
    width: parentProps.width
  }
}

const Drawer = ({title, open, width, onClick, children}) => {
  var drawerStyle = {
    width: width,
    borderBottom: open ? '0px' : '1px solid black'
  }
  var containerStyle = {
    borderBottom: open ? '1px solid black' : '0px'
  }
  var node = open ? upTriangle : downTriangle
  return (
    <div style={containerStyle}>
      <div
        style={drawerStyle}
        className={classNames('Drawer', 'clickable')}
        onClick={onClick}>
        {capitalize(title)}
        <span className='-arrow'>{node}</span>
      </div>
      {open ? children : <span/>}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Drawer)
