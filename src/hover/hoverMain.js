const { BrowserWindow } = require("electron");
const path = require("path");
let win;

function createWindow222() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    transparent: true,
    frame: false,
  });
  // win.setIgnoreMouseEvents(true)

  // 加载index.html文件
  // win.webContents.openDevTools();
  win.loadURL(path.join('file:',__dirname,'hover.html')); //new.html是新开窗口的渲染进程

  win.show();

  return win;
}

module.exports = {
  createWindow222,
};
