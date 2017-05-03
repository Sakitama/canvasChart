import {
    getPosition
} from "./util";

const cvs = document.getElementById("myCanvas"),
    ctx = cvs.getContext("2d"),
    cvsWidth = cvs.getAttribute("Width"),
    cvsHeight = cvs.getAttribute("Height"),
    cvsOffset = getPosition(cvs),
    circleArray = [];

export {
    cvs,
    ctx,
    cvsOffset,
    cvsWidth,
    cvsHeight,
    circleArray
};