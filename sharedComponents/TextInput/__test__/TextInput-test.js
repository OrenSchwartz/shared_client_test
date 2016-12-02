/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow,mount } from 'enzyme'

import TextInput from '../index'

describe('<TextInput />', () => {
  it('renders <TextInput /> component with text', () => {
    const wrapper = shallow(<TextInput />)
    expect(wrapper.html()).toMatch(/input/)
  })

  it('renders <TextInput /> as password feild', () => {
    const wrapper = mount(<TextInput type='password'/>)
    expect(wrapper.prop('type')).toMatch('password')
  })
})
