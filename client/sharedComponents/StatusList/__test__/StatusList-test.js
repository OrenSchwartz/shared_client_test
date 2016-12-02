/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow,mount } from 'enzyme'

import StatusList from '../index'

describe('<TextInput />', () => {
  it('Renders empty status list', () => {
    const exampleArray = []
    const element = mount(<StatusList data={exampleArray}/>)
    expect(element.find('li').length).toEqual(0)
  })
})

describe('<TextInput />', () => {
  it('Renders one with bad status and one good status', () => {
    const exampleArray = [
      [0,'test 1'],
      [1,'test 2']
    ]

    const styleByValueTest = {
      0:[],
      1:[]
    }
    const element = mount(<StatusList data={exampleArray} styleByValue={styleByValueTest}/>)
    const first = element.find('li').first().find('.cell_base')
    const last = element.find('li').last().find('.cell_base')
    expect(first).toEqual(last)
  })
})
