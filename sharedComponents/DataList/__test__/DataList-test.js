/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { shallow,mount } from 'enzyme'
import DataList from '../index'

describe('<DataList />', () => {
  it('Renders all items when passed', () => testDataList(['a','b','c']));

  it('Renders nothing when params not passed', () => testDataList());

  it('Renders nothing when params are empty', () => testDataList([]));

})

function testDataList(liItemArray) {
  let expectedChildren = liItemArray || []
  // Act
  if (typeof liItemArray == 'undefined'){
    var wrapper = mount(<DataList />);
  }
  else{
    var wrapper = mount(<DataList data={liItemArray}/>);
  }

  // Asserts
  // 1. Assert list items count
  expect(wrapper.find('ul').children().length).toBe(expectedChildren.length);

  // 1. Assert list items structure.
  for (let itemIndex = 0; itemIndex < expectedChildren.length ; itemIndex++){
    let renderedChild = wrapper.find('ul').childAt(itemIndex);
    expect(renderedChild.key()).toBe(itemIndex.toString());
    expect(renderedChild.text().trim()).toBe(expectedChildren[itemIndex]);

  }
}
