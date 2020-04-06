const ioHook = require("iohook");

const callbacks = {};

const eventHandler = (event) => {
  const callback = callbacks[event.type];
  callback && callback(event);
};

ioHook.on("mousedown", eventHandler);
ioHook.on("mouseup", eventHandler);
ioHook.on("mouseclick", eventHandler);
ioHook.on("mousemove", eventHandler);
ioHook.on("mousemove", eventHandler);
ioHook.on("mousewheel", eventHandler);

ioHook.on("keypress", eventHandler);

const start = (enableLogger) => {
  ioHook.start(enableLogger);
};

const stop = () => {
  ioHook.unload();
  ioHook.stop();
};

const register = (eventType, callback) => {
  callbacks[eventType] = callback;
};

const unregister = (eventType) => {
  callbacks[eventType] = null;
};

module.exports = {
  start,
  stop,
  register,
  unregister,
};
