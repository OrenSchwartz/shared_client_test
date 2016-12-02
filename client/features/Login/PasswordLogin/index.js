import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { PageTitle, StatusList, TextInput, SubmitButton, FullScreenLoader } from 'sharedComponents'
import style from './style.css'
import { FormattedMessage } from 'react-intl'
import scroll, { Link, Element, scroller } from 'react-scroll'
import classNames from 'classnames'
import { MessageTranslator, AppConsts } from 'infra'
import { submitLoginAction } from './actions'
import { connect } from 'react-redux'
import PasswordLoginConsts from './consts'

export class PasswordLogin extends Component {
  static get TEXT_INPUT_USERNAME_NAME() {
    return "username";
  }
  static get TEXT_INPUT_PASSWORD_NAME() {
    return "password";
  }

  static get PASSWORD_RECOVERY_NAME(){
    return "passwordRecovery"
  }

  static get OKTA_URL_NAME(){
    return "okta"
  }


  static get FIELDS_INITAL_VALUE(){
    return ""
  }

  constructor(props) {
    super(props);
    this.state = {
      username: PasswordLogin.FIELDS_INITAL_VALUE,
      password: PasswordLogin.FIELDS_INITAL_VALUE,
      emptyStatus:{},
      errors:PasswordLoginConsts.ERRORS_INITIAL_STATE,
      serverRequestActive:PasswordLoginConsts.SERVER_REQUEST_ACTIVE_INITIAL_STATE,
      isDirty: false,
      didRedirect: false
    }

    if (!window.image_path){
      window.image_path = function(arg){}
    }
  }

  /*
   * Assuming the property state name equals the html element name,
   * this function takes the value from the html and updates the
   * property in the state.
   */
  updateField(e) {
    this.validateEmptiness(e);
    this.setState(
      {
        [e.target.name]: e.target.value,
        isDirty:true
      }
     )
  }

  /*
   * verifies input field is empty, and sets up the
   * relevant state flag variable.
   * @validState : what value to set state as valid.
   */
  validateEmptiness(e, validState){
    // prevent behaviour on these refs
    const PREVENT_FOR_ELEMENTS = [PasswordLogin.OKTA_URL_NAME, PasswordLogin.PASSWORD_RECOVERY_NAME];
    if (e.bluredBy && PREVENT_FOR_ELEMENTS.indexOf(e.bluredBy.name) != -1)
      return;

    let fromFocus = this.refs[e.target.name].isComponentFocused();
    if (validState === undefined){
      validState = fromFocus
        ? TextInput.VALIDITY_STATES.VALID
        : TextInput.VALIDITY_STATES.NOT_VALIDATED
    }

    try{
      this.state.emptyStatus[e.target.name] = (e.target.value.trim() == '') && fromFocus
                                          ? TextInput.VALIDITY_STATES.ERROR
                                          : validState
      this.setState({emptyStatus: this.state.emptyStatus})
    }
    catch (e){}
  }

  /*
   * Invoke an action that performes the server password change.
   */
  submitForm(event) {
    event.preventDefault()
    let submitLoginPayload = {
      user_session:{
        username:this.state.username,
        password:this.state.password,

      }
    }
    this.setState({isDirty:false})

    let url = event.target.action;
    return this.props.dispatch(submitLoginAction(url, submitLoginPayload))
  }

  render() {
    const INITIAL_STATE = window.LoginInitialState || {}

    let messageTranslator = new MessageTranslator(this.context.intl.messages.login);
    const FIELD_EMPTY_VALIDATIONS = [[StatusList.VALIDITY_STATES.ERROR,
                                      messageTranslator.translate('login_field_empty')]]

    // if there was a change in user\pass from last submit don't show server errors.
    let bottomStatusListErrors = !this.state.isDirty ? this.props.errors.slice() : PasswordLoginConsts.ERRORS_INITIAL_STATE;

    // show empty field error if contnent is empty.
    if (this.state.emptyStatus[PasswordLogin.TEXT_INPUT_PASSWORD_NAME] == TextInput.VALIDITY_STATES.ERROR){
      bottomStatusListErrors.push(FIELD_EMPTY_VALIDATIONS[0])
    }

    return (
      <div>
        <PageTitle>{messageTranslator.translate('login_submit')}</PageTitle>
        <form autoComplete="off" method="POST" action={INITIAL_STATE.logInUrl} onSubmit={::this.submitForm}>
          <div className={classNames([style.centered, style.FieldsContainer])}>

            <TextInput
              type="text"
              className={style.centered}
              placeholder={messageTranslator.translate('login_user_input')}
              onTextChange={::this.updateField}
              onBlur={(e) => ::this.validateEmptiness(e, TextInput.VALIDITY_STATES.NOT_VALIDATED)}
              validationStatus={this.state.emptyStatus[PasswordLogin.TEXT_INPUT_USERNAME_NAME]}
              name={PasswordLogin.TEXT_INPUT_USERNAME_NAME}
              ref={PasswordLogin.TEXT_INPUT_USERNAME_NAME}
              scrollOnFocus={screen.height < 700}
              iconStyle={{ backgroundImage: `url('${window.image_path('icons/v2/ic_user_disabled.svg')}')`}}
              />

            {
            this.state.emptyStatus[PasswordLogin.TEXT_INPUT_USERNAME_NAME] == TextInput.VALIDITY_STATES.ERROR
            ? <StatusList
                className={classNames([style.centered, style.statusList])}
                data={FIELD_EMPTY_VALIDATIONS}
                styleByValue={AppConsts.DEFAULT_STATUS_LIST_STYLE_BY_VALUE}
                open={this.state.emptyStatus[PasswordLogin.TEXT_INPUT_USERNAME_NAME]}/>
            : false
            }

            <TextInput
            className={style.centered}
            type="password"
            placeholder={messageTranslator.translate('login_pass_input')}
            onTextChange={::this.updateField}
            onBlur={(e) => ::this.validateEmptiness(e, TextInput.VALIDITY_STATES.NOT_VALIDATED)}
            validationStatus={this.state.emptyStatus[PasswordLogin.TEXT_INPUT_PASSWORD_NAME]}
            name={PasswordLogin.TEXT_INPUT_PASSWORD_NAME}
            ref={PasswordLogin.TEXT_INPUT_PASSWORD_NAME}
            scrollOnFocus={screen.height < 700}
            iconStyle={{ backgroundImage: `url('${window.image_path('icons/v2/ic_password_disabled.svg')}')`}}
            />

            {

            bottomStatusListErrors.length > 0
            ? <StatusList
                className={classNames([style.centered, style.statusList])}
                data={ bottomStatusListErrors }
                styleByValue={AppConsts.DEFAULT_STATUS_LIST_STYLE_BY_VALUE}
                open={bottomStatusListErrors.length > 0}/>
            : false
            }

            {
              INITIAL_STATE.passwordRecoveryUrl
              ?
              <div className={classNames([style.centered, style.textContainer])}>
                <a className={ style.forgotPasswordText } href={INITIAL_STATE.passwordRecoveryUrl}
                   ref={PasswordLogin.PASSWORD_RECOVERY_NAME} name={PasswordLogin.PASSWORD_RECOVERY_NAME}
                   onClick={()=>this.setState({didRedirect:true})}>
                  {messageTranslator.translate('login_forgot_password')}
                </a>
              </div>
              : false
            }

           <SubmitButton
            className={style.centered}
            disabled={this.props.serverRequestActive || this.state.didRedirect}
            >
              {messageTranslator.translate('login_submit')}
           </SubmitButton>

           {
             INITIAL_STATE.oktaUrl && INITIAL_STATE.oktaUrl.trim().length > 0
             ?
             <div className={classNames([style.centered, style.textContainer])}>
               <a className={ style.oktaUrlStyle } href={INITIAL_STATE.oktaUrl}
                  ref={PasswordLogin.OKTA_URL_NAME} name={PasswordLogin.OKTA_URL_NAME}
                  onClick={()=>this.setState({didRedirect:true})}>
                 {messageTranslator.translate('login_okta_link')}
               </a>
            </div>
             : false
           }
          </div>
        </form>
      </div>
    )
  }
}

PasswordLogin.contextTypes={
  intl: React.PropTypes.object.isRequired
}

PasswordLogin.propTypes={
  emptyStatus:React.PropTypes.object,
  submitUrl:React.PropTypes.string,
}

function mapStateToProps(state) {
  return {
    errors: state.errors || PasswordLoginConsts.ERRORS_INITIAL_STATE,
    serverRequestActive : state.serverRequestActive || PasswordLoginConsts.SERVER_REQUEST_ACTIVE_INITIAL_STATE
  }
}

export default connect(mapStateToProps)(PasswordLogin)
