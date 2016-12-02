import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { loginPageReducers } from 'features/Login/PasswordLogin/reducers'
import { forgotPasswordReducers } from 'features/Login/ForgotPassword/reducers'
import { serverRequestUIReducers } from 'sharedComponents/ServerRequestUI/reducers'

const rootReducer = combineReducers({
  ...serverRequestUIReducers,
  ...forgotPasswordReducers,
  ...loginPageReducers
})
const middlewares = [thunk]

// add logger middleware for development mode only
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middlewares.push(logger)
}

export default createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
