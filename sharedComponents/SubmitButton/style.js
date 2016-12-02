import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "btn": {
        "all": "initial",
        "width": 293,
        "height": 52,
        "borderRadius": 4,
        "backgroundColor": "#fdb924",
        "fontSize": 23,
        "color": "#ffffff",
        "fontWeight": "100",
        "lineHeight": 52,
        "display": "inline-block",
        "cursor": "pointer",
        "textAlign": "center",
        "fontFamily": "'Open Sans Hebrew', sans-serif",
        "borderWidth": 0
    },
    "btn:disabled": {
        "color": "rgba(255, 255, 255, 0.6)"
    }
});