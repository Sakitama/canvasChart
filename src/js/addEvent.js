import {
    addEvent,
    removeEvent,
    getEvent,
    getMouseOffset,
    drawAllCircleAndArrow
} from "./util";

import {
    cvs,
    ctx,
    cvsOffset,
    cvsWidth,
    cvsHeight
} from "./const";

import {
    circleArray
} from "./initCircle";

let targetCircle = null;
let clickPoint = null;

let getCurrentCircle = (arr, point, ctx) => { //根据鼠标位置判断是否在圆内，在的话返回其实例对象
    let current;
    for (let i = 0; i < arr.length; i++) {
        current = arr[i].reDraw(point, ctx);
        if (current) {
            return current;
        }
    }
};

let mouseMoveHandler = (ev) => {
    ev = getEvent(ev);
    let movePoint = getMouseOffset(ev);
    let offset = {
        offsetX: movePoint.left - cvsOffset.left - clickPoint.x,
        offsetY: movePoint.top - cvsOffset.top - clickPoint.y
    };
    if (targetCircle) { //如果点击页面不是圆的地方，targetCircle为空
        targetCircle.x = targetCircle.originX + offset.offsetX;
        targetCircle.y = targetCircle.originY + offset.offsetY;
        drawAllCircleAndArrow(circleArray, ctx, cvsWidth, cvsHeight);
    }
};

let mouseUpHandler = () => {
    if (targetCircle) {
        targetCircle.originX = targetCircle.x;
        targetCircle.originY = targetCircle.y;
    }
    removeEvent(cvs, "mousemove", mouseMoveHandler);
    removeEvent(cvs, "mouseup", mouseMoveHandler);
};

let mouseDownHandler = (ev) => {
    ev = getEvent(ev);
    let mouseOffset = getMouseOffset(ev);
    clickPoint = { //获取鼠标点击位置相对于canvas的坐标
        x: mouseOffset.left - cvsOffset.left,
        y: mouseOffset.top - cvsOffset.top
    };
    targetCircle = getCurrentCircle(circleArray, clickPoint, ctx);
    addEvent(cvs, "mousemove", mouseMoveHandler);
    addEvent(cvs, "mouseup", mouseUpHandler);
};

export {
    mouseDownHandler
};