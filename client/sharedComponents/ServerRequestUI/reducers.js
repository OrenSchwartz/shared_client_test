import { handleActions } from 'redux-actions'
import { onSubmitEvent, onSubmitEndEvent, popupErrorOpenEvent, popupErrorCloseEvent } from 'infra/appActions'

const htmlError = 'Unexpected token < in JSON at position 0'
export const popupMessage = handleActions({
  [onSubmitEvent]: (state, action) => '',
  [popupErrorOpenEvent]: (state, action) =>
      action.payload &&
        (action.payload.errorMessage || (action.payload.message && action.payload.message != htmlError))
      ? (action.payload.errorMessage || action.payload.message)
      : "unexpected_error",
  [popupErrorCloseEvent]:(state, action) => ''
}, '')


export const isLoading = handleActions({
  [onSubmitEvent]: (state, action) => true,
  [onSubmitEndEvent]: (state, action) => action.payload,
  [popupErrorOpenEvent]: (state, action) => state,
  [popupErrorCloseEvent]: (state, action) => false,
}, false)

export const serverRequestUIReducers = ({
  popupMessage,
  isLoading
})
