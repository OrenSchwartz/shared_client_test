import { createAction } from 'redux-actions'
import { AppConsts, ServerRequest } from 'infra'

export const onSubmitEvent = createAction("submitted event");
export const onSubmitEndEvent = createAction("submit event ended");
export const popupErrorOpenEvent = createAction("had major error - show popup");
export const popupErrorCloseEvent = createAction("closed popup");
