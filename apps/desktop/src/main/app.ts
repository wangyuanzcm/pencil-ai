import { exec } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { IPCDeviceManager } from "@ha/ipc";
import { getMcpConfiguration } from "@ha/mcp";
import { mapCanvasModelsToThirdParty } from "@ha/shared";
import { WebSocketServerManager } from "@ha/ws-server";
import { app, dialog, nativeTheme, net } from "electron";
import { AgentConfigManager } from "./agent-config-manager";
import { openWithAgentExecuteConfig, type AgentExecuteConfig } from "./agent-execute-config";
import { setupClaudeCodeResources } from "./claude";
import { desktopConfig } from "./config";
import { APP_FOLDER_PATH, APP_PROTOCOL, EDITOR_PORT, IS_DEV, WS_PORT } from "./constants";
import { DesktopMCPAdapter } from "./desktop-mcp-adapter";
import { backupFilePath, DesktopResourceDevice } from "./desktop-resource-device";
import { handleExtensionToIDEInstall } from "./ide";
import { IPCElectron } from "./ipc-electron";
import { logger } from "./logger";
import { organizeWindowsIntoGrid, refreshApplicationMenu, setupMenu } from "./menu";
import { handleUpdaterNotifications, setupUpdater } from "./updater";
import { getFilePathForPencilURI } from "./utils";

const MAX_RECENT_FILES = 14;

export type PencilInitArgs =
  | {
      filePath?: string;
      agentExecuteConfig?: AgentExecuteConfig;
    }
  | undefined;

export class PencilApp {
  private readonly wsServer = new WebSocketServerManager(logger as any, WS_PORT);
  private readonly mcpAdapter = new DesktopMCPAdapter(APP_FOLDER_PATH);
  private readonly ipcDeviceManager = new IPCDeviceManager(
    this.wsServer,
    logger as any,
    APP_FOLDER_PATH,
    this.mcpAdapter.getAppName(),
    undefined,
    async (filePath: string) => {
      await this.loadFile(filePath);
    },
  );
  private readonly agentConfigManager = new AgentConfigManager(this.ipcDeviceManager as any);

  async cleanup() {
    await this.ipcDeviceManager.stopAllAgents();
  }

  async initialize(args: PencilInitArgs) {
    this.wsServer.start();
    this.ipcDeviceManager.proxyMcpToolCallRequests();

    this.wsServer.on("ready", async (port: number) => {
      await this.mcpAdapter.saveMCPAppInfo(`${port}`);
      await this.mcpAdapter.setupIntegrations(desktopConfig.get("enabledIntegrations") as any);
    });

    if (!IS_DEV) {
      await setupUpdater(this.ipcDeviceManager as any);
    }

    setupMenu(
      this.ipcDeviceManager,
      this.handleNewFile.bind(this),
      this.handleOpenDialog.bind(this),
      this.handleToggleTheme.bind(this),
      {
        getRecentFiles,
        openRecentFile: (filePath) => this.loadFile(filePath, true),
        clearRecentFiles,
      },
    );

    await setupClaudeCodeResources();

    let fileToOpen = args?.filePath;
    if (!fileToOpen) {
      const recentFiles = getRecentFiles();
      if (recentFiles.length > 0 && fs.existsSync(recentFiles[0]!)) {
        fileToOpen = recentFiles[0]!;
      } else {
        fileToOpen = "pencil-welcome-desktop.pen";
      }
    }

    if (args?.agentExecuteConfig) {
      await openWithAgentExecuteConfig(
        this.ipcDeviceManager,
        this.loadFile.bind(this),
        args.agentExecuteConfig,
      );
      if (args.agentExecuteConfig.length >= 2) {
        organizeWindowsIntoGrid();
      }
      return;
    }

    await this.loadFile(fileToOpen, true);
  }

  async loadFile(filePath: string, zoomToFit = false) {
    logger.info("loadFile", filePath, "zoomToFit:", zoomToFit);

    const existingDevice = this.ipcDeviceManager.getResourceDevice(filePath);
    if (existingDevice) {
      const desktopDevice = existingDevice as DesktopResourceDevice;
      desktopDevice.focusWindow();
      return;
    }

    let fileContent: string;
    let fileIsDirty = false;
    let fileError: FileError | undefined;

    try {
      if (!filePath.startsWith("pencil:") && !path.isAbsolute(filePath)) {
        const url = IS_DEV
          ? `http://localhost:${EDITOR_PORT}/data/${filePath}`
          : `${APP_PROTOCOL}://editor/data/${filePath}`;
        const response = await net.fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load bundled file: ${filePath} (${response.status})`);
        }
        fileContent = await response.text();
      } else {
        let fileToRead = filePath.startsWith("pencil:")
          ? getFilePathForPencilURI(filePath)
          : filePath;

        if (!filePath.startsWith("pencil:")) {
          const backupPath = backupFilePath(fileToRead);
          let backupStat: fs.Stats | undefined;

          try {
            backupStat = await fs.promises.stat(backupPath);
          } catch {}

          if (backupStat) {
            const fileStat = await fs.promises.stat(fileToRead);
            if (fileStat.mtime < backupStat.mtime) {
              logger.info(
                `Backup is ${backupPath} newer (${backupStat.mtime}) than file ${fileToRead} (${fileStat.mtime}), loading it.`,
              );
              fileToRead = backupPath;
              fileIsDirty = true;
            } else {
              logger.info(
                `Backup is ${backupPath} older (${backupStat.mtime}) than file ${fileToRead} (${fileStat.mtime}), ignoring it.`,
              );
            }
          }
        }

        fileContent = await fs.promises.readFile(fileToRead, "utf8");
      }
    } catch (e) {
      fileContent = "";
      fileError = {
        filePath,
        errorMessage: e instanceof Error ? e.message : undefined,
      };
    }

    const device = new DesktopResourceDevice(filePath, fileContent, fileIsDirty, (pathToSave) =>
      ipc.request("save", pathToFileURL(pathToSave).toString()),
    );
    const ipc = new IPCElectron(device.getWindow().webContents);

    if (fileError) {
      ipc.notify("file-error", fileError);
      this.ipcDeviceManager.waitForDocumentReady(filePath).then(() => {
        ipc.notify("file-error", fileError);
      });
    }

    ipc.on("add-to-chat", async (message: any) => {
      ipc.notify("add-to-chat", message);
    });

    ipc.handle("get-fullscreen", () => {
      return device.getWindow().isFullScreen();
    });

    ipc.handle("get-active-integrations", () => {
      return {
        active: desktopConfig.get("enabledIntegrations"),
        supported: DesktopMCPAdapter.getSupportedIntegrations(),
      };
    });

    ipc.handle("get-mcp-config", () => {
      const mcpConfig = getMcpConfiguration({
        folderPath: APP_FOLDER_PATH,
        appName: this.mcpAdapter.getAppName(),
      });
      return JSON.stringify(mcpConfig);
    });

    ipc.on("change-workspace-folder", async (payload: any) => {
      const window = device.getWindow();
      const filePath = fileURLToPath(payload.fileURI);
      const result = await dialog.showOpenDialog(window, {
        title: "Select Workspace Folder",
        properties: ["openDirectory"],
        defaultPath: path.dirname(filePath),
      });

      if (result.canceled || result.filePaths.length === 0) {
        return;
      }

      const folder = result.filePaths[0]!;
      device.setWorkspaceFolderPath(folder);
      ipc.notify("workspace-folder-changed", folder);
    });

    ipc.on("toggle-theme", () => {
      this.handleToggleTheme();
    });

    ipc.on("set-native-theme", (payload: any) => {
      nativeTheme.themeSource = payload.theme;
    });

    ipc.on("desktop-open-terminal", () => {
      openTerminal();
    });

    ipc.on("claude-set", ({ loginType, apiKey }: any) => {
      this.agentConfigManager.set("claude", loginType, apiKey);
    });

    ipc.on("codex-set", ({ loginType, apiKey }: any) => {
      this.agentConfigManager.set("codex", loginType, apiKey);
    });

    ipc.on("toggle-mcp-integration", async ({ integration, state }: any) => {
      await this.mcpAdapter.toggleIntegration(integration, state);
      ipc.notify("active-integrations", {
        active: desktopConfig.get("enabledIntegrations"),
        supported: DesktopMCPAdapter.getSupportedIntegrations(),
      });
    });

    ipc.on("show-about", () => {
      app.showAboutPanel();
    });

    ipc.on("initialized", () => {
      this.agentConfigManager.notify();
    });

    await handleExtensionToIDEInstall(ipc);

    this.ipcDeviceManager.addResource(ipc, device);
    this.ipcDeviceManager.updateLastResource(filePath);

    device.on("load-file", async (ev: any) => {
      if (ev.filePath.startsWith("file:")) {
        ev.filePath = fileURLToPath(ev.filePath);
      }
      await this.loadFile(ev.filePath, ev.zoomToFit);
      if (ev.closeCurrent) {
        await this.ipcDeviceManager.removeResource(device.getResourcePath());
      }
    });

    device.on("dirty-changed", async (isDirty: boolean) => {
      ipc.notify("dirty-changed", isDirty);
    });

    device.on("prompt-agent", (prompt: string, modelID: string, files: any) => {
      const loginType = this.agentConfigManager.get().claude.loginType;
      if (loginType === undefined) {
        logger.warn("Cannot prompt agent: Claude login type is not set.");
        return;
      }
      ipc.notify("prompt-agent", {
        prompt,
        modelID: mapCanvasModelsToThirdParty("claude", loginType, modelID),
        files,
      });
    });

    device.on("window-closed", async () => {
      await this.ipcDeviceManager.removeResource(device.getResourcePath());
    });

    device.on("window-fullscreen-changed", (flag: boolean) => {
      ipc.notify("fullscreen-change", flag);
    });

    device.on("window-focused", () => {
      this.ipcDeviceManager.updateLastResource(device.getResourcePath());
    });

    device.on("window-load-finished", async (initial: boolean) => {
      if (!initial) {
        await this.loadFile(device.getResourcePath());
      }
    });

    addRecentFile(filePath);

    if (device.getWindow().webContents.getURL() !== "") {
      ipc.notify("file-update", {
        content: device.getResourceContents(),
        fileURI: device.getResourcePath().startsWith("pencil:")
          ? device.getResourcePath()
          : pathToFileURL(device.getResourcePath()).toString(),
        isDirty: device.getIsDirty(),
        zoomToFit,
      });
    } else {
      await device.loadURL(path.isAbsolute(filePath) ? "" : `${filePath}`);
    }

    const workspaceFolders = desktopConfig.get("workspaceFolders");
    const workspaceFolder = workspaceFolders[filePath];
    if (workspaceFolder) {
      ipc.notify("workspace-folder-changed", workspaceFolder);
    }

    handleUpdaterNotifications(ipc);
  }

  getFocusedWindow() {
    const device = this.ipcDeviceManager.getFocusedResource();
    if (!device) {
      return undefined;
    }
    return device.getWindow();
  }

  async handleLoadFile(filePath: string, zoomToFit: boolean) {
    await this.loadFile(filePath, zoomToFit);
  }

  async handleNewFile() {
    await this.handleLoadFile("pencil-new.pen", true);
  }

  async handleOpenDialog() {
    const device = this.ipcDeviceManager.getFocusedResource();
    if (!device) {
      return;
    }

    const window = device.getWindow();
    const result = await dialog.showOpenDialog(window, {
      title: "Open .pen file",
      filters: [
        { name: "Pencil Design Files", extensions: ["pen"] },
        { name: "All Files", extensions: ["*"] },
      ],
      properties: ["openFile"],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return;
    }

    await this.loadFile(result.filePaths[0]!, true);
  }

  handleToggleTheme() {
    this.ipcDeviceManager.notifyAll("toggle-theme", {});
  }
}

type FileError = {
  filePath: string;
  errorMessage?: string;
};

function addRecentFile(filePath: string) {
  if (!path.isAbsolute(filePath)) {
    return;
  }

  const recentFiles = (desktopConfig.get("recentFiles") as string[] | undefined) ?? [];
  const filtered = recentFiles.filter((f) => f !== filePath);
  const updated = [filePath, ...filtered].slice(0, MAX_RECENT_FILES);

  desktopConfig.set("recentFiles", updated);
  refreshApplicationMenu();
}

function getRecentFiles(): string[] {
  const recentFiles = (desktopConfig.get("recentFiles") as string[] | undefined) ?? [];
  return recentFiles.filter((f) => fs.existsSync(f));
}

function clearRecentFiles() {
  desktopConfig.set("recentFiles", []);
  refreshApplicationMenu();
}

function openTerminal() {
  const platform = os.platform();
  if (platform === "darwin") {
    exec("open -a iTerm", (error) => {
      if (error) {
        exec("open -a Terminal");
      }
    });
  } else if (platform === "win32") {
    exec("start cmd.exe");
  }
}
