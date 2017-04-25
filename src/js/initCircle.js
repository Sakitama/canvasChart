import Circle from "./Circle";

import {
    cvsWidth,
    cvsHeight
} from "./const";
import {
    circleArray
} from "./const";

let centerCircle = new Circle({
    isCenter: true,
    x: cvsWidth / 2,
    y: cvsHeight / 2,
    text: "中国大学",
    radius: 80,
    bgColor: "skyblue",
    textColor: "white"
});

let circleOne = new Circle({
    isCenter: false,
    x: cvsWidth / 5,
    y: cvsHeight / 4,
    text: "计算机学院",
    radius: 40,
    bgColor: "orange",
    textColor: "white"
});

let circleTwo = new Circle({
    isCenter: false,
    x: cvsWidth / 2,
    y: cvsHeight / 4,
    text: "商学院",
    radius: 50,
    bgColor: "green",
    textColor: "white"
});

let circleThree = new Circle({
    isCenter: false,
    x: cvsWidth * 3 / 4,
    y: cvsHeight / 2,
    text: "艺术学院",
    radius: 40,
    bgColor: "blue",
    textColor: "white"
});

let circleFour = new Circle({
    isCenter: false,
    x: cvsWidth / 4,
    y: cvsHeight * 3 / 4,
    text: "材料学院",
    radius: 40,
    bgColor: "red",
    textColor: "white"
});

let circleFive = new Circle({
    isCenter: false,
    x: cvsWidth * 3 / 4,
    y: cvsHeight * 3 / 4,
    text: "工商学院",
    radius: 40,
    bgColor: "purple",
    textColor: "white"
});

centerCircle.from = [];
circleOne.from = [centerCircle, circleFour];
circleTwo.from = [centerCircle, circleOne];
circleThree.from = [centerCircle, circleTwo, circleFive];
circleFour.from = [centerCircle, circleFive];
circleFive.from = [centerCircle, circleTwo];

circleArray.push(centerCircle, circleOne, circleTwo, circleThree, circleFour, circleFive);

export {
    circleArray
};