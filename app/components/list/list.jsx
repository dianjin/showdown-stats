import React, { Component, PropTypes } from 'react'

// Functions
import { connect } from 'react-redux'
import { changeSortByList } from './../../actions/actions'
import { mergeItemWithDex } from '../../utils/dex-utils'

// Components
import Header from './list-header'
import ListItem from './list-item'

// Constants
import PropSettings from '../../constants/prop-settings'

// Stylesheets
require('./list.less')

const mapStateToProps = (state) => {
  return {
    lists: state.get('lists')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (list, prop) => dispatch(changeSortByList(list, prop))
  }
}

const mergeProps = (stateProps, dispatchProps, parentProps) => {
  // Type
  const type = parentProps.type

  // Parent props
  const propSettings = PropSettings[type]

  // State props
  const sortBy = stateProps.lists.getIn([type, 'sortBy'])
  const order = stateProps.lists.getIn([type, 'order'])
  const sortByFn = (item1, item2) => {
    var v1 = item1[sortBy].value
    var v2 = item2[sortBy].value
    if (order > 0) { return v1 > v2 } else { return v1 < v2 }
  }

  // Dispatch props
  const onChange = dispatchProps.onChange.bind(undefined, type)

  // Items
  const items = parentProps.itemList.map((item) => mergeItemWithDex(item, type)).sort(sortByFn)

  return {
    propSettings,
    sortBy,
    order,
    onChange,
    items
  }
}

const List = ({sortBy, order, items, propSettings, onChange}) => {
  return (
    <div className='List'>
      <Header
        order={order}
        sortBy={sortBy}
        onChange={onChange}
        propSettings={propSettings}/>
      {items.map((item) => <ListItem key={item.key} item={item} propSettings={propSettings}/>)}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(List)
