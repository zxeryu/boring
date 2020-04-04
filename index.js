const { app, ipcMain, Notification, screen, shell } = require("electron");
const { createWindow, registerWinListener } = require("./src/route/window");
const { home } = require("./src/pages");

const map = {};

let win;

app.whenReady().then(() => {
  createWindow(home);
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

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log("main===", arg); // prints "ping"
  event.reply("asynchronous-reply", "pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log("main===", arg); // prints "ping"
  event.returnValue = "pong";
});

ipcMain.on("close-win", (event, args) => {
  map[args] && map[args].close();
});
ipcMain.on("zx-notify", (event) => {
  new Notification({
    title: "zx",
    body: "this is content",
  }).show();
});
ipcMain.on("zx-screen", (event) => {
  console.log(screen.getCursorScreenPoint());
});
ipcMain.on("zx-shell", (event) => {
  shell.openExternal("https://www.baidu.com/");
});

ipcMain.on("zx-win-frame", (event, args) => {
  const win = createWindow222();
  map["hover"] = win;
  if (args) {
  }
});

ipcMain.on("zx-set-win-pos", (event, args) => {
  win.setPosition(args.x, args.y);
});
