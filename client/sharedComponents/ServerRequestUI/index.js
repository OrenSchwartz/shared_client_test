import React, { Component } from 'react'
import { ErrorPopUp, FullScreenLoader } from 'sharedComponents'
import { popupErrorCloseEvent } from 'infra/appActions'
import { connect } from 'react-redux'

class ServerRequestUI extends Component {

  static get POPUP_MESSAGE_INITIAL_STATE() {
    return ''
  }

  static get IS_FORM_LOADING_INITIAL_STATE() {
    return false
  }

  constructor(props){
    super(props);
    this.state = {
      popupMessage: ServerRequestUI.POPUP_MESSAGE_INITIAL_STATE,
      isLoading: ServerRequestUI.IS_FORM_LOADING_INITIAL_STATE
    }
  }

  render(){
    return (
      <div>
      <FullScreenLoader show={this.props.isLoading} />
      <ErrorPopUp content={this.props.popupMessage}
             show={this.props.popupMessage.length > 0}
             onClose={() => this.props.dispatch(popupErrorCloseEvent())}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    popupMessage: state.popupMessage || ServerRequestUI.POPUP_MESSAGE_INITIAL_STATE,
    isLoading: state.isLoading || ServerRequestUI.IS_FORM_LOADING_INITIAL_STATE
  }
}
export default connect(mapStateToProps)(ServerRequestUI)
