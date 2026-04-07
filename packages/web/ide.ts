import fs from "node:fs";
import path from "node:path";
import { app, shell } from "electron";

export async function handleExtensionToIDEInstall(ipc: any) {
  ipc.on("add-extension-to-ide", (ide: string) => {
    if (ide === "cursor") {
      shell.openExternal("cursor:extension/highagency.pencildev");
    }
  });

  for (const ide of ["cursor"]) {
    if (await notifyExtensionInstall(ide)) {
      ipc.notify("ide-name-changed", ide);
      return;
    }
  }
}

async function notifyExtensionInstall(ide: string): Promise<boolean> {
  const userDir = app.getPath("home");
  const idePath = path.join(userDir, `.${ide}`);

  if (!fs.existsSync(idePath)) {
    return false;
  }

  const extensionsPath = path.join(idePath, "extensions");
  if (!fs.existsSync(extensionsPath)) {
    return false;
  }

  const extensions = fs.readdirSync(extensionsPath);
  return !extensions.some((ext) => ext.startsWith("highagency.pencildev"));
}
