import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'infra'
import 'infra/polyfills'
import { ChangePassword, RollOut } from './features/PasswordPolicy'
import { PasswordLogin } from './features/Login'
import { SendCode, ResetConfirmation} from './features/Login/ForgotPassword'
import { I18NWrapper, ServerRequestUI } from './sharedComponents'

function injectReact(JSXobject, target) {
  // Checks if dom element is in dom, if so we will start react.
  const domElement = document.getElementById(target)
  console.log('is found %s Looking for %s to put in ', (!!domElement).toString(), target, JSXobject)

  if (domElement) {
    ReactDOM.render(
      <I18NWrapper>
        <Provider store={Store}>
          <div>
            <ServerRequestUI/>
            {JSXobject}
          </div>
        </Provider>
      </I18NWrapper>, domElement)
  }
}

injectReact(<RollOut />, 'b2brollout')
injectReact(<ChangePassword />, 'b2b_change_password')
injectReact(<PasswordLogin />, 'b2b_login')
injectReact(<SendCode />, 'b2b_send_code')
injectReact(<ResetConfirmation />, 'b2b_reset_confirmation')
