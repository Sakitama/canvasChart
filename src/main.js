import style from "./css/style.css";

import {
    addEvent
} from "./js/util";
import {
    drawAllCircleAndArrow
} from "./js/util";

import {
    cvs,
    ctx
} from "./js/const";
import {
    cvsWidth,
    cvsHeight
} from "./js/const";

import {
    circleArray
} from "./js/initCircle";

import {
    mouseDownHandler
} from "./js/addEvent";

drawAllCircleAndArrow(circleArray, ctx, cvsWidth, cvsHeight);

addEvent(cvs, "mousedown", mouseDownHandler);