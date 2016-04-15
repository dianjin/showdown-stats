import React, { Component, PropTypes } from 'react'
import 'react-select/dist/react-select.css'
var Select = require('react-select')
import {tiers, years, months} from '../../constants/map-constants'
import {getMapUrl} from '../../utils/perspective-utils'
import {getOptions} from '../../utils/map-utils'
import Immutable from 'immutable'
import 'whatwg-fetch'
import './list-select.less'

class EntitySelect extends Component {
  render() {
    const {entity, context, map, onChangeEntity} = this.props
    return (
      <Select
        className='EntitySelect'
        clearable={false}
        onChange={(option) => onChangeEntity(option.key)}
        options={getOptions(map.get(context), context)}
        value={entity}
        valueKey='key'/>
    )
  }
}

class MapSelect extends Component {
  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.perspective, this.props.perspective)
  }
  componentWillMount() {
    const {perspective, onFetchMap, onReceiveMap} = this.props
    onFetchMap()
    fetch(getMapUrl(perspective))
      .then((response) => { return response.json() })
      .then((json) => { onReceiveMap(json) })
      .catch(function(ex) { console.log('parsing failed', ex) })
  }
  componentDidUpdate() {
    const {perspective, onFetchMap, onReceiveMap} = this.props
    onFetchMap()
    fetch(getMapUrl(perspective))
      .then((response) => { return response.json() })
      .then((json) => { onReceiveMap(json) })
      .catch(function(ex) { console.log('parsing failed', ex) })
  }
  render() {
    const {perspective, onChangePerspective, fetching} = this.props;
    return (
      <div className='MapSelect'>
        <Select
          clearable={false}
          value={perspective.get('tier')}
          onChange={(tier) => onChangePerspective('tier', tier.value)}
          options={tiers}/>
        <Select
          clearable={false}
          value={perspective.get('month')}
          onChange={(month) => onChangePerspective('month', month.value)}
          options={months}/>
        <Select
          clearable={false}
          value={perspective.get('year')}
          onChange={(year) => onChangePerspective('year', year.value)}
          options={years}/>
      </div>
    )
  }
}

export {
  EntitySelect, MapSelect
}
