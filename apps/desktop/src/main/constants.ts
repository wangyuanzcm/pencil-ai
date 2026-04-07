import os from "node:os";
import path from "node:path";
import { app } from "electron";

export const IS_DEV = process.env.NODE_ENV === "development";

export const APP_PROTOCOL = "pencil";

export const EDITOR_PORT = process.env.EDITOR_PORT || "3000";

export const WS_PORT = process.env.WS_PORT
  ? Number.parseInt(process.env.WS_PORT, 10)
  : undefined;

export const APP_FOLDER_PATH = app.isPackaged
  ? path.resolve(__dirname, "..", "..", "app.asar.unpacked")
  : path.resolve(__dirname, "..");

export const IS_MAC = process.platform === "darwin";

export const EVAL_FOLDER = process.env.INTERNAL_PENCIL_EVAL_FOLDER;

export const CONFIG_FOLDER = path.join(os.homedir(), ".pencil");
