import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './style.scss'
import {toastr} from 'react-redux-toastr'
import classNames from 'classnames'

import { submitCompanyIds, ajaxRequestStarted, allCompaniesCheckboxToggle, contentWasChanged} from '../../actions'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { isFormDirty: false, hasError: false }
  }

  submit() {
    const attrs = {
      selectedCompanies: this.props.companyIds,
      allCompaniesFlag: this.props.allCompaniesChecked,
    },
      toastrConfirmOptions = {
        onOk: () => {
          this.props.dispatch(() => {this.setState({isFormDirty: false});ajaxRequestStarted()});
          this.props.dispatch(submitCompanyIds(attrs));
        }
      };
      if(!this.state.hasError) {
          toastr.confirm('Are you sure?', toastrConfirmOptions)
      }
  }

  render_submit_ids_status() {
    if (this.props.submitIdsFailure) {
      return <p className={classNames([style.message,style.error])}>{this.props.failureMessage}</p>
    } else if (this.props.submitIdsSuccess) {
      return <p className={classNames([style.message,style.success])}>Success!</p>
    }
  }

  changeValue(e) {
    var value = e.target.value;
    this.props.dispatch(contentWasChanged(value.split(',')));
    if(this.validSymbols(value)) {
      this.setState({
        hasError: false,
        isFormDirty: true
      });
    } else {
      this.setState({
        hasError: true,
        errorMessage: "Company list has incorrect symbols. Correct symbols: comma, digits",
        isFormDirty: true,
      });
    }
  }

  validSymbols(value){
    if (!value || value.trim().length === 0){
      return true;
    }
    var regex  = /^[0-9]+(,[0-9]+)*$/;
    return regex.test(value);
  }

  render() {
    const showHideError = {
      'display': this.state.hasError ? 'block' : 'none'
    };

    const showHideSubmitStatus = {
      'display': this.state.isFormDirty ? 'none' : 'block'
    };

    return (
      <div className={style.app}>
        <h1>Secure password rollout for companies</h1>
        <div style={showHideSubmitStatus}>
          {::this.render_submit_ids_status()}
        </div>
        <textarea
          className={style.ids}
          value={this.props.companyIds.join()}
          onChange={(e) => this.changeValue(e)}
          disabled={this.props.allCompaniesChecked}
        >
        </textarea>
        <p style={showHideError} className={classNames([style.message,style.error])}>{this.state.errorMessage}</p>
        <div className={style.cbwrapper}>
          <input
            type="checkbox"
            name="allCompanies"
            checked={this.props.allCompaniesChecked}
            onChange={() => this.props.dispatch(allCompaniesCheckboxToggle())}
          />All Companies
          <button
            className={style.saveButton}
            onClick={(e) => ::this.submit() }
            disabled={!this.props.enableSaveButton}>Save</button>
        </div>
        <div className={style.elementDescription}>List of company ids with secure login enabled.<br/>
          Ids must be comma-separated.</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    companyIds: state.companyIds || [],
    submitIdsSuccess: state.submitIdsSuccess,
    submitIdsFailure: state.submitIdsFailure,
    enableSaveButton: state.enableSaveButton,
    failureMessage: state.submitIdsFailureMessage,
    allCompaniesChecked: state.policyForAllCompaniesEnabled,
  }
}

export default connect(mapStateToProps)(Form)
