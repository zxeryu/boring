const robot = require("robotjs");

const mouseLoc = robot.getMousePos();
console.log(mouseLoc.x, mouseLoc.y);

const Area = [1080, 2160];

const StartDot = [178, 105];

const ScoreDot = [459, 150];

robot.moveMouse(ScoreDot[0], ScoreDot[1]);
robot.setMouseDelay(100);
robot.mouseClick();
