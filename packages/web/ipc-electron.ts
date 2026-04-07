import { IPCHost } from "@ha/shared";
import { ipcMain, type WebContents } from "electron";
import { logger } from "./logger";

export class IPCElectron extends IPCHost {
  constructor(webContents: WebContents) {
    const onMessage = (callback: (message: any) => void) => {
      ipcMain.on("ipc-message", (event, message) => {
        if (event.sender.id === webContents.id) {
          callback(message);
        }
      });
    };

    const sendMessage = (message: any) => {
      if (!webContents.isDestroyed()) {
        webContents.send("ipc-message", message);
      }
    };

    super(onMessage, sendMessage, logger as any);
  }
}
