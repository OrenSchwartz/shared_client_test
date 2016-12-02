import React, { Component } from 'react'
import style from './style.css'
import classNames from 'classnames'

export default class SubmitButton extends Component {
  render() {
    return (
      <button
        type="submit"
        onClick={this.props.onClick}
    	className={classNames([style.btn, this.props.className])} 
        disabled={this.props.disabled}
        >
        {this.props.children}
      </button>
    )
  }
}
