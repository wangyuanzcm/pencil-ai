"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("PENCIL_APP_NAME", "Electron");
electron.contextBridge.exposeInMainWorld("IS_DEV", process.env.NODE_ENV === "development");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message) => {
    electron.ipcRenderer.send("ipc-message", message);
  },
  onMessageReceived: (callback) => {
    electron.ipcRenderer.on("ipc-message", (_event, message) => {
      callback(message);
    });
  },
  resolveFilePath: (file) => {
    return electron.webUtils.getPathForFile(file);
  }
});
