const { ipcRenderer } = require("electron");

const CHANNEL_MOUSE_CLICK = "channel-robot-mouse-click";
const CHANNEL_MOUSE_DRAG = "channel-robot-mouse-drag";

const sendRobotClickInRender = (args) => {
  ipcRenderer.send(CHANNEL_MOUSE_CLICK, args);
};
const sendRobotDragInRender = (args) => {
  ipcRenderer.send(CHANNEL_MOUSE_DRAG, args);
};

module.exports = {
  sendRobotClickInRender,
  sendRobotDragInRender,
};
