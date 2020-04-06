const { ipcRenderer } = require("electron");
const {
  CHANNEL_WIN_CREATE,
  CHANNEL_WIN_CLOSE,
  CHANNEL_WIN_MOVE,
} = require("../main-process/window");

//render send emitter
const sendCreateWinInRender = (route, opts) => {
  ipcRenderer.send(CHANNEL_WIN_CREATE, route, opts);
};

const sendCloseWinInRender = (route) => {
  ipcRenderer.send(CHANNEL_WIN_CLOSE, route);
};

const sendMoveWinInRender = (route, x, y) => {
  ipcRenderer.send(CHANNEL_WIN_MOVE, { route, x, y });
};

module.exports = {
  sendCreateWinInRender,
  sendCloseWinInRender,
  sendMoveWinInRender,
};
