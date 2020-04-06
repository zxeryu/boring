const { parseSearchString } = require("../../src-core/route/helper");
const moment = require("moment");
const { home, hover } = require("../pages");
const { window, message } = require("../bridge");

const btnSave = document.getElementById("btn-save");
const btnClose = document.getElementById("btn-close");
const header = document.getElementById("header");
const html = document.getElementById("html");

const query = parseSearchString(window.location.search);

/**
 * ************************* 拖动区域 ******************************
 */
let downFlag = false;
let prePoint = undefined;

header.addEventListener("mousedown", (e) => {
  downFlag = true;
});
header.addEventListener("mousemove", (e) => {
  if (downFlag && prePoint) {
    const dividerX = e.screenX - prePoint.x;
    const dividerY = e.screenY - prePoint.y;
    const x = e.screenX - e.clientX + dividerX,
      y = e.screenY - e.clientY + dividerY;
    window.sendMoveWinInRender(hover, x, y);
  }
  prePoint = { x: e.screenX, y: e.screenY };
});
header.addEventListener("mouseup", (e) => {
  downFlag = false;
});
header.addEventListener("mouseleave", (e) => {
  downFlag = false;
});

btnClose.addEventListener("click", () => {
  window.sendCloseWinInRender(hover);
});

/**
 * ************************* 操作区域 ******************************
 */
let downPoint = undefined;
let downTime = undefined;
let upPoint = undefined;

html.addEventListener("mousedown", (ev) => {
  downPoint = { screenX: ev.screenX, screenY: ev.screenY };
  downTime = moment();
});
html.addEventListener("mouseup", (ev) => {
  upPoint = { screenX: ev.screenX, screenY: ev.screenY };
  if (downPoint && downTime !== undefined) {
    const args = {
      fromRouteID: hover.id,
      toRouteID: home.id,
      type: "event",
    };
    const diffTime = moment().diff(downTime, "millisecond");
    if (
      Math.abs(upPoint.screenX - downPoint.screenX) < 5 &&
      Math.abs(upPoint.screenY - downPoint.screenY) < 5
    ) {
      // fromRouteID, toRouteID, params
      message.sendMessageInRender({
        ...args,
        params: {
          hoverID: query.hoverID,
          operate: "click",
          points: [upPoint],
          time: diffTime,
        },
      });
    } else {
      message.sendMessageInRender({
        ...args,
        params: {
          hoverID: query.hoverID,
          operate: "slide",
          points: [downPoint, upPoint],
          time: diffTime,
        },
      });
    }
  }
});

btnSave.addEventListener("click", () => {
  const args = {
    fromRouteID: hover.id,
    toRouteID: home.id,
    type: "save",
    params: {
      hoverID: query.hoverID,
    },
  };
  message.sendMessageInRender(args);
  window.sendCloseWinInRender(hover);
});
