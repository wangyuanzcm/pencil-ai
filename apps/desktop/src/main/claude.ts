import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { app } from "electron";
import { desktopConfig } from "./config";
import { APP_FOLDER_PATH, CONFIG_FOLDER } from "./constants";

export function getClaudeCodePackagePath(): string | undefined {
  if (!app.isPackaged) {
    return undefined;
  }

  if (os.platform() === "win32") {
    return path.join(CONFIG_FOLDER);
  }

  const appPath = app.getAppPath();
  const asarUnpackedPath = appPath.replace(/\.asar$/, ".asar.unpacked");
  return path.join(
    asarUnpackedPath,
    "node_modules",
    "@anthropic-ai",
    "claude-agent-sdk",
  );
}

export async function setupClaudeCodeResources() {
  if (!app.isPackaged) {
    return;
  }

  if (os.platform() !== "win32") {
    return;
  }

  const appPath = app.getAppPath();
  const asarUnpackedPath = appPath.replace(/\.asar$/, ".asar.unpacked");
  const cliFile = path.join(
    asarUnpackedPath,
    "node_modules",
    "@anthropic-ai",
    "claude-agent-sdk",
    "cli.js",
  );

  try {
    fs.mkdirSync(CONFIG_FOLDER, { recursive: true });
    await fs.promises.cp(cliFile, path.join(CONFIG_FOLDER, "cli.js"));
  } catch {}
}

export function getClaudeCodeEnv(): NodeJS.ProcessEnv {
  const loginType = desktopConfig.get("claudeLoginType");
  const baseEnv: NodeJS.ProcessEnv = {
    ...process.env,
    ANTHROPIC_BETAS: "fine-grained-tool-streaming-2025-05-14",
  };

  const customFlags: Record<string, string | undefined> = {};
  switch (loginType) {
    case "api-key":
      customFlags.ANTHROPIC_API_KEY = desktopConfig.get("claudeApiKey");
      break;
    case "aws-bedrock":
      customFlags.CLAUDE_CODE_USE_BEDROCK = "1";
      break;
    case "google-vertex":
      customFlags.CLAUDE_CODE_USE_VERTEX = "1";
      break;
    case "microsoft-foundry":
      customFlags.CLAUDE_CODE_USE_FOUNDRY = "1";
      break;
  }

  return { ...baseEnv, ...customFlags };
}

export function getClaudeExecPath(): string | undefined {
  if (!app.isPackaged) {
    return undefined;
  }

  const plat = os.platform();
  return path.join(
    APP_FOLDER_PATH,
    "out",
    "assets",
    `bun-${plat}-${os.arch()}${plat === "win32" ? ".exe" : ""}`,
  );
}
