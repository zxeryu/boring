const { ipcMain, ipcRenderer } = require("electron");
const { winMap } = require("../route/RouteWinMap");

const CHANNEL_MESSAGE = "zx-message-forward";

const registerMessageListener = () => {
  ipcMain.on(CHANNEL_MESSAGE, (event, args) => {
    console.log(args);
    const { toRouteID } = args;
    const win = winMap.getWin(toRouteID);
    if (win) {
      win.webContents.send(`${toRouteID}-message`, args);
    }
  });
};

const sendMessageInRender = (args) => {
  ipcRenderer.send(CHANNEL_MESSAGE, args);
};

const registerMessageInRender = (route, callback) => {
  ipcRenderer.on(`${route.id}-message`, (event, args) => {
    callback && callback(event, args);
  });
};

module.exports = {
  registerMessageListener,
  sendMessageInRender,
  registerMessageInRender,
};
