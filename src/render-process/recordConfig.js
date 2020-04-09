const { message, win } = require("../bridge");
const { home, recordConfig } = require("../pages");
const { parseSearchString } = require("../../src-core/route/helper");

const btnSubmit = document.getElementById("btn_submit");
const repeatInput = document.getElementById("repeat_num");

const query = parseSearchString(window.location.search);

btnSubmit.addEventListener("click", (ev) => {
  if (!repeatInput.value || repeatInput.value <= 0) {
    return;
  }
  message.sendMessageInRender({
    fromRouteID: recordConfig.id,
    toRouteID: home.id,
    type: "config",
    params: {
      recordID: query.recordID,
      content: { repeatNum: repeatInput.value },
    },
  });
  win.sendCloseWinInRender(recordConfig);
  console.log(repeatInput.value);
});
