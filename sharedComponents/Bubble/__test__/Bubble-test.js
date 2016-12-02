/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow, mount } from 'enzyme'
import Bubble from '../index'
import style from '../style.css'

describe('<Bubble />', () => {
  it('Renders when if statement is true', () => testIfStatement(true) );

  it('Renders when if statement is default', () =>  testIfStatement());

  it('Doesnt render when if statement is false', () =>  testIfStatement(false));

  it('State change causes view to render (aka state not stored locally)', () =>  {
    let bubbleClass = "." + style.bubble
    let bubbleComponent = mount(<Bubble if={false}/>);

    // The initial prop state is false
    // so nothing should be rendered.
    expect(bubbleComponent.prop('if')).toBe(false);
    expect(bubbleComponent.find(bubbleClass).isEmpty()).toBe(true);

    // after the property changes to true,
    // the prop does not only change, but the
    // component is shown
    bubbleComponent.setProps({ if: true });
    expect(bubbleComponent.prop('if')).toBe(true);
    expect(bubbleComponent.find(bubbleClass).isEmpty()).toBe(false);

  });

})

function testIfStatement(ifValue) {
  // Arrange
  let expectedNotEmpty = (typeof ifValue == 'undefined') || (ifValue)
  let expectedEmpty = !expectedNotEmpty;
  let bubbleClass = "." + style.bubble
  let child = <div className="inner" />

  // Act
  if (typeof ifValue != 'undefined'){
    var wrapper = mount(<Bubble if={ifValue}>{child}</Bubble>);
  }
  else{
    var wrapper = mount(<Bubble>{child}</Bubble>);
  }

  // Asserts
  // 1. Assert Object creation by class name.
  expect(wrapper.find(bubbleClass).isEmpty()).toBe(expectedEmpty);

  // 2. Assert child creation
  if (!expectedEmpty){
    expect(wrapper.find(bubbleClass).children().length).toBe(1);
    expect(wrapper.find(bubbleClass).childAt(0).html()).toBe(mount(child).html());
  }
}
