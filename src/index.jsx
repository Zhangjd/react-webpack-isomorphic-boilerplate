//css

//js
require('core-js/fn/object/assign')
require('babel-polyfill')

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './stores/store'
import routes from './routes.jsx'

//关联reducers, store, actions
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
