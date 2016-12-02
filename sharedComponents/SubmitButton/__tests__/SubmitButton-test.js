/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow } from 'enzyme'
import style from '../style.css'
import SubmitButton from '../index'

describe('<SubmitButton />', () => {
  it('renders <SubmitButton /> component with text', () => {
    const wrapper = shallow(<SubmitButton>text</SubmitButton>)
    expect(wrapper.containsMatchingElement(<button type="submit">text</button>)).toBe(true)
  })
})
