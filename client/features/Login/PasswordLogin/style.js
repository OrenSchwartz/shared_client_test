import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "centered": {
        "marginTop": 20,
        "marginRight": "auto",
        "marginBottom": 20,
        "marginLeft": "auto",
        "display": "block",
        "clear": "both"
    },
    "statusList": {
        "marginTop": -15,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "textContainer": {
        "marginTop": -15,
        "width": 293
    },
    "forgotPasswordText": {
        "display": "block",
        "textAlign": "right",
        "color": "#9b9b9b",
        "textDecoration": "none",
        "fontSize": 12,
        "fontWeight": "normal",
        "fontStyle": "normal",
        "fontStretch": "normal",
        "letterSpacing": 0.1,
        "marginLeft": 180
    },
    "oktaUrlStyle": {
        "textAlign": "right",
        "display": "block",
        "color": "transparent",
        "marginLeft": 180,
        "fontSize": 12
    },
    "oktaUrlStyle:hover": {
        "textAlign": "right",
        "display": "block",
        "color": "transparent",
        "marginLeft": 180,
        "fontSize": 12
    }
});