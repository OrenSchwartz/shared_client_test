import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "status_list_container_border": {
        "borderRadius": 4,
        "border": "solid 0px #727272"
    },
    "status_list_ul": {
        "paddingTop": 0,
        "paddingRight": 7,
        "paddingBottom": 0,
        "paddingLeft": 12
    },
    "status_list_container_size": {
        "width": 293,
        "boxSizing": "border-box",
        "transition": "all 0.3s",
        "maxHeight": 0,
        "overflow": "hidden"
    },
    "status_list_header_font": {
        "textTransform": "uppercase",
        "color": "#9b9b9b",
        "fontSize": 14,
        "fontWeight": "bold",
        "letterSpacing": 0.1
    },
    "status_list_header_position": {
        "textAlign": "initial",
        "paddingTop": 0,
        "paddingRight": 31,
        "paddingBottom": 0,
        "paddingLeft": 31,
        "marginBottom": 7
    },
    "row_container": {
        "textAlign": "initial",
        "listStyle": "none"
    },
    "cell_base": {
        "display": "inline-block",
        "marginTop": 0,
        "marginRight": 4,
        "marginBottom": 10,
        "marginLeft": "auto",
        "textAlign": "initial"
    },
    "cell_font": {
        "fontSize": 16,
        "fontWeight": "300",
        "letterSpacing": 0.1,
        "display": "inline-block",
        "color": "#4a4a4a",
        "maxWidth": "90%",
        "lineHeight": "initial"
    },
    "cell_icon": {
        "backgroundRepeat": "no-repeat",
        "backgroundPositionY": 4,
        "width": 15,
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "vaild": {
        "borderColor": "#51c332"
    },
    "notVaild": {
        "borderColor": "#f55",
        "maxHeight": 300
    },
    "open": {
        "maxHeight": 350,
        "borderWidth": 1,
        "paddingTop": 15,
        "paddingRight": 0,
        "paddingBottom": 4,
        "paddingLeft": 0
    }
});