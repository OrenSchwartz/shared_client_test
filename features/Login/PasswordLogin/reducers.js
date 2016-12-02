import { handleActions } from 'redux-actions'
import { submitLoginEvent, submitLoginEndEvent, loginSucceededEvent, loginFailedEvent } from './actions'
import { StatusList } from 'sharedComponents'
import { AppConsts } from 'infra'
import  PasswordLoginConsts from './consts'

export const serverRequestActive = handleActions({
  [submitLoginEvent]: (state, action) => true,
  [loginFailedEvent]: (state, action) => false,
  [submitLoginEndEvent]: (state, action) => false
}, PasswordLoginConsts.SERVER_REQUEST_ACTIVE_INITIAL_STATE)

export const loggedInUsername = handleActions({
  [loginSucceededEvent]: (state, action) => action.payload.request.user_session.username,
  [loginFailedEvent]: (state, action) => ''
}, '')

export const errors = handleActions({
  [submitLoginEvent]: (state, action) => PasswordLoginConsts.ERRORS_INITIAL_STATE,
  [loginSucceededEvent] : (state, action) => PasswordLoginConsts.ERRORS_INITIAL_STATE,
  [loginFailedEvent] : (state, action) => {
      let response = action.payload;
      if (!response || !response.errorCode)
        return state;

      if (response.errorCode != AppConsts.HTTP_CODE_GENERAL_SERVER_ERROR){
        return [[StatusList.VALIDITY_STATES.ERROR,response.errorMessage]]
      }
      return state;
  }
}, PasswordLoginConsts.ERRORS_INITIAL_STATE)

export const loginPageReducers = ({
  serverRequestActive,
  loggedInUsername,
  errors
})
