import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Functions
import { changeEntity, toggleShiny, changePerspective, changeContext, fetchMap, receiveMap } from '../../actions/actions'
import { getOptions } from '../../utils/map-utils'
import { getMapUrl } from '../../utils/perspective-utils'

// Components
import { EntitySelect, MapSelect } from './list-select'
import ContextSelect from './context-select'

// Modules
import objectAssign from 'object-assign'

// style
import './option-container.less'

const Options = (props) => {
  return (
    <div>
      <ContextSelect
        context={props.context}
        shiny={props.shiny}
        onToggleShiny={props.onToggleShiny}
        onChangeContext={props.onChangeContext}/>
      <MapSelect
        fetching={props.fetching}
        onFetchMap={props.onFetchMap}
        onReceiveMap={props.onReceiveMap}
        onChangePerspective={props.onChangePerspective}
        perspective={props.perspective}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fetching: state.get('fetching'),
    shiny: state.get('shiny'),
    context: state.get('context'),
    perspective: state.get('perspective')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeContext: (context) => dispatch(changeContext(context)),
    onChangePerspective: (key, value) => dispatch(changePerspective(key, value)),
    onFetchMap: (data) => dispatch(fetchMap()),
    onReceiveMap: (data) => dispatch(receiveMap(data)),
    onToggleShiny: (data) => dispatch(toggleShiny())
  }
}

const OptionContainer = connect(mapStateToProps, mapDispatchToProps)(Options)

export default OptionContainer
