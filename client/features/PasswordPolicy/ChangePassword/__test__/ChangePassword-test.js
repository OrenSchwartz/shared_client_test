/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow,mount } from 'enzyme'
import ChangePassword from '../index'
import {I18NWrapper} from 'sharedComponents'

describe('<ChangePasswordPage />', () => {
  it('stores input boxes value by key presses', () => {
      // let changePasswordPage = mount(<I18NWrapper><ChangePassword/></I18NWrapper>)
      //
      // changePasswordPage
      //   .findWhere(n => n.name() == 'existingPassword')
      //   .simulate('keypress', [{ keyCode: 97 }])
      //
      // expect(changePasswordPage.prop("existingPassword")).toEqual('a')
      //

  });



})

// function testIfStatement(ifValue) {
//   // Arrange
//   let expectedNotEmpty = (typeof ifValue == 'undefined') || (ifValue)
//   let expectedEmpty = !expectedNotEmpty;
//   let bubbleClass = "." + style.bubble
//   let child = <div className="inner" />
//
//   // Act
//   if (typeof ifValue != 'undefined'){
//     var wrapper = mount(<Bubble if={ifValue}>{child}</Bubble>);
//   }
//   else{
//     var wrapper = mount(<Bubble>{child}</Bubble>);
//   }
//
//   // Asserts
//   // 1. Assert Object creation by class name.
//   expect(wrapper.find(bubbleClass).isEmpty()).toBe(expectedEmpty);
//
//   // 2. Assert child creation
//   if (!expectedEmpty){
//     expect(wrapper.find(bubbleClass).children().length).toBe(1);
//     expect(wrapper.find(bubbleClass).childAt(0).html()).toBe(mount(child).html());
//   }
// }
