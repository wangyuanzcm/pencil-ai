import path from "node:path";
import { app } from "electron";

export function getFilePathForPencilURI(uri: string): string {
  return path.join(
    app.getAppPath(),
    "out",
    "data",
    uri.substring("pencil:".length),
  );
}
