import React, { Component } from 'react'
import classNames from 'classnames'
import { Helpers } from 'infra'
import style from './style.css'



class TextListCell extends Component {
  render() {
    let valueHasStyle = this.props.styleByValue[this.props.rowStatus] && this.props.styleByValue[this.props.rowStatus].text
                        ? this.props.styleByValue[this.props.rowStatus].text
                        : {};
    valueHasStyle['textAlign'] = Helpers.rtlDirection
    return <span className={classNames([style.cell_base, style.cell_font])} style={valueHasStyle}>{this.props.value}</span>
  }
}

class IconListCell extends Component {
  render() {
    let valueHasStyle = this.props.styleByValue[this.props.value];

    if (!valueHasStyle) {
      console.warn('IconListCell: could not find ' + this.props.value + ' in style map for element ');
    }

    valueHasStyle['textAlign'] = Helpers.rtlDirection
    return <span className={classNames([style.cell_base, style.cell_icon])} style={(valueHasStyle) ? this.props.styleByValue[this.props.value].icon : {}} />
  }
}

class StatusListRow extends Component {
  render() {
    let rowStatus = this.props.rowData.find((cell,cellIndex) => cellIndex == this.props.iconCol);
    return (
      <li className={classNames([style.row_container, this.props.statusListRowStyle])}
          style={Helpers.cssTextAlignByRtlDirection}>
         {
            this.props.rowData.map((cellVal, cellIndex) => {
              if(cellIndex == this.props.iconCol) {
                return <IconListCell
                  key={cellIndex}
                  styleByValue={this.props.styleByValue}
                  value={cellVal}
                />
              } else {
                return <TextListCell
                  key={cellIndex}
                  styleByValue={this.props.styleByValue}
                  value={cellVal}
                  rowStatus={rowStatus}
                />
              }
            })
       }
      </li>
    );
  }
}

export default class StatusList extends Component {

  static get VALIDITY_STATES(){
    return {
      NOT_VALIDATED: 0,
      ERROR: 2,
      VALID: 1,
    }
  }

  render() {
    if (!this.props.data || this.props.data.length == 0) {
      return <div className={style.emptyStatusList} />
    }

    let openStyle = ''
    let validationClass = ''
    if (this.props.open){
      openStyle = style.open;
      if (this.props.isValid !== 0) {
        validationClass = this.props.isValid===1 ? style.vaild : style.notVaild;
      }
    }

    return (
      <div className={classNames([style.status_list_container_size, style.status_list_container_border, validationClass, this.props.className, openStyle])}>
        <div className={classNames([style.status_list_header_font, style.status_list_header_position])}
            style={Helpers.cssTextAlignByRtlDirection}>{this.props.header}</div>
        <ul className={classNames([style.status_list_row, style.status_list_ul])}>
             {
                this.props.data.map((rowData, rowIndex) =>
                  <StatusListRow
                    key={rowIndex}
                    styleByValue={this.props.styleByValue}
                    iconCol={this.props.iconCol}
                    rowData={rowData}
                  />)
              }
        </ul>
      </div>
    );
  }
}

IconListCell.propTypes = {
  styleByValue: React.PropTypes.object,
  icolCol : React.PropTypes.number
}

StatusListRow.propTypes = {
  rowData: React.PropTypes.any,
}

TextListCell.propTypes = {
  value: React.PropTypes.any,
}

const DEFAULT_ICON_INDEX = 0;
StatusList.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  styleByValue: React.PropTypes.object.isRequired,
  iconCol: React.PropTypes.number,
  isValid: React.PropTypes.number,
}

StatusList.defaultProps = {
  styleByValue: { 0:
  {
    width: '6px',
    height: '6px',
    backgroundColor: '#d8d8d8',
    borderRadius: '5px',
    margin: '0 10px 2px 3px',
  },
  },
  iconCol: DEFAULT_ICON_INDEX,
}
