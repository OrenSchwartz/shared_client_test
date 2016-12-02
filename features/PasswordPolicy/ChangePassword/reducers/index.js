import { handleActions } from 'redux-actions'
import { passwordValid, passwordNotValid, passwordDontMatch, sendDataToServer } from '../actions'

export const validations = handleActions({
  [passwordDontMatch]: () => [[2, "Password don't match"]],
}, {})

export const failedValidations = handleActions({
  [passwordValid]: () => [],
  [passwordNotValid]: (state, action) => Object.keys(action.payload)
    .map((key) => ({ key, value: action.payload[key].toString() })),
}, {})

export const loading = handleActions({
  [passwordNotValid]: () => false,
  [passwordValid]: () => false,
  [sendDataToServer]: () => true,
}, {})
