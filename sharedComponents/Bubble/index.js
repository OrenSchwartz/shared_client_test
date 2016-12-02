import React, { Component } from 'react'
import classNames from 'classnames'
import style from './style.css'

export default class Bubble extends Component {
  render() {

    let classes = [style.bubble]

    if(this.props.styling.length>0){
      classes.push(style[this.props.styling])
    }

    return (
      !!this.props.if &&
        <div className={classNames(classes)} >
          {this.props.children}
        </div>
    )
  }
}

Bubble.defaultProps = {
  styling:'',
  if : true,
}
