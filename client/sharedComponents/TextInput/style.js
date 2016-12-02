import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "textInput": {
        "width": 293,
        "height": 48,
        "borderRadius": 4,
        "backgroundColor": "#ffffff",
        "border": "solid 1px #727272",
        "display": "inline-block",
        "boxSizing": "border-box"
    },
    "flex": {
        "display": "flex"
    },
    "textField": {
        "height": 46,
        "border": "none",
        "borderRadius": 4,
        "fontSize": 16,
        "fontWeight": "300",
        "letterSpacing": 0.1,
        "paddingTop": 0,
        "paddingRight": 50,
        "paddingBottom": 0,
        "paddingLeft": 50,
        "outline": "none",
        "color": "#4a4a4a",
        "boxSizing": "border-box",
        "width": "100%",
        "backgroundPositionX": "5%",
        "backgroundPositionY": "center",
        "backgroundRepeat": "no-repeat"
    },
    "textField:-webkit-autofill": {
        "WebkitBoxShadow": "0 0 0px 1000px white inset"
    },
    "textFieldRtl": {
        "backgroundPositionX": "95%",
        "paddingTop": 0,
        "paddingRight": 31,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "textFieldWithIcon": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 50
    },
    "textFieldRtltextFieldWithIcon": {
        "paddingTop": 0,
        "paddingRight": 50,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "vaild": {
        "borderColor": "#51c332"
    },
    "notVaild": {
        "borderColor": "#f55"
    },
    "icon": {
        "display": "inline-block",
        "width": 50,
        "height": 46,
        "verticalAlign": "top",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "center",
        "zIndex": 10,
        "position": "absolute"
    },
    "iconEye": {
        "background": "url(/img/inputs/ic-show-pass.svg)",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "center",
        "backgroundColor": "white",
        "width": 61,
        "marginTop": 0,
        "marginRight": -62,
        "marginBottom": 0,
        "marginLeft": -62,
        "backgroundSize": 42
    },
    "dontShowPasswordIconEye": {
        "background": "url(/img/inputs/ic-dont-show-pass.svg)",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "center",
        "backgroundColor": "white",
        "width": 61,
        "marginTop": 0,
        "marginRight": -62,
        "marginBottom": 0,
        "marginLeft": -62,
        "backgroundSize": 42
    }
});