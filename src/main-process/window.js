const { BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const { winMap } = require("../route/RouteWinMap");
const { assign } = require("lodash");

const defaultOptions = {
  isShow: true,
  // isDevTool: false,
  isDevTool: true,
};

/**
 * create window
 */
const createWindow = (routeTree, options) => {
  let win = new BrowserWindow(routeTree.config);
  win.loadFile(routeTree.path, { query: routeTree.params });
  // win.loadURL(routeTree.path);
  const opts = assign({}, defaultOptions, options);
  if (opts.isShow) {
    win.show();
  }
  if (opts.isDevTool) {
    win.openDevTools();
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

const CHANNEL_WIN_CREATE = "zx-create-window";
const CHANNEL_WIN_CLOSE = "zx-close-window";
const CHANNEL_WIN_MOVE = "zx-move-window";

//main receive emitter
const registerWinListener = () => {
  ipcMain.on(CHANNEL_WIN_CREATE, (event, route, opts) => {
    createWindow(route, opts);
  });
  ipcMain.on(CHANNEL_WIN_CLOSE, (event, route) => {
    closeWindow(route);
  });
  ipcMain.on(CHANNEL_WIN_MOVE, (event, args) => {
    const { route } = args;
    const win = winMap.getWin(route.id);
    if (win) {
      win.setPosition(args.x, args.y);
    }
  });
};
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
  createWindow,
  registerWinListener,
  sendCreateWinInRender,
  sendCloseWinInRender,
  sendMoveWinInRender,
};
