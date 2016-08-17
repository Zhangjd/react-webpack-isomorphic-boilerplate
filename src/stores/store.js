import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/reducer'

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  return createStore(rootReducer, initialState, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ))
}
