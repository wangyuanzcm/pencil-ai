import * as Sentry from "@sentry/electron/main";
import { app, net } from "electron";
import { autoUpdater } from "electron-updater";
import { desktopConfig } from "./config";
import { refreshApplicationMenu } from "./menu";

let _isUpdateDownloaded = false;

export function isUpdateDownloaded(): boolean {
  return _isUpdateDownloaded;
}

export async function setupUpdater(ipcDeviceManager: any) {
  const log = require("electron-log");
  log.transports.file.level = "debug";
  autoUpdater.logger = log;
  autoUpdater.autoInstallOnAppQuit = false;

  autoUpdater.on("update-downloaded", (_info: any) => {
    _isUpdateDownloaded = true;
    refreshApplicationMenu();
    if (!desktopConfig.get("installOnAppQuit")) {
      ipcDeviceManager.notifyAll("desktop-update-ready", {});
    }
  });

  setInterval(async () => {
    try {
      await checkForUpdates();
    } catch (error) {
      log.error("Error checking for updates during periodic check:", error);
      Sentry.captureException(error);
    }
  }, 30 * 60 * 1000);

  try {
    await checkForUpdates();
  } catch (error) {
    log.error("Error checking for updates during setup:", error);
    Sentry.captureException(error);
  }
}

export async function checkForUpdates(): Promise<boolean> {
  let updateCheckResult: any;

  if (net.isOnline()) {
    try {
      updateCheckResult = await autoUpdater.checkForUpdates();
      if (updateCheckResult?.downloadPromise) {
        updateCheckResult.downloadPromise.catch((error: any) => {
          if (error?.message?.toUpperCase().includes("NET::ERR")) {
            return;
          }
          if (net.isOnline()) {
            throw error;
          }
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.toUpperCase().includes("NET::ERR")) {
        return false;
      }
      if (net.isOnline()) {
        throw error;
      }
    }
  }

  return updateCheckResult ? updateCheckResult.isUpdateAvailable : false;
}

export function handleUpdaterNotifications(ipc: any) {
  ipc.on("desktop-update-install", () => {
    desktopConfig.set("installOnAppQuit", false);
    _isUpdateDownloaded = false;
    autoUpdater.quitAndInstall(false, true);
  });

  ipc.on("set-install-on-app-quit", () => {
    desktopConfig.set("installOnAppQuit", true);
  });
}

export function quitAndInstallIfUpdateDownloaded(
  params: { forceQuitAndInstall?: boolean } = {},
) {
  if (
    _isUpdateDownloaded &&
    (desktopConfig.get("installOnAppQuit") || params.forceQuitAndInstall)
  ) {
    desktopConfig.set("installOnAppQuit", false);
    _isUpdateDownloaded = false;
    autoUpdater.quitAndInstall(false, false);
  } else {
    desktopConfig.set("installOnAppQuit", false);
    _isUpdateDownloaded = false;
    app.quit();
  }
}
