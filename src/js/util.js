let addEvent = (elem, type, handler) => {
    if (window.addEventListener) {
        addEvent = (elem, type, handler) => {
            elem.addEventListener(type, handler, false);
        };
    } else if (window.attachEvent) {
        addEvent = (elem, type, handler) => {
            elem.attachEvent('on' + type, handler);
        };
    } else {
        addEvent = (elem, type, handler) => {
            elem['on' + type] = handler;
        };
    }
    addEvent(elem, type, handler);
};

let removeEvent = (elem, type, handler) => {
    if (window.removeEventListener) {
        removeEvent = (elem, type, handler) => {
            elem.removeEventListener(type, handler, false);
        };
    } else if (window.detachEvent) {
        removeEvent = (elem, type, handler) => {
            elem.detachEvent('on' + type, handler);
        };
    } else {
        removeEvent = (elem, type) => {
            elem['on' + type] = null;
        };
    }
    removeEvent(elem, type, handler);
};

let isObject = o => Object.prototype.toString.call(o) === "[object Object]";

let getPosition = (element) => {
    let actualLeft = element.offsetLeft,
        actualTop = element.offsetTop,
        current = element.offsetParent
    while (current !== null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        left: actualLeft,
        top: actualTop
    };
};

let getEvent = (ev) => {
    return window.event || ev;
};

let getMouseOffset = (ev) => {
    return {
        left: ev.clientX,
        top: ev.clientY
    };
};

let getCrossPoint = (circleA, circleB) => {
    //圆A指向圆B，计算向量B->A，除以圆心距离得到单位向量，再乘以圆B的半径，得到向量B->交点，再加上圆B的圆心坐标即可得到交点的坐标
    let distance = Math.sqrt(Math.pow(circleA.x - circleB.x, 2) + Math.pow(circleA.y - circleB.y, 2));
    if (distance > circleA.radius + circleB.radius) {
        return {
            pointX: (circleA.x - circleB.x) / distance * circleB.radius + circleB.x,
            pointY: (circleA.y - circleB.y) / distance * circleB.radius + circleB.y
        };
    }
};

let drawArrow = (ctx, fromX, fromY, toX, toY, theta, headlen, width, color) => {
    theta = typeof theta !== 'undefined' ? theta : 30;
    headlen = typeof theta !== 'undefined' ? headlen : 10;
    width = typeof width !== 'undefined' ? width : 1;
    color = typeof color !== 'undefined' ? color : '#000';
    let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    let arrowX = fromX - topX,
        arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
};

let drawAllCircleAndArrow = (arr, ctx, cvsWidth, cvsHeight) => {
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    arr.forEach((item) => {
        item.drawPointMyArrow(ctx);
        item.drawCircle(ctx);
        item.drawText(ctx);
    });
};

export {
    drawAllCircleAndArrow,
    addEvent,
    removeEvent,
    getEvent,
    getMouseOffset,
    isObject,
    getCrossPoint,
    drawArrow,
    getPosition
};