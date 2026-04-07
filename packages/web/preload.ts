import { contextBridge, ipcRenderer, webUtils } from "electron";

contextBridge.exposeInMainWorld("PENCIL_APP_NAME", "Electron");
contextBridge.exposeInMainWorld("IS_DEV", process.env.NODE_ENV === "development");
contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message: any) => {
    ipcRenderer.send("ipc-message", message);
  },
  onMessageReceived: (callback: (message: any) => void) => {
    ipcRenderer.on("ipc-message", (_event, message) => {
      callback(message);
    });
  },
  resolveFilePath: (file: any) => {
    return webUtils.getPathForFile(file);
  },
});
