const { ioHook, message, win } = require("../bridge");
const { record, home } = require("../pages");
const moment = require("moment");
const { parseSearchString } = require("../../src-core/route/helper");
const btnStart = document.getElementById("btn_start");
const btnStop = document.getElementById("btn_stop");
const btnSave = document.getElementById("btn_save");

const state = document.getElementById("state");
const eventsDiv = document.getElementById("eventsDiv");

btnStart.addEventListener("click", (ev) => {
  btnStart.disable = true;
  refreshState("正在录制...");
  ioHook.sendIoHookStartInRender();
  ioHook.registerIoHookInRender(record, "mousedown", handleMouseDown);
  ioHook.registerIoHookInRender(record, "mouseup", handleMouseUp);
});
btnStop.addEventListener("click", (ev) => {
  btnStop.disable = true;
  refreshState("结束录制！");
  ioHook.unregisterIoHookInRender(record, "mousedown");
  ioHook.unregisterIoHookInRender(record, "mouseup");
  ioHook.sendIoHookStopInRender();
});
btnSave.addEventListener("click", (ev) => {
  message.sendMessageInRender({
    fromRouteID: record.id,
    toRouteID: home.id,
    type: "recordEvent",
    params: {
      recordID: query.recordID,
      content: operateList,
    },
  });
  win.sendCloseWinInRender(record);
});

const query = parseSearchString(window.location.search);

const refreshState = (stateText) => {
  //清空
  const cs = state.childNodes;
  for (let i = cs.length - 1; i >= 0; i--) {
    state.removeChild(cs[i]);
  }
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(stateText));
  state.appendChild(span);
};

const refreshEvents = () => {
  //清空
  const cs = eventsDiv.childNodes;
  for (let i = cs.length - 1; i >= 0; i--) {
    eventsDiv.removeChild(cs[i]);
  }
  const span = document.createElement("span");
  span.appendChild(
    document.createTextNode(`已经录制${operateList.length}个事件`)
  );
  eventsDiv.appendChild(span);
};

let downPoint = undefined;
let downTime = undefined;
let upPoint = undefined;

// button: 1
// clicks: 6
// x: 800
// y: 601
// type: "mousedown"

const operateList = [];

const handleMouseDown = (e, args) => {
  downPoint = { x: args.x, y: args.y };
  downTime = moment();
};
const handleMouseUp = (e, args) => {
  upPoint = { x: args.x, y: args.y };
  if (downPoint && downTime !== undefined) {
    const diffTime = moment().diff(downTime, "millisecond");
    if (
      Math.abs(upPoint.x - downPoint.x) < 5 &&
      Math.abs(upPoint.y - downPoint.y) < 5
    ) {
      const event = {
        operate: "click",
        points: [upPoint],
        time: diffTime,
      };
      operateList.push(event);
    } else {
      const event = {
        operate: "slide",
        points: [downPoint, upPoint],
        time: diffTime,
      };
      operateList.push(event);
    }
    //刷新事件个数
    refreshEvents();
  }
};
