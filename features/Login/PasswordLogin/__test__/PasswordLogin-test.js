/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { mount } from 'enzyme'
import { PasswordLogin } from '../index'
import { PageTitle, StatusList, TextInput, SubmitButton } from 'sharedComponents'
import PasswordLoginConsts from '../consts'

describe('<PasswordLogin />', () => {
  const context = {
    intl: {
      messages: {
        login: {
          'login_field_empty' : 'login field empty',
          'login_submit' : 'login submit',
          'login_user_input' : 'login user input',
          'login pass input' : 'Wd123456',
          'login_forgot_password' : 'login forgot password',
          'login_submit' : 'login submit',
          'login_okta_link' : 'okta url'
        }
      }
    }
  }

  const wrapper = mount(<PasswordLogin errors={PasswordLoginConsts.ERRORS_INITIAL_STATE}/>,
                                     { context })
  it('Renders page title', () => {
    const title = wrapper.find(PageTitle)
    expect(title.text()).toContain('login submit')
  })

  it('Renders username text input', () => {
    expect(wrapper.find('input[name="username"]').length).toBe(1)
  })

  it('Renders status list', () => {
    expect(wrapper.find(StatusList).length).toBe(0)
    wrapper.setState({ emptyStatus: { 'password' : TextInput.VALIDITY_STATES.ERROR } })
    expect(wrapper.find(StatusList).length).toBe(1)
  })

  it('Renders password text input', () => {
    expect(wrapper.find('input[name="password"]').length).toBe(1)
  })

  it('Renders submit button', () => {
    expect(wrapper.find(SubmitButton).length).toBe(1)
  })

  it('Renders forgot password link', () => {
    expect(wrapper.find('a[name="passwordRecovery"]').length).toBe(0)
    global.window.LoginInitialState = { passwordRecoveryUrl: '/password_recovery_url' }
    wrapper.update()
    const link = wrapper.find('a[name="passwordRecovery"]')
    expect(link.length).toBe(1)
    expect(link.text()).toContain('login forgot password')
  })

  it('Renders okta link', () => {
    expect(wrapper.find('a[name="okta"]').length).toBe(0)
    global.window.LoginInitialState = { oktaUrl: '/okta_url' }
    wrapper.update()
    const link = wrapper.find('a[name="okta"]')
    expect(link.length).toBe(1)
    expect(link.text()).toContain('okta url')
  })
})
