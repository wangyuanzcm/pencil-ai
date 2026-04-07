import fs from "node:fs";
import path from "node:path";
import { mapCanvasModelsToThirdParty, type LoginType } from "@ha/shared";
import { desktopConfig } from "./config";
import { logger } from "./logger";

const EXTENSION_TO_MEDIA_TYPE: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

type AgentExecuteAttachment =
  | {
      type: "image";
      name: string;
      source: {
        data: string;
        media_type: string;
        type: "base64";
      };
    }
  | {
      type: "text";
      name: string;
      content: string;
    };

export type AgentExecuteConfigItem = {
  file: string;
  prompt: string;
  model?: string;
  attachments?: string[];
};

export type AgentExecuteConfig = AgentExecuteConfigItem[];

function resolveAttachments(
  attachments: string[],
  basePath: string,
): AgentExecuteAttachment[] {
  const result: AgentExecuteAttachment[] = [];

  for (const attachment of attachments) {
    const resolvedPath = path.isAbsolute(attachment)
      ? attachment
      : path.resolve(basePath, attachment);

    if (!fs.existsSync(resolvedPath)) {
      logger.warn(`Attachment file does not exist: ${resolvedPath}, skipping.`);
      continue;
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const name = path.basename(resolvedPath);

    if (ext in EXTENSION_TO_MEDIA_TYPE) {
      const data = fs.readFileSync(resolvedPath).toString("base64");
      result.push({
        type: "image",
        name,
        source: {
          data,
          media_type: EXTENSION_TO_MEDIA_TYPE[ext]!,
          type: "base64",
        },
      });
    } else {
      const content = fs.readFileSync(resolvedPath, "utf-8");
      result.push({
        type: "text",
        name,
        content,
      });
    }
  }

  return result;
}

export function parseAgentExecuteConfig(
  configString: string,
): AgentExecuteConfig | undefined {
  try {
    return JSON.parse(configString) as AgentExecuteConfig;
  } catch {
    try {
      const filePath = path.isAbsolute(configString)
        ? configString
        : path.resolve(process.cwd(), configString);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent) as AgentExecuteConfig;
    } catch {
      return undefined;
    }
  }
}

export async function openWithAgentExecuteConfig(
  ipcDeviceManager: any,
  loadFile: (filePath: string, zoomToFit: boolean) => Promise<void>,
  config: AgentExecuteConfig,
) {
  for (const c of config) {
    const filePath = path.isAbsolute(c.file)
      ? c.file
      : path.resolve(process.cwd(), c.file);

    if (!fs.existsSync(filePath)) {
      logger.warn(`File does not exist: ${filePath}, skipping.`);
      continue;
    }

    await loadFile(filePath, true);
    await ipcDeviceManager.waitForDocumentReady(filePath);

    const ipc = await ipcDeviceManager.getIPC(filePath);
    if (!ipc) {
      logger.warn(`Failed to get IPC for file: ${filePath}`);
      continue;
    }

    const loginType = desktopConfig.get("claudeLoginType") as LoginType | undefined;
    if (loginType === undefined) {
      logger.warn("Cannot prompt agent: Claude login type is not set.");
    }

    const files =
      c.attachments && c.attachments.length > 0
        ? resolveAttachments(c.attachments, process.cwd())
        : undefined;

    ipc.notify("prompt-agent", {
      prompt: c.prompt,
      modelID: loginType
        ? mapCanvasModelsToThirdParty("claude", loginType, c.model)
        : undefined,
      files,
    });
  }
}
