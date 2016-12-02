import { createAction } from 'redux-actions'
import 'whatwg-fetch'

export const submitPassword = ({url, password, password_confirmation, existing_password}) => {
  const request = fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, password_confirmation, existing_password})
  })

  return (dispatch) => {
    dispatch(sendDataToServer())
    request.then((response) => {
      return response.json()
    }).then((json) => {
      if ('error' === json.status) {
        dispatch(passwordNotValid(json.errors))
      } else {
        dispatch(passwordValid())
        location = json.successUrl;
      }
    })
  }
}

export const passwordDontMatch = createAction('Password dont match')
export const passwordValid = createAction('Password valid')
export const passwordNotValid = createAction('Password not valid')
export const sendDataToServer = createAction('Send data to server')
