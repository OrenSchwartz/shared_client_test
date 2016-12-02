import React, { Component } from 'react'
import classNames from 'classnames'
import style from './style.scss'

export default class FullScreenLoader extends Component {
  render() {
    return (
      <div className={classNames(style.loaderOverlay, (this.props.show && style.show))}>
        <div className={style.loader}>
          <img
            className={style.loaderImg}
            src="/assets/preloader.png"
            alt="preloader"
          />
        </div>
      </div>
    )
  }
}
