import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import App from './app'

import reducer from './reducers/';

require('./index.less')

let store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
