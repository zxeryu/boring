const ioHook = require("iohook");
const { ipcMain, ipcRenderer } = require("electron");
const { winMap } = require("./RouteWinMap");

const typeObjs = {};

const eventHandler = (event) => {
  const { channel, routeID } = typeObjs[event.type];
  if (channel && routeID) {
    //发送到render进程
    const win = winMap.getWin(routeID);
    win && win.webContents.send(channel, event);
  }
};

ioHook.on("mousedown", eventHandler);
ioHook.on("mouseup", eventHandler);
// ioHook.on("mouseclick", eventHandler);
// ioHook.on("mousemove", eventHandler);
// ioHook.on("mousemove", eventHandler);
// ioHook.on("mousewheel", eventHandler);
//
// ioHook.on("keypress", eventHandler);

const CHANNEL_IO_HOOK_START = "channel-io-hook-start";
const CHANNEL_IO_HOOK_STOP = "channel-io-hook-stop";
const CHANNEL_IO_HOOK_REGISTER = "channel-io-hook-register";
const CHANNEL_IO_HOOK_UNREGISTER = "channel-io-hook-unregister";

const registerIoHookListener = () => {
  ipcMain.on(CHANNEL_IO_HOOK_START, (event, args) => {
    // ioHook.load();
    ioHook.start(args);
  });
  ipcMain.on(CHANNEL_IO_HOOK_STOP, (event, args) => {
    // ioHook.unload();
    ioHook.stop();
  });
  ipcMain.on(CHANNEL_IO_HOOK_REGISTER, (event, args) => {
    const { routeID, type } = args;
    typeObjs[type] = {
      channel: `${routeID}-iohook-${type}`,
      routeID: routeID,
    };
  });
  ipcMain.on(CHANNEL_IO_HOOK_UNREGISTER, (event, args) => {
    const { routeID, type } = args;
    typeObjs[type] = null;
  });
};

module.exports = {
  CHANNEL_IO_HOOK_START,
  CHANNEL_IO_HOOK_STOP,
  CHANNEL_IO_HOOK_REGISTER,
  CHANNEL_IO_HOOK_UNREGISTER,
  registerIoHookListener,
};
