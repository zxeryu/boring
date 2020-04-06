const { ipcRenderer } = require("electron");
// const {
//   CHANNEL_IO_HOOK_START,
//   CHANNEL_IO_HOOK_STOP,
//   CHANNEL_IO_HOOK_REGISTER,
//   CHANNEL_IO_HOOK_UNREGISTER,
// } = require("../main-process/iohook");

const CHANNEL_IO_HOOK_START = "channel-io-hook-start";
const CHANNEL_IO_HOOK_STOP = "channel-io-hook-stop";
const CHANNEL_IO_HOOK_REGISTER = "channel-io-hook-register";
const CHANNEL_IO_HOOK_UNREGISTER = "channel-io-hook-unregister";

const sendIoHookStartInRender = (args) => {
  ipcRenderer.send(CHANNEL_IO_HOOK_START, args);
};
const sendIoHookStopInRender = () => {
  ipcRenderer.send(CHANNEL_IO_HOOK_STOP);
};

const registerIoHookInRender = (route, type, callback) => {
  ipcRenderer.send(CHANNEL_IO_HOOK_REGISTER, { routeID: route.id, type });
  ipcRenderer.on(`${route.id}-iohook-${type}`, (event, args) => {
    callback && callback(event, args);
  });
};

const unregisterIoHookInRender = (route, type) => {
  ipcRenderer.send(CHANNEL_IO_HOOK_UNREGISTER, { routeID: route.id, type });
};

module.exports = {
  sendIoHookStartInRender,
  sendIoHookStopInRender,
  registerIoHookInRender,
  unregisterIoHookInRender,
};
