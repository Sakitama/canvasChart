import {
    isObject,
    getCrossPoint,
    drawArrow
} from "./util";

class Circle {
    constructor (option) {
        if (!isObject(option)) {
            return new Error("Argument option must be a object.");
        }
        if (typeof option.x === "undefined") {
            return new Error("Need property x.");
        } else {
            if (typeof option.x !== "number") {
                return new Error("Property x must be a number.");
            }
        }
        if (typeof option.y === "undefined") {
            return new Error("Need property y.");
        } else {
            if (typeof option.y !== "number") {
                return new Error("Property y must be a number.");
            }
        }
        if (typeof option.text === "undefined") {
            return new Error("Need property text.");
        } else {
            if (typeof option.text !== "number" && typeof option.text !== "string") {
                return new Error("Property text must be a number or string.");
            }
        }
        if (typeof option.isCenter === "undefined") {
            return new Error("Need property isCenter.");
        } else {
            if (typeof option.isCenter !== "boolean") {
                return new Error("Property isCenter must be a boolean.");
            }
        }
        if (option.radius && typeof option.radius !== "number") {
            return new Error("Property radius must be a number.");
        }
        this.x = option.x;
        this.y = option.y;
        this.originX = option.x;
        this.originY = option.y;
        this.text = option.text;
        this.isCenter = option.isCenter;
        this.bgColor = option.bgColor || "blue";
        this.radius = option.radius || 20;
        this.textColor = option.textColor || "black";
        this.from = null;
    }
    drawCircle (ctx) {
        ctx.fillStyle = this.bgColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    drawText (ctx) {
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.x - this.getTextWidth(ctx) / 2, this.y);
    }
    getTextWidth (ctx) {
        return ctx.measureText(this.text).width;
    }
    reDraw (point, ctx) {
        this.drawCircle(ctx);
        this.drawText(ctx);
        if (ctx.isPointInPath(point.x, point.y)) {
            return this;
        }
    }
    drawPointMyArrow (ctx) {
        this.from.forEach((fromCicrle) => {
            //fromCircle指向this
            let start = getCrossPoint(this, fromCicrle); //箭头起点与fromCircle的交点
            let end = getCrossPoint(fromCicrle, this); //箭头终点与this的交点
            if (start && end) { //如果两圆相切或者相交则不画箭头
                drawArrow(ctx, start.pointX, start.pointY, end.pointX, end.pointY, 30, 15, 2, fromCicrle.bgColor);
            }
        });
    }
}

export default Circle;