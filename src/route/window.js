const { BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const { winMap } = require("./RouteWinMap");

/**
 * create window
 */
const createWindow = (routeTree, options = { isShow: true }) => {
  let win = new BrowserWindow(routeTree.config);
  win.loadFile(routeTree.path);
  // win.loadURL(routeTree.path);
  if (options.isShow) {
    win.show();
  }

  //win添加到map中
  winMap.pushOrUpdateWin(routeTree.id, win);

  return win;
};
/**
 * close window
 */
const closeWindow = (routeTree) => {
  const win = winMap.getWin(routeTree.id);
  if (win) {
    win.close();
    winMap.removeWin(win);
  }
};

/**
 * ******************** 打开/关闭 window监听 *******************
 */

const Channel = "zx-create-window";
const CHANNEL_CLOSE = "zx-close-window";

//main receive emitter
const registerWinListener = () => {
  ipcMain.on(Channel, (event, route) => {
    createWindow(route);
  });
  ipcMain.on(CHANNEL_CLOSE, (event, route) => {
    closeWindow(route);
  });
};
//render send emitter
const sendCreateWinInRender = (route) => {
  ipcRenderer.send(Channel, route);
};

const sendCloseWinInRender = (route) => {
  ipcRenderer.send(CHANNEL_CLOSE, route);
};

module.exports = {
  createWindow,
  registerWinListener,
  sendCreateWinInRender,
  sendCloseWinInRender,
};
