import path from "node:path";
import { app } from "electron";

export function getCodexPackagePath(): string | undefined {
  if (!app.isPackaged) {
    return undefined;
  }

  const appPath = app.getAppPath();
  const asarUnpackedPath = appPath.replace(/\.asar$/, ".asar.unpacked");
  return path.join(asarUnpackedPath, "node_modules", "@openai", "codex-sdk");
}
