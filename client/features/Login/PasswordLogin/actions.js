import { createAction } from 'redux-actions'
import { AppConsts, ServerRequest } from 'infra'

export const submitLoginEvent = createAction("before submiting login");
export const submitLoginEndEvent = createAction("after submiting login");
export const loginSucceededEvent = createAction("connection succeed");
export const loginFailedEvent = createAction("connection failed");

export const submitLoginAction = (url, submitPasswordPayload) =>{


  return (dispatch) => {

    let options = {
      onSubmitEvent: () => dispatch(submitLoginEvent()),
      onSubmitEndEvent: () => dispatch(submitLoginEndEvent()),
      dispatchSuccessEvent: (response) => dispatch(loginSucceededEvent(response)),
      dispatchFailureEvent: (error) => dispatch(loginFailedEvent(error))
    }

    new ServerRequest(options).submit(url,submitPasswordPayload);

  }

}
