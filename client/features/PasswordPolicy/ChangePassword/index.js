import React, { Component } from 'react'
import { Provider } from 'react-redux'

import ChangePasswordPage from './changePasswordPage'

import store from './store'

export default class ChangePassword extends Component {
  render() {
    return (
      <Provider store={store}>
        <ChangePasswordPage />
      </Provider>
    )
  }
}
