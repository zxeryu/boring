const { RouteTree } = require("./route/RouteTree");

const ConfigBase = {
  webPreferences: {
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

const home = RouteTree.id("main")
  .withName("main")
  .withPath("./src/page/index.html")
  .withConfig({
    ...ConfigBase,
    width: 300,
    height: 600,
  })
  .withRoutes([hover]);

module.exports = {
  home,
  hover,
};
