export default class AppConsts {
  static get HTTP_CODE_GENERAL_SERVER_ERROR() {
    return 500
  }

  static get HTTP_CODE_SERVER_ERROR() {
    return 400
  }

  static get HTTP_CODE_SERVER_NOT_FOUND_ERROR() {
    return 404
  }

  static get HTTP_CODE_SERVER_ERROR_MESSAGE() {
    return "Unknown server error"
  }

  static get HTTP_CODE_GENERAL_SERVER_OK() {
    return 200
  }

  static get ERROR() {
    return 2
  }

  static get DEFAULT_STATUS_LIST_STYLE_BY_VALUE() {
    return {
      0: {
        icon: {
          width: '6px',
          height: '6px',
          backgroundColor: '#d8d8d8 ',
          borderRadius: '5px',
          margin: '9px 10px 2px 3px',
        },
      },
      1: {
        icon: {
          backgroundImage: 'url(/img/validation_icons/ic-v-bullet.svg)',
          backgroundSize: 'contain',
          height: '16px',
        },
      },
      2: {
        icon: {
          backgroundImage: 'url(/img/validation_icons/ic-x-bullet.svg)',
          backgroundSize: 'contain',
          height: '16px',
        },
        text: {
          color: 'red',
        },
      },
    }
  }
}
