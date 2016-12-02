import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import {
  validations,
  failedValidations,
  loading,
} from './reducers'

const url = (state = '/') => state
const status = (state = 'init') => state
const userId = (state = '') => state
const userName = (state = '') => state
const companyName = (state = '') => state

const rootReducer = combineReducers({
  url,
  userId,
  userName,
  companyName,
  status,
  validations,
  failedValidations,
  loading,
})

const initialState = window.ChangePasswordInitialState || {}

const middlewares = [thunk]

// add logger middleware for development mode only
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middlewares.push(logger)
}

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
)
