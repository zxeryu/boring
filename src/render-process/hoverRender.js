const { hover } = require("../pages");
const { sendCloseWinInRender } = require("../route/window");
const btnSave = document.getElementById("btn-save");
const btnClose = document.getElementById("btn-close");

btnSave.addEventListener("click", () => {});
btnClose.addEventListener("click", () => {
  sendCloseWinInRender(hover);
});
