import React, { Component } from 'react'
import { PageTitle, TextInput, SubmitButton, Bubble, FullScreenLoader } from 'sharedComponents'
import { submitUsername, sendDataToServer, errorFromServer, codeSent } from './../actions'
import { connect } from 'react-redux'
import style from './../style.css'
import { FormattedMessage } from 'react-intl'
import { MessageTranslator, AppConsts } from 'infra'

export class SendCodePage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  /*
   * Assuming the property state name equals the html element name,
   * this function takes the value from the html and updates the
   * property in the state.
   */
  updateUserName(e) {
    // this.validateEmptiness(e, TextInput.VALIDITY_STATES.VALID);
    this.setState({ [e.target.name]: e.target.value })
  }

  submitForm(event) {
    event.preventDefault()
    const submitUsernamePayload = {
      username: this.state.username,
    }
    return this.props.dispatch(submitUsername(submitUsernamePayload))
  }

  render() {
    var messageTranslator = new MessageTranslator(this.context.intl.messages.forgotPassword.sendCode);

    return (
      <div>
        <PageTitle>{messageTranslator.translate('title')}</PageTitle>
        <div>
          <p className={style.textCentered}>{messageTranslator.translate('subtitle')}</p>
        </div>
        <Bubble if={this.props.errorMessage !== ''} styling='error'>
          {this.props.errorMessage  }
        </Bubble>
        <form autoComplete="off" method="POST">
          <FullScreenLoader show={this.props.loading} />
          <div>
            <TextInput
              type="text"
              className={style.centered}
              placeholder={messageTranslator.translate('user_input')}
              onTextChange={::this.updateUserName}
              name="username"
              iconStyle={{backgroundImage:'url(/assets/icons/v2/ic_user_disabled.svg)'}}/>
          </div>
          <SubmitButton
            className={style.centered}
            onClick={::this.submitForm}
            >
              {messageTranslator.translate('submit')}
           </SubmitButton>
        </form>
        <div className={style.textCentered}>
          <a className={style.linkText} href={window.loginPath}>{messageTranslator.translate('login_link')}</a>
        </div>
      </div>
  )}
}

SendCodePage.contextTypes={
  intl: React.PropTypes.object.isRequired
}

SendCodePage.PropTypes = {
    errorMessage: React.PropTypes.string
}

function mapStateToProps(state) {
  return {
     errorMessage: state.errorMessage || '',
     loading: state.loading === true
  }
}

export default connect(mapStateToProps)(SendCodePage)
