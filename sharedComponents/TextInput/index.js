import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'
import classnames from 'classnames'
import { Helpers } from 'infra'
import { animateScroll } from 'react-scroll'

export default class TextInput extends Component {

    static get VALIDITY_STATES() {
      return {
        NOT_VALIDATED : 0,
  	    NO_INPUT : 0,
        ERROR : -1,
        VALID : 1
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        wasFocused: false,
        showPassword: true,
        inputFieldType: this.props.type,
        showPasswordStyle: this.isPassword() ? style.iconEye : false,
      }
    }

    value(){
      return this.refs.htmlInput.value;
    }
    isComponentFocused(){
      return this.state.wasFocused;
    }

    handleFocusChange = (e) => {
      let emulatedEvent = {...e};

      let inputContainerElm = ReactDOM.findDOMNode(this.refs.inputContainer);
      if (!inputContainerElm)
        return

      // event happened inside the componet or any of its decendents
      if (inputContainerElm.contains(e.target)) {

        this.setState({wasFocused: true});

        // scroll to element (mobile mainly)
        if(this.props.scrollOnFocus)
          animateScroll.scrollTo(e.target.offsetTop - 50,{duration: 500, smooth: true,});

        // Focus on input
        this.focusOnInput()

        // activate scrolling handler
        emulatedEvent.type = 'focus'
        if(this.props.onFocus)
          this.props.onFocus(emulatedEvent);
      }
      // event happened *outside* the componet or any of its decendents
      else{

        // get input element to invoke the event handler on.
        let inputElement = ReactDOM.findDOMNode(this.refs.htmlInput);
        emulatedEvent.target = inputElement;
        emulatedEvent.type = 'blur'
        emulatedEvent.bluredBy = e.target;

        if(this.props.onBlur && this.state.wasFocused)
          this.props.onBlur(emulatedEvent);

        this.setState({wasFocused:false});
      }
    }

    componentWillMount() {
      document.addEventListener('click', this.handleFocusChange, false);
      document.addEventListener('keyup', this.handleFocusChange, false);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleFocusChange, false);
      document.removeEventListener('keyup', this.handleFocusChange, false);
    }

    focusOnInput() {
      ReactDOM.findDOMNode(this.refs.htmlInput).focus()
    }

    /*
     * change the current show password flag value.
     */
    showPasswordToggle() {
      this.setState({showPassword: !this.state.showPassword})

      // set defaults
      this.setState({
        		inputFieldType: this.props.type,
        		showPasswordStyle: style.iconEye
	       })

      // override when toggled.
      if (this.state.showPassword){
        this.setState({
		        inputFieldType: 'text',
		        showPasswordStyle: style.dontShowPasswordIconEye
	      })
      }
    }

    /*
     *  returns true if the input type is password.
     */
    isPassword(){
      return this.props.type==='password';
    }

    render () {
      let validationStatus = this.props.validationStatus || TextInput.VALIDITY_STATES.NOT_VALIDATED
      let iconClass = this.props.iconStyle ? style.textFieldWithIcon : false;
      let validationClass = ''
      if (validationStatus != TextInput.VALIDITY_STATES.NOT_VALIDATED)
        validationClass = (validationStatus == TextInput.VALIDITY_STATES.VALID) ? style.vaild : style.notVaild;

      let rtlStyle = Helpers.rtlDirection == 'right' ? style.textFieldRtl : '';
      return (
        this.props.if
	  ? <div className={classnames([style.textInput, validationClass, this.props.className])} ref="inputContainer">
            <div
              style={this.props.iconStyle}
              className={style.icon}
            />
            <input
              style={this.props.inputStyle}
              type={this.state.inputFieldType}
              className={classnames([style.textField, iconClass, rtlStyle])}
              defaultValue={this.props.defaultValue}
              placeholder={this.props.placeholder}
              onChange={this.props.onTextChange}
              onKeyUp={this.props.onKeyUp}
              autoComplete={this.props.autoComplete}
              name={this.props.name}
              ref="htmlInput"
            />
          {
          this.state.showPasswordStyle
          ? <div
            className={classnames([style.icon, this.state.showPasswordStyle])}
            onClick={::this.showPasswordToggle}
          />
          : false
          }
    </div>
	: false
      )
    }
}

TextInput.defaultProps = {
  type: 'text',
  defaultValue: '',
  if: true,
  onTextChange : () => {},
  placeholder: '',
  autocomplete: ''
};


TextInput.propTypes = {
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onTextChange : React.PropTypes.func
};
