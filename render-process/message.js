const { ipcRenderer } = require("electron");
const {CHANNEL_MESSAGE_FORWARD} = require('../main-process/message');

const sendMessageInRender = (args) => {
    ipcRenderer.send(CHANNEL_MESSAGE_FORWARD, args);
};

const registerMessageInRender = (route, callback) => {
    ipcRenderer.on(`${route.id}-message`, (event, args) => {
        callback && callback(event, args);
    });
};

module.exports = {
    sendMessageInRender,
    registerMessageInRender,
};
