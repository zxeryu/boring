const { ioHook, message, win } = require("../bridge");
const { record, home } = require("../pages");
const moment = require("moment");
const { parseSearchString } = require("../../src-core/route/helper");
const { take, size } = require("lodash");

const btnStart = document.getElementById("btn_start");
const btnStop = document.getElementById("btn_stop");
const btnSave = document.getElementById("btn_save");

const state = document.getElementById("state");
const eventsDiv = document.getElementById("eventsDiv");

let flag = false;

btnStart.addEventListener("click", (ev) => {
  btnStart.disable = true;
  flag = true;
  refreshState("正在录制...");
  ioHook.sendIoHookStartInRender();
  ioHook.registerIoHookInRender(record, "mousedown", handleMouseDown);
  ioHook.registerIoHookInRender(record, "mouseup", handleMouseUp);
});
btnStop.addEventListener("click", (ev) => {
  btnStop.disable = true;
  flag = false;
  refreshState("结束录制！");
  ioHook.unregisterIoHookInRender(record, "mousedown");
  ioHook.unregisterIoHookInRender(record, "mouseup");
  ioHook.sendIoHookStopInRender();
});
btnSave.addEventListener("click", (ev) => {
  if (operateList && operateList.length > 1) {
    const events = take(operateList, size(operateList) - 1);
    message.sendMessageInRender({
      fromRouteID: record.id,
      toRouteID: home.id,
      type: "recordEvent",
      params: {
        recordID: query.recordID,
        content: events,
      },
    });
  }
  win.sendCloseWinInRender(record);
});

window.onbeforeunload = (ev) => {
  if (flag) {
    ioHook.unregisterIoHookInRender(record, "mousedown");
    ioHook.unregisterIoHookInRender(record, "mouseup");
    ioHook.sendIoHookStopInRender();
  }
};

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
let lastOperateTime = undefined;

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
    let intervalTime = 1000;
    const current = moment();
    if (lastOperateTime) {
      intervalTime = current.diff(lastOperateTime, "millisecond");
    }
    const diffTime = current.diff(downTime, "millisecond");
    if (
      Math.abs(upPoint.x - downPoint.x) < 5 &&
      Math.abs(upPoint.y - downPoint.y) < 5
    ) {
      const event = {
        operate: "click",
        points: [upPoint],
        time: diffTime,
        intervalTime,
      };
      operateList.push(event);
    } else {
      const event = {
        operate: "slide",
        points: [downPoint, upPoint],
        time: diffTime,
        intervalTime,
      };
      operateList.push(event);
    }
    //刷新事件个数
    refreshEvents();
    lastOperateTime = current;
  }
};
