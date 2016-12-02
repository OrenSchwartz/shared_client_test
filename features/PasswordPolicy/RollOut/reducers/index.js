import { handleActions } from 'redux-actions'
import { submitCompanyIds, submitCompanyIdsSucceed, submitCompanyIdsFailed,
ajaxRequestCompleted, ajaxRequestStarted, allCompaniesCheckboxToggle, contentWasChanged} from '../actions'

export const companyIds = handleActions({
  [submitCompanyIds]: (state, action) => state,
  [submitCompanyIdsSucceed]: (state, action) => action.payload,
  [contentWasChanged]: (state, action) => action.payload
}, {})

export const submitIdsSuccess = handleActions({
  [submitCompanyIdsSucceed]: (state, action) => true,
  [submitCompanyIdsFailed]: (state, action) => false,
}, {})

export const submitIdsFailure = handleActions({
  [submitCompanyIdsFailed]: (state, action) => true,
  [submitCompanyIdsSucceed]: (state, action) => false,
}, {})

export const submitIdsFailureMessage = handleActions({
  [submitCompanyIdsFailed]: (state, action) => action.payload
}, {})

export const enableSaveButton = handleActions({
  [ajaxRequestStarted]: (state, action) => false,
  [ajaxRequestCompleted]: (state, action) => true
}, {})

export const policyForAllCompaniesEnabled = handleActions({
  [allCompaniesCheckboxToggle]: (state, action) => !state,
}, {})
