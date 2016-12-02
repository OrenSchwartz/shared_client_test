import { handleActions } from 'redux-actions'
import { sendDataToServer, errorFromServer, codeSent } from './actions'

export const errorMessage = handleActions({
  [errorFromServer]: (state, action) => action.payload.message ? action.payload.message : state,
}, '')

export const codeSentSucceeded = handleActions({
  [codeSent]: (state, action) => action.payload,
}, {})

export const loading = handleActions({
  [sendDataToServer]: () => true,
  [errorFromServer]: () => false,
  [codeSent]: () => false,
}, {})

export const forgotPasswordReducers = ({
  errorMessage,
  codeSentSucceeded,
  loading
})
