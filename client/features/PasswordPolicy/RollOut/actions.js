import { createAction } from 'redux-actions'
import 'whatwg-fetch'

const SUBMIT_IDS_URL = '/admin/password_policy_rollout'

export const submitCompanyIdsSucceed = createAction('submit company ids successed')

export const submitCompanyIdsFailed = createAction('submit company ids failed')

export const ajaxRequestStarted = createAction('AJAX request was sent')

export const ajaxRequestCompleted = createAction('AJAX request was completed')

export const allCompaniesCheckboxToggle = createAction('All companies checkbox toggle')

export const contentWasChanged = createAction('Content of the input was changed')

export const submitCompanyIds = (attrs) => {
  const requestBody = {
    companies_list: attrs.selectedCompanies,
    all_companies_flag: attrs.allCompaniesFlag,
  }
  const request = fetch(SUBMIT_IDS_URL,
    {
      credentials: 'same-origin',
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

  return (dispatch) => {
    request.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(submitCompanyIdsSucceed(data.ids));
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          dispatch(submitCompanyIdsFailed(data.error));
        });
      } else {
        dispatch(submitCompanyIdsFailed('Internal server error'));
      }

      dispatch(ajaxRequestCompleted());
    })
  }
}
