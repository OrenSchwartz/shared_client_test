/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { mount } from 'enzyme'
import { SendCodePage } from '../index'
import { PageTitle, TextInput, SubmitButton, Bubble, FullScreenLoader } from 'sharedComponents'

describe('<SendCodePage />', () => {
  const context = {
    intl: {
      messages: {
        forgotPassword: {
          sendCode: {
            'title' : 'Hello!',
            'subtitle' : "hello subtitle",
            'user_input' : '1234',
            'submit' : 'submit',
            'login_link' : '/some_link_to_login'
          }
        }
      }
    }
  }

  const wrapper = mount(<SendCodePage />, { context })

  it('Renders page title', () => {
    const title = wrapper.find(PageTitle)
    expect(title.text()).toContain('Hello!')
  })

  it('Renders subtitle', () => {
    const subtitle = wrapper.find('p')
    expect(subtitle.text()).toContain('hello subtitle')
  })

  it('Renders error bubble', () => {
    expect(wrapper.find(Bubble).length).toBe(1)
  });

  it('Renders text input', () => {
    expect(wrapper.find(TextInput).props().name).toBe('username')
  });

  it('Renders full screen loader', () => {
    expect(wrapper.find(FullScreenLoader).length).toBe(1)
  })

  it('Renders submit button', () => {
    expect(wrapper.find(SubmitButton).length).toBe(1)
  });

  it('Renders login link', () => {
    const link = wrapper.find('a')
    expect(link.text()).toContain('/some_link_to_login')
  })
})
