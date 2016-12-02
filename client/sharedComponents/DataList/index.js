import React, { Component } from 'react'


export default class DataList extends Component {
  render() {
    let items = this.props.data || [];

    return(
      <ul>
        {items.map((item,index) => <li key={index}><span> {item} </span></li>)}
      </ul>
    )
  }
}
