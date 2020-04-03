const { ipcRenderer } = require("electron");
const btnSave = document.getElementById("btn-save");
const btnClose = document.getElementById("btn-close");

btnSave.addEventListener("click", () => {

});
btnClose.addEventListener("click", () => {
    ipcRenderer.send("close-win", "hover");
});
