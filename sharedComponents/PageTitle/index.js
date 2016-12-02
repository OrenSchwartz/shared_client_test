import React, { Component } from 'react'
import style from './style.css'

export default class PageTitle extends Component  {
  render() {
    var title = this.props.children;
    document.title = title
    return (
      <h1 className={style.PageTitle}>{title}</h1>
    )
  }
}

PageTitle.propTypes = {
  children:React.PropTypes.string
};
