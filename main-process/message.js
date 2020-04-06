const { ipcMain } = require("electron");
const { winMap } = require("./RouteWinMap");

const CHANNEL_MESSAGE_FORWARD = "zx-message-forward";

const registerMessageListener = () => {
  ipcMain.on(CHANNEL_MESSAGE_FORWARD, (event, args) => {
    const { toRouteID } = args;
    const win = winMap.getWin(toRouteID);
    if (win) {
      win.webContents.send(`${toRouteID}-message`, args);
    }
  });
};

module.exports = {
  CHANNEL_MESSAGE_FORWARD,
  registerMessageListener,
};
