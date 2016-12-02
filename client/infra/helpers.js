export default class Helpers{
  static get rtlDirection(){
    return getComputedStyle(document.body).getPropertyValue('direction') === 'rtl' ? "right": "left";
  }

  static get cssTextAlignByRtlDirection(){
    return {textAlign: Helpers.rtlDirection}
  }
}
