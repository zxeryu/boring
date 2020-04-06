const { app, Menu } = require("electron");
const { createWindow, registerWinListener } = require("./main-process/window");
const { home } = require("./src/pages");
const { registerMessageListener } = require("./main-process/message");
const { registerIoHookListener } = require("./main-process/iohook");

app.whenReady().then(() => {
  createWindow(home);
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//********************* ipcMain  **********************

registerWinListener();
registerMessageListener();
registerIoHookListener();
