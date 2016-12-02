import React, { Component } from 'react'
import { TextInput, StatusList, SubmitButton, Bubble, DataList, FullScreenLoader,PageTitle } from 'sharedComponents'
import { connect } from 'react-redux'
import { submitPassword, passwordNotValid, passwordValid } from './actions'
import style from './style.css'
import store from './store'
import { FormattedMessage } from 'react-intl'
import scroll, { Link, Element, scroller } from 'react-scroll'
import { AppConsts } from 'infra'
import classNames from 'classnames'

class ChangePasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: NaN,
      userName: '',
      companyName: '',
      existingPassword: '',
      newPassword: '',
      confirmPassword: '',
      validations: [[]],
      failedValidations: [],
      highlightInputField: false
    }
  }

  /*
   * Assuming the property state name equals the html element name,
   * this function takes the value from the html and updates the
   * property in the state.
   */
  updatePassword(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidUpdate(oldParams, oldState) {
    if(oldState.newPassword !== this.state.newPassword || oldState.existingPassword !== this.state.existingPassword)
      this.validateStateParams();
  }

  /*
   * React to changes in the main password component.
   */
   onNewPasswordChange(e) {
     let newState = { mainBoxOpen: e.type==='focus' }
     if(e.type==='blur' && this.state.newPassword.length > 0) {
       newState.highlightInputField = true
     }

     this.setState(newState);
   }

  /*
   * Invoke an action that performes the server password change.
   */
  submitForm(event) {
    event.preventDefault()

    if (!this.validateStateParams(true))
      return;

    const submitPasswordPayload = {
      url: this.props.url,
      existing_password: this.state.existingPassword,
      password: this.state.newPassword,
      password_confirmation: this.state.confirmPassword,
    }
    return this.props.dispatch(submitPassword(submitPasswordPayload))
  }

  isPasswordsMatch(fullCheck) {
    const CONFIRM_LENGTH = fullCheck ? this.state.newPassword.length : this.state.confirmPassword.length
    let newPassword = this.state.newPassword

    return this.state.newPassword.substring(0,CONFIRM_LENGTH) === this.state.confirmPassword
  }

  getHeader() {
    return this.isChangePasswordMode() ?
      this.context.intl.messages.changePassword.change_password_title
      : this.context.intl.messages.changePassword.reset_password_title
  }

  render() {
    // Basic password validations
    const IS_FORM_EMPTY = this.state.newPassword === this.state.confirmPassword && this.state.newPassword === ''
    const PASSWORDS_MATCH_STATUS= this.isPasswordsMatch() ? TextInput.VALIDITY_STATES.NOT_VALIDATED : TextInput.VALIDITY_STATES.ERROR;
    const IS_PASSWORDS_MATCH_FULL = this.isPasswordsMatch(true)
    const CONFIRM_BOX_OPEN_STYLE = PASSWORDS_MATCH_STATUS==-1 ? style.statusListConfirmPasswordOpen : false;
    const PASSWORDS_DONT_MATCH_I18 = [
      [
        StatusList.VALIDITY_STATES.ERROR,
        this.i18nTranslateMessage('change_password_dont_match','change_password_dont_match')
      ]
    ]

    // Password logic validations
    const ALL_VALIDATION_KEYS = this.props.validations.map(validationItem => validationItem[1])
    const FAILED_VALIDATION_KEYS = this.props.failedValidations.map(item => item.key)
    const ALL_VALIDATIONS_MESSAGES = this.props.validations.map(validationItem => {
         let validationStatus;
         if(IS_FORM_EMPTY){
           validationStatus = StatusList.VALIDITY_STATES.NOT_VALIDATED
         } else if( FAILED_VALIDATION_KEYS.indexOf(validationItem[1]) < 0 ) {
           validationStatus = StatusList.VALIDITY_STATES.VALID
         } else if ( this.state.highlightInputField ) {
           validationStatus = StatusList.VALIDITY_STATES.ERROR
         } else {
           validationStatus = StatusList.VALIDITY_STATES.NOT_VALIDATED
         }

         return [validationStatus,this.i18nTranslateMessage(validationItem[1],validationItem[1])]
     });
    const UNRECOGNIZED_SERVER_VALIDATIONS = this.props.failedValidations.filter(validationItem => ALL_VALIDATION_KEYS.indexOf(validationItem.key) < 0).map(validationItem => [AppConsts.ERROR, this.i18nTranslateMessage(validationItem.key, validationItem.value)]);

    // Form validations (current, new and confirmed)
    let IS_PASSWORD_VALID = TextInput.VALIDITY_STATES.NOT_VALIDATED
    if (this.state.highlightInputField){
      // There is input and the validations have passed
      if(FAILED_VALIDATION_KEYS.length == 0) {
        IS_PASSWORD_VALID = TextInput.VALIDITY_STATES.VALID
      } // There are only client error's
      else if(UNRECOGNIZED_SERVER_VALIDATIONS.length===0) {
        IS_PASSWORD_VALID = TextInput.VALIDITY_STATES.ERROR
      }
    }

    const SHOULD_SHOW_PASSWORD_HILIGHT = this.state.mainBoxOpen || IS_PASSWORD_VALID===-1;
    const HILIGHT_STATUS = SHOULD_SHOW_PASSWORD_HILIGHT ? IS_PASSWORD_VALID : 0
    return (
      <form className={style.app} onSubmit={::this.submitForm} autoComplete="off">
        <FullScreenLoader show={this.props.loading} />
        <PageTitle>{this.getHeader()}</PageTitle>
        <Element name="failedValidations">
          <StatusList
              className={style.statusList}
              data={UNRECOGNIZED_SERVER_VALIDATIONS}
              isValid={StatusList.VALIDITY_STATES.ERROR}
              styleByValue={AppConsts.DEFAULT_STATUS_LIST_STYLE_BY_VALUE}
              open={(UNRECOGNIZED_SERVER_VALIDATIONS.length > 0)}
            />
        </Element>
        <div className={style.FieldsConteiner}>
          <div>
            <TextInput
              type="password"
              onKeyUp={::this.updatePassword}
              placeholder={this.context.intl.messages.changePassword.type_your_existing_password}
              name="existingPassword" /* must correlate the state property existingPassword */
              if={this.isChangePasswordMode()}
              autoComplete="new-password"
              scrollOnFocus={screen.height < 700}
            />
          </div>
          <div>
            <TextInput
              type="password"
              onKeyUp={::this.updatePassword}
              onBlur={::this.onNewPasswordChange}
              onFocus={::this.onNewPasswordChange}
              placeholder={this.context.intl.messages.changePassword.type_your_password}
              name="newPassword"
              validationStatus ={ HILIGHT_STATUS }
              autoComplete="off"
              scrollOnFocus={screen.height < 700}
            />
          </div>
          <div>
            <StatusList
              className={style.statusList}
              data={ALL_VALIDATIONS_MESSAGES}
              isValid={IS_PASSWORD_VALID}
              styleByValue={AppConsts.DEFAULT_STATUS_LIST_STYLE_BY_VALUE}
              header={this.context.intl.messages.changePassword.change_password_restrictions}
              open={ IS_PASSWORD_VALID===-1 || this.state.mainBoxOpen}
            />
          </div>
          <div>
            <TextInput
              type="password"
              onKeyUp={::this.updatePassword}
              placeholder={this.context.intl.messages.changePassword.confirm_password}
              name="confirmPassword"
              validationStatus ={PASSWORDS_MATCH_STATUS}
              autoComplete="off"
              scrollOnFocus={screen.height < 700}
            />
          </div>
          <div>
            <StatusList
              className={classNames([style.statusList,CONFIRM_BOX_OPEN_STYLE])}
              data={PASSWORDS_DONT_MATCH_I18}
              isValid={PASSWORDS_MATCH_STATUS}
              styleByValue={AppConsts.DEFAULT_STATUS_LIST_STYLE_BY_VALUE}
              open={(PASSWORDS_MATCH_STATUS==-1)}
            />
          </div>
          <div>
            <SubmitButton disabled={!(IS_PASSWORD_VALID && IS_PASSWORDS_MATCH_FULL) } onClick={::this.submitForm}>{this.context.intl.messages.changePassword.create_password}</SubmitButton>
          </div>
        </div>
      </form>
    )
  }

  /*
   * If the user is connected we want to enforce existing password verification
   */
  isChangePasswordMode() {
    return this.props.userId;
  }

  searchNamesInPassword() {
      let password = this.state.newPassword.toLowerCase();
      let names = [this.props.userName, this.props.companyName].filter(v=>v!='');

      for (var i = 0; i < names.length; i++) {
        name = names[i].toLowerCase().replace(/\s+/g, '');
        if (password.indexOf(name) >= 0) {
          return true
        }
      }
      return false
  }

  /*
   * Before submitting we want to verify essential data is there.
   */
  validateStateParams(onSubmit) {
    let clientSideErrorMessages = [];
    if (onSubmit) {
      if (this.isChangePasswordMode() && this.state.existingPassword.length === 0)
        clientSideErrorMessages.push('existing_password_empty');
    }
    if (this.state.newPassword.length < 8)
      clientSideErrorMessages.push('restriction_at_least8');
    if (this.searchNamesInPassword())
      clientSideErrorMessages.push('restriction_no_account_name');
    if (!/[A-Z]/.test(this.state.newPassword))
      clientSideErrorMessages.push('restriction_one_capital_case');
    if (!/[a-z]/.test(this.state.newPassword))
      clientSideErrorMessages.push('restriction_one_lower_case');
    if (!/\d/.test(this.state.newPassword))
      clientSideErrorMessages.push('restriction_one_number');
    if (/(.)\1+\1+/.test(this.state.newPassword))
      clientSideErrorMessages.push('restriction_not_more_than_two_identical');

    if (clientSideErrorMessages.length > 0) {
      let messages = {}
      clientSideErrorMessages.forEach(msg => messages[msg] = '')
      this.props.dispatch(passwordNotValid(messages))
      scroller.scrollTo('failedValidations', {duration: 500, smooth: true})
      return false
    }
    this.props.dispatch(passwordValid())
    return true
  }
  /**
   * Translates a single message if its found in the correlating tranlsation map.
   * @param message : the message key to be translated
   * @param fallback: if not in messages return this message.
   */
  i18nTranslateMessage (message, fallback){
    let translatedMessage = fallback;
    if (message in this.context.intl.messages.changePassword){
       translatedMessage = this.context.intl.messages.changePassword[message];
    }

    return translatedMessage;
  }
}

ChangePasswordPage.contextTypes={
  intl: React.PropTypes.object.isRequired
}

ChangePasswordPage.propTypes={
  validations: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  failedValidations:React.PropTypes.array,
  userId: React.PropTypes.number
}

function mapStateToProps(state) {
  return {
    url: state.url,
    userId : state.userId || NaN,
    userName : state.userName || '',
    companyName : state.companyName || '',
    existingPassword: state.existingPassword || '',
    newPassword: state.newPassword || '',
    confirmPassword: state.confirmPassword || '',
    validations: (!state.validations || Object.keys(state.validations).length == 0) ? [] : state.validations,
    failedValidations: (!state.failedValidations || Object.keys(state.failedValidations).length == 0) ? [] : state.failedValidations,
    loading: state.loading === true,
  }
}

export default connect(mapStateToProps)(ChangePasswordPage)
