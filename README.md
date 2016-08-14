# react-webpack-isomorphic-boilerplate

This project serves as a boilerplate to start building an isomorphic rendering application in React, based on the following boilerplate code:

* [react-webpack-project](http://git.oschina.net/alanguo/react-webpack-project)
* [isomorphic-redux-app](https://github.com/caljrimmer/isomorphic-redux-app)

For more information, please visit my website [探索 React 服务器端加载](http://blog.zhangjd.me/2016/08/11/react-server-side-rendering/) for details.

## Features

- Hot reloading middleware
- Redux DevTools and Logging
- Redux Routing
- Static content example
- Server-side webpack middleware

## Stack

- React.js
- React-router
- Webpack
- Express
- Redux
- Redux-DevTools
- Babel
- ~~[New Relic](https://github.com/newrelic/node-newrelic) (Bug founded?)~~

## Configuration

1. ~~If you wish to use `New Relic` for application performance management & monitoring, configure your own `app_name` and `license_key` in `src/server/newrelic.js`. Otherwise, please uncomment the line `require('./newrelic')` in `src/server/index.js`.~~
2. If you wish to use `Forever` module for ensuring that a given script runs continuously, please set your own path info in JSON configuration file `forever.json`, then start the process with forever.

## Development Installation

In the project's directory, run the following commands:

```
$ npm install
$ npm run build-server
$ npm run server-dev
```

Then Visit

```
http://localhost:3002
```

## Releasing to Production

Production has Devtools, logging and hot reloading middleware removed and the scripts/css compressed.

In the project's directory, run the following commands:

```
$ npm run production
$ npm run server
```

Then Visit

```
http://localhost:3002
```
