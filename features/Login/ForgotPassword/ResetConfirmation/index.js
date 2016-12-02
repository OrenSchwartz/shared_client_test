import React, { Component } from 'react'
import { PageTitle, TextInput, SubmitButton, Bubble, FullScreenLoader } from 'sharedComponents'
import { submitCode, sendDataToServer, errorFromServer } from './../actions'
import { connect } from 'react-redux'
import style from './../style.css'
import { FormattedMessage } from 'react-intl'
import { MessageTranslator, AppConsts } from 'infra'

export class InsertCodePage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    const submitCodePayload = {
      code: this.state.code,
    }
    return this.props.dispatch(submitCode(submitCodePayload))
  }

  updateCode(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    var messageTranslator = new MessageTranslator(this.context.intl.messages.forgotPassword.insertCode);

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
              placeholder={messageTranslator.translate('code_input')}
              onTextChange={::this.updateCode}
              name="code"/>
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

InsertCodePage.contextTypes={
  intl: React.PropTypes.object.isRequired
}

InsertCodePage.PropTypes = {
    errorMessage: React.PropTypes.string
}

function mapStateToProps(state) {
  return {
     errorMessage: state.errorMessage || '',
     loading: state.loading === true
  }
}

export default connect(mapStateToProps)(InsertCodePage)
