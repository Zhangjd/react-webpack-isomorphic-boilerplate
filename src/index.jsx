//css

//js

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import Home from './components/home/Home'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './stores/store'

//关联reducers, store, actions
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
