const window = require("../render-process/window");
const message = require("../render-process/message");
module.exports = {
  ...window,
  ...message,
};
