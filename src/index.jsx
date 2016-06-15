//css
require('style/base')
require('style/header')
require('style/style')
require('style/swiper-3.3.1.min')
require('style/home')

//js
require('libs/swiper-3.3.1.jquery.min')
require('libs/md5')
require('libs/pv_click')
require('jquery.cookie')

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import Home from './components/home/Home'
import SubmitComp from './components/submit/Submit'
import Order from './components/order/Order'
import Summary from './components/summary/Summary'
import Param from './components/param/Param'
import PaySuccess from './components/paysuccess/PaySuccess'
import Down from './components/down/Down'
import Help from './components/help/Help'
import Support from './components/support/Support'
import Verify from './components/verify/Verify'

import {xunleiLogin} from './actions/verifyaction'


import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import configureStore from './stores/store'

//关联reducers, store, actions
const store = configureStore()

//初始化迅雷登录

xlQuickLogin.init({
    loginID: '156', // 注册ID：xlreading_pc
    registerID: 'xzb',
    uiTheme: 'popup',
    LOGIN_ID: '156',
    REGISTER_ID: 'xzb',
    //DEFUALT_BACKGROUND : 'http://misc.yuedu.xunlei.com/v3.0/img/logo.jpg',
    UI_THEME: 'popup',
    LOGIN_SUCCESS_FUNC: function () {
      var usernick = /usernick=(.*?)(?:;|$)/ig.exec(document.cookie)
      if(usernick && usernick.length>1){
        usernick = usernick[1]
      }
      var username = /usrname=(.*?)(?:;|$)/ig.exec(document.cookie)
      if(username && username.length>1){
        username = username[1]
      }
      store.dispatch(xunleiLogin('success',usernick || username))
    },
    LOGOUT_FUNC: function () {
      store.dispatch(xunleiLogin('nologin', ''))
    }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/submit" component={SubmitComp}/>
      <Route path="/order" component={Order}/>
      <Route path="/summary" component={Summary}/>
      <Route path="/param" component={Param}/>
      <Route path="/paysuccess" component={PaySuccess}/>
      <Route path="/down" component={Down}/>
      <Route path="/help" component={Help}/>
      <Route path="/verify" component={Verify}/>
      <Route path="/support(/:id)" component={Support}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
