const robot = require("robotjs");
const { ipcMain } = require("electron");

//点击
const click = (x, y) => {
  robot.moveMouse(x, y);
  robot.mouseClick();
};
//滑动
const drag = (startPoint, endPoint, time) => {
  if (time > 3000) {
    console.error("Error: operate time too long! please check time params");
    return;
  }
  robot.moveMouse(startPoint.x, startPoint.y);
  robot.mouseToggle("down");
  robot.moveMouseSmooth(endPoint.x, endPoint.y, time);
  robot.mouseToggle("up");
};

const CHANNEL_MOUSE_CLICK = "channel-robot-mouse-click";
const CHANNEL_MOUSE_DRAG = "channel-robot-mouse-drag";

const registerRobotListener = () => {
  ipcMain.on(CHANNEL_MOUSE_CLICK, (event, args) => {
    const { x, y } = args;
    click(x, y);
  });

  ipcMain.on(CHANNEL_MOUSE_DRAG, (event, args) => {
    const { startPoint, endPoint, time } = args;
    drag(startPoint, endPoint, time);
  });
};

module.exports = {
  registerRobotListener,
};
