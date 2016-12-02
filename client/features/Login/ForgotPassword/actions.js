import { createAction } from 'redux-actions'
import { ServerRequest } from 'infra'
import 'whatwg-fetch'

export const sendDataToServer = createAction('Send data to server')
export const errorFromServer = createAction('The server had return an error')

export const submitUsername = ({ username }) => {
  const url = window.location.pathname;
  return (dispatch) => {

    let options = {
      onSubmitEvent: () => dispatch(sendDataToServer()),
      dispatchFailureEvent: (error) => dispatch(errorFromServer(error))
    }

    new ServerRequest(options).submit(url,{password_reset: {username}});

  }
}

export const submitCode = ({ code }) => {
  const url = window.resetConfirmationPath;
  const id = window.resetConfirmationUserId;

  return (dispatch) => {

    let options = {
      onSubmitEvent: () => dispatch(sendDataToServer()),
      dispatchFailureEvent: (error) => dispatch(errorFromServer(error))
    }

    new ServerRequest(options).submit(url,{user: {reset_password_code: code, id: id}});

  }
}
