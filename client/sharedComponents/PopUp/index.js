import React, { Component } from 'react'
import { MessageTranslator } from 'infra'
import Modal from 'simple-react-modal'
import styles from './style.css'

export default class ErrorPopUp extends Component {

  render(){
    const onClose = this.props.onClose
    let messageTranslator = new MessageTranslator(this.context.intl.messages.errorPopup)
    let content = this.props.content
    let popupContent = content != 'unexpected_error' ? content : messageTranslator.translate('content')
    return (
      <div>
      <Modal
      closeOnOuterClick={true}
      show={this.props.show}
      containerClassName = { styles.errorPopupContainer }
      style = { {backgroundColor: 'rgba(255, 255, 255, 0.8)'} }
      onClose={onClose}>

      <div className={styles.mainPopupBg}>
        <div className={styles.headerBg}>
          <div className={styles.titleText}>{messageTranslator.translate('title')}</div>
          <a className={styles.closePopup} onClick={onClose}>
            <div className={styles.Rectangle3}></div>
            <div className={styles.Rectangle3Copy}></div>
          </a>
        </div>
        <div className={styles.centerContainer}>
          <div className={styles.warningImage}>
            <span className={styles.disclamer}>!</span>
          </div>
          <div className={styles.popUpContent}>{popupContent}</div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={onClose}>
            <span className={styles.closeText}>{messageTranslator.translate('close')}</span>
          </div>
        </div>
      </div>
      </Modal>
      </div>
    )
  }
}

ErrorPopUp.contextTypes={
  intl: React.PropTypes.object.isRequired
}
