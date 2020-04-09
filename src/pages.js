const { RouteTree } = require("../src-core/route/RouteTree");

const ConfigBase = {
  webPreferences: {
    devTools: true,
    nodeIntegration: true,
  },
};

const ConfigNoFrame = {
  ...ConfigBase,
  frame: false,
};

const ConfigTransparent = {
  ...ConfigNoFrame,
  transparent: true,
};



const hover = RouteTree.id("hover")
  .withName("取值")
  .withPath("./src/page/hover.html")
  .withConfig({
    ...ConfigTransparent,
    width: 800,
    height: 600,
  });

const record = RouteTree.id("record")
  .withName("录制")
  .withPath("./src/page/record.html")
  .withConfig({
    ...ConfigBase,
    width: 300,
    height: 180,
  });

const recordConfig = RouteTree.id("recordConfig")
  .withName("事件设置")
  .withPath("./src/page/recordConfig.html")
  .withConfig({
    ...ConfigBase,
    width: 300,
    height: 180,
  });

const home = RouteTree.id("main")
    .withName("main")
    .withPath("./src/page/index.html")
    .withConfig({
        ...ConfigBase,
        width: 300,
        height: 600,
        x: 100,
        y: 100,
        fullscreen: false,
        // isDevTool: true,
    })
    .withRoutes([hover, record]);

module.exports = {
  home,
  hover,
  record,
  recordConfig,
};
