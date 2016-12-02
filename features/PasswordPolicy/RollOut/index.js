import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import { Form } from './components'

import store from './store'

export default class RollOut extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ReduxToastr/>
          <Form />
        </div>
      </Provider>
    )
  }
}
