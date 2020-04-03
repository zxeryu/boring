const header = document.getElementById("header");

let downFlag = false;
let prePoint = undefined;

header.addEventListener("mousedown", (e) => {
    downFlag = true;
});
header.addEventListener("mousemove", (e) => {
    if (downFlag && prePoint) {
        const dividerX = e.screenX - prePoint.x;
        const dividerY = e.screenY - prePoint.y;
        ipcRenderer.send("zx-set-win-pos", {
            x: e.screenX - e.clientX + dividerX,
            y: e.screenY - e.clientY + dividerY,
        });
    }
    prePoint = { x: e.screenX, y: e.screenY };
});
header.addEventListener("mouseup", (e) => {
    downFlag = false;
});
header.addEventListener("mouseleave", (e) => {
    downFlag = false;
});
