const { home, hover } = require("../pages");
const { omit, keys, forEach } = require("lodash");
const { window, message } = require("../bridge");
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
      console.log(operateObjs[key]);
    };
    li.appendChild(document.createTextNode(key));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

btnAdd.addEventListener("click", (ev) => {
  const hoverID = new Date().toISOString();
  operateObjs[hoverID] = [];
  window.sendCreateWinInRender(hover.withParams({ hoverID }));
});

message.registerMessageInRender(home, (event, args) => {
  const { type, params } = args;
  if (type === "event") {
    operateObjs[params.hoverID].push(omit(params, ["hoverID"]));
  } else if (type === "save") {
    refreshList();
  }
});
