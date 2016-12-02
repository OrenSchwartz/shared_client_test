import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {reducer as toastrReducer} from 'react-redux-toastr'

import {
  companyIds,
  submitIdsSuccess,
  submitIdsFailure,
  enableSaveButton,
  submitIdsFailureMessage,
  policyForAllCompaniesEnabled,
} from './reducers'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  companyIds,
  submitIdsSuccess,
  submitIdsFailure,
  enableSaveButton,
  submitIdsFailureMessage,
  policyForAllCompaniesEnabled,
})

const initialState = window.passwordRollOutInitialState || {}

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
