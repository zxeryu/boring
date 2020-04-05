const { ipcMain, Notification, shell } = require("electron");

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
