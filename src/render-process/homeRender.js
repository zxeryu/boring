const { home, hover, record } = require("../pages");
const { omit, keys, forEach } = require("lodash");
const { win, message, robot } = require("../bridge");
const btnAdd = document.getElementById("btn_add");
const list = document.getElementById("list");

const operateObjs = {};

function refreshList() {
  //清空
  const cs = list.childNodes;
  for (let i = cs.length - 1; i >= 0; i--) {
    list.removeChild(cs[i]);
  }
  //渲染
  forEach(keys(operateObjs), (key) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("执行"));
    btn.onclick = function () {
      queueExecute([...operateObjs[key]]);
    };
    li.appendChild(document.createTextNode(key));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

btnAdd.addEventListener("click", (ev) => {
  const recordID = new Date().toISOString();
  operateObjs[recordID] = [];
  win.sendCreateWinInRender(record.withParams({ recordID }));
});

message.registerMessageInRender(home, (event, args) => {
  const { fromRouteID, toRouteID, type, params } = args;
  if (fromRouteID === record.id) {
    const { recordID, content } = params;
    operateObjs[recordID] = content;
    refreshList();
  }
});

const queueExecute = (queue) => {
  if (queue.length <= 0) {
    return;
  }
  const item = queue.shift(0);
  console.log("execute item ", item);
  if (item.operate === "click") {
    const point = item.points[0];
    robot.sendRobotClickInRender({ x: point.x, y: point.y });
  } else if (item.operate === "slide") {
    robot.sendRobotDragInRender({
      startPoint: item.points[0],
      endPoint: item.points[1],
      time: item.time / 1000,
    });
  }
  setTimeout(() => {
    queueExecute(queue);
  }, 1000);
};
