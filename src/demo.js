const { ipcRenderer } = require("electron");
const btnDialog = document.getElementById("btn-dialog");
const btnIpcMain = document.getElementById("btn-ipcMain");
const btnClose = document.getElementById("btn-close");
const btnNotify = document.getElementById("btn-notify");
const btnScreen = document.getElementById("btn-screen");
const btnShell = document.getElementById("btn-shell");
const btnFrameShow = document.getElementById("btn-frame-show");
const btnFrameClose = document.getElementById("btn-frame-close");

btnDialog.addEventListener("click", () => {
  // dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
  alert("lalalaa");
});

btnIpcMain.addEventListener("click", () => {
  ipcRenderer.sendSync("synchronous-message", "ping"); // prints "pong"
  ipcRenderer.send("asynchronous-message", "ping");
});

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg); // prints "pong"
});

btnClose.addEventListener("click", () => {
  ipcRenderer.send("close-win");
});

btnNotify.addEventListener("click", () => {
  ipcRenderer.send("zx-notify");
});

btnScreen.addEventListener("click", () => {
  ipcRenderer.send("zx-screen");
});

btnShell.addEventListener("click", () => {
  ipcRenderer.send("zx-shell");
});

btnFrameShow.addEventListener("click", () => {
  ipcRenderer.send("zx-win-frame", true);
});
btnFrameClose.addEventListener("click", () => {
  ipcRenderer.send("zx-win-frame", false);
});


window.addEventListener('mousedown',(e)=>{
  console.log('-------mousedown-------',e);
});
window.addEventListener('mousemove',(e)=>{
  console.log('-------mousemove-------',e);
});
window.addEventListener('mouseup',(e)=>{
  console.log('-------mouseup-------',e);
});