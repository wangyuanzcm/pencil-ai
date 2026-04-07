import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as fsPromise from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import electron, { BrowserWindow, dialog, shell } from "electron";
import EventEmitter from "eventemitter3";
import { getClaudeCodeEnv, getClaudeCodePackagePath, getClaudeExecPath } from "./claude";
import { getCodexPackagePath } from "./codex";
import { desktopConfig } from "./config";
import { CONFIG_FOLDER, EDITOR_PORT, IS_DEV, APP_PROTOCOL } from "./constants";
import { logger } from "./logger";
import { getFilePathForPencilURI } from "./utils";

const sessionFilePath = path.join(CONFIG_FOLDER, `session-desktop${IS_DEV ? "-dev" : ""}.json`);
const legacyLicenseFilePath = path.join(
  CONFIG_FOLDER,
  `license-token${IS_DEV ? "-dev" : ""}.json`,
);

type SaveResourceParams = {
  userAction: boolean;
  saveAs?: boolean;
};

type LoadFileEvent = {
  filePath: string;
  zoomToFit: boolean;
  closeCurrent?: boolean;
};

type FileError = {
  filePath: string;
  errorMessage?: string;
};

type ImportedFileRequest = { fileName: string; fileContents: ArrayBuffer };
type ImportedFileResult = { filePath: string };

function sha1Hex(input: string): string {
  const maybeHash = (crypto as any).hash as undefined | ((alg: string, data: string) => string);
  if (typeof maybeHash === "function") {
    return maybeHash("sha1", input);
  }
  return crypto.createHash("sha1").update(input).digest("hex");
}

export class DesktopResourceDevice extends EventEmitter {
  private readonly id = crypto.randomUUID();
  private readonly window: BrowserWindow;
  private filePath: string;
  private fileContent: string;
  private isDirty = false;
  private ignoreDirtyOnClose = false;
  private initialized = false;
  private hasThrottledBackupSave = false;
  private backupSaveThrottleTimeout: ReturnType<typeof setTimeout> | undefined;
  private temporaryWorkspacePath: string | undefined;

  constructor(
    filePath: string,
    fileContent: string,
    isDirty: boolean,
    private readonly onSave: (pathToSave: string) => Promise<string>,
  ) {
    super();

    this.filePath = filePath;
    this.fileContent = fileContent;
    this.isDirty = isDirty;

    const windowBounds = desktopConfig.get("windowBounds");
    const isMac = process.platform === "darwin";
    const isDark = electron.nativeTheme.shouldUseDarkColors;

    const newWindow = new BrowserWindow({
      width: windowBounds.width,
      height: windowBounds.height,
      x: windowBounds.x,
      y: windowBounds.y,
      frame: !isMac,
      transparent: isMac,
      ...(isMac
        ? {
            titleBarStyle: "hiddenInset",
            vibrancy: "under-window",
            trafficLightPosition: { x: 14, y: 14 },
          }
        : {}),
      ...(!isMac ? { backgroundColor: isDark ? "#2e2d2d" : "#e8e8e8" } : {}),
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    newWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        shell.openExternal(url);
        return { action: "deny" };
      }
      return { action: "allow" };
    });

    newWindow.on("close", async (event) => {
      const isLoggedIn = Boolean(this.getSession()?.token);

      if (!this.ignoreDirtyOnClose && isLoggedIn && this.getIsDirty()) {
        event.preventDefault();
        const cancelled = await this.saveResource({
          userAction: false,
        });
        if (cancelled) {
          return;
        }
        this.ignoreDirtyOnClose = true;
        if (!newWindow?.isDestroyed()) {
          newWindow?.close();
        }
        return;
      }

      this.ignoreDirtyOnClose = false;
    });

    newWindow.on("resized", () => {
      if (newWindow?.isDestroyed()) {
        return;
      }
      const bounds = newWindow?.getBounds();
      if (!bounds) {
        return;
      }
      desktopConfig.set("windowBounds", bounds);
    });

    newWindow.on("closed", async () => {
      this.emit("window-closed");
    });

    newWindow.on("focus", () => {
      this.emit("window-focused");
    });

    newWindow.on("enter-full-screen", () => {
      this.emit("window-fullscreen-changed", true);
    });

    newWindow.on("leave-full-screen", () => {
      this.emit("window-fullscreen-changed", false);
    });

    if (!newWindow.isDestroyed() && !newWindow.webContents.isDestroyed()) {
      newWindow.webContents.on("did-finish-load", async () => {
        if (!this.initialized) {
          this.initialized = true;
        }
        this.emit("window-load-finished", this.initialized);
      });
    }

    this.window = newWindow;
  }

  get backupFilePath(): string | undefined {
    return this.filePath.startsWith("pencil:") ? undefined : backupFilePath(this.filePath);
  }

  getWindow(): BrowserWindow {
    return this.window;
  }

  focusWindow() {
    if (this.window.isDestroyed()) {
      return;
    }
    if (this.window.isMinimized()) {
      this.window.restore();
    }
    this.window.focus();
  }

  getResourcePath(): string {
    return this.filePath;
  }

  getResourceContents(): string {
    return this.fileContent;
  }

  getDeviceId(): string {
    const machineId = os.hostname() + os.platform() + os.arch();
    return crypto.createHash("md5").update(machineId).digest("hex");
  }

  getIsDirty(): boolean {
    return this.isDirty;
  }

  private readSessionFile(): any | undefined {
    try {
      return JSON.parse(fs.readFileSync(sessionFilePath, "utf8"));
    } catch {
      return undefined;
    }
  }

  private writeSessionFile(data: any) {
    try {
      fs.mkdirSync(CONFIG_FOLDER, { recursive: true });
      fs.writeFileSync(sessionFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Failed to write session file:", error);
    }
  }

  getSession(): { email: string; token: string } | undefined {
    const session = this.readSessionFile();
    if (session?.email && session?.token) {
      return {
        email: session.email,
        token: session.token,
      };
    }

    try {
      const legacy = require(legacyLicenseFilePath);
      if (legacy?.email && legacy?.licenseToken) {
        return { email: legacy.email, token: legacy.licenseToken };
      }
    } catch {}

    return undefined;
  }

  setSession(email: string, token: string) {
    const existing = this.readSessionFile();
    this.writeSessionFile({ ...existing, email, token });

    try {
      if (fs.existsSync(legacyLicenseFilePath)) {
        fs.unlinkSync(legacyLicenseFilePath);
      }
    } catch {}
  }

  getLastOnlineAt(): number | undefined {
    return this.readSessionFile()?.lastOnlineAt;
  }

  setLastOnlineAt(timestamp: number) {
    const existing = this.readSessionFile();
    if (existing) {
      this.writeSessionFile({ ...existing, lastOnlineAt: timestamp });
    }
  }

  async readFile(filePath: string): Promise<Uint8Array> {
    if (filePath.startsWith("pencil:")) {
      filePath = getFilePathForPencilURI(filePath);
    }

    const data = await fs.promises.readFile(
      path.isAbsolute(filePath) ? filePath : path.join(await this.getResourceFolderPath(), filePath),
    );
    return new Uint8Array(data);
  }

  async ensureDir(dirPath: string) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  async writeFile(filePath: string, contents: string | Buffer) {
    fs.writeFileSync(filePath, contents);
  }

  async saveResource(params: SaveResourceParams): Promise<boolean> {
    let shouldSave = true;

    if (this.isDirty && !params.userAction) {
      const response = await dialog.showMessageBox(this.window, {
        type: "warning",
        message: `Do you want to save the changes you made to ${this.getResourcePath()}?`,
        buttons: ["Save", "Don't Save", "Cancel"],
        detail: "Your changes will be lost if you don't save them.",
      });

      if (response.response === 1) {
        shouldSave = false;
      }

      if (response.response === 2) {
        return true;
      }
    }

    if (this.backupSaveThrottleTimeout) {
      clearTimeout(this.backupSaveThrottleTimeout);
      this.backupSaveThrottleTimeout = undefined;
      this.hasThrottledBackupSave = false;
    }

    const backupPath = this.backupFilePath;
    if (backupPath) {
      try {
        if (fs.existsSync(backupPath)) {
          fs.unlinkSync(backupPath);
        }
      } catch (e) {
        logger.warn(`Failed to remove backup ${backupPath}`, e as any);
      }
    }

    if (!shouldSave) {
      return false;
    }

    let filePathToSave: string | undefined;
    if (!this.isTemporary()) {
      if (params.saveAs || this.filePath.startsWith("pencil:")) {
        const response = await dialog.showSaveDialog(this.window, {
          title: "Save .pen file as…",
          filters: [
            { name: "Pencil Design Files", extensions: ["pen"] },
            { name: "All Files", extensions: ["*"] },
          ],
          defaultPath: trimPrefix(this.filePath, "pencil:"),
        });
        if (response.canceled) {
          return true;
        }
        filePathToSave = response.filePath;
      } else {
        filePathToSave = this.filePath;
      }
    } else {
      const response = await dialog.showSaveDialog(this.window, {
        title: "Save new .pen file",
        defaultPath: "untitled.pen",
      });
      if (response.canceled) {
        return true;
      }

      const srcImages = path.join(await this.getResourceFolderPath(), "images");
      if (fs.existsSync(srcImages)) {
        const dstImages = path.join(path.dirname(response.filePath!), "images");
        fs.cpSync(srcImages, dstImages, { recursive: true });
        try {
          fs.rmSync(srcImages, {
            recursive: true,
            force: true,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (errorMessage.toUpperCase().includes("ENOTEMPTY")) {
            const files: string[] = [];
            fs.readdirSync(srcImages).forEach((file) => {
              files.push(file);
            });

            try {
              fs.rmSync(srcImages, {
                recursive: true,
                force: true,
                maxRetries: 2,
                retryDelay: 100,
              });
            } catch (e) {
              throw e;
            } finally {
              throw new Error(`${errorMessage}\n${files.join("\n")}`);
            }
          }
          throw error;
        }
      }

      filePathToSave = response.filePath;
    }

    try {
      this.fileContent = await this.onSave(filePathToSave!);
    } catch (e) {
      logger.error(`Failed to save ${filePathToSave}`, e as any);
      return false;
    }

    fs.writeFileSync(filePathToSave!, this.fileContent, "utf8");

    if (this.isTemporary() || params.saveAs) {
      const workspacePath = await this.getWorkspaceFolderPath();
      if (workspacePath) {
        desktopConfig.set("workspaceFolders", {
          ...desktopConfig.get("workspaceFolders"),
          [filePathToSave!]: workspacePath,
        });
      }
      if (params.userAction) {
        this.emit("load-file", {
          filePath: filePathToSave!,
          zoomToFit: false,
          closeCurrent: true,
        } satisfies LoadFileEvent);
      }
    }

    if (this.isDirty) {
      this.emit("dirty-changed", false);
      this.isDirty = false;
    }

    return false;
  }

  loadFile(filePath: string) {
    this.emit("load-file", { filePath, zoomToFit: true } satisfies LoadFileEvent);
  }

  fileChanged() {
    if (!this.isDirty) {
      this.emit("dirty-changed", true);
      this.isDirty = true;
    }
    this.saveBackup();
  }

  private async saveBackup() {
    if (this.isTemporary() || !this.backupFilePath) {
      return;
    }

    if (this.backupSaveThrottleTimeout) {
      this.hasThrottledBackupSave = true;
    } else {
      const backupPath = this.backupFilePath;
      await fs.promises.mkdir(path.dirname(backupPath), {
        recursive: true,
      });
      try {
        await fs.promises.writeFile(backupPath, await this.onSave(this.filePath));
        logger.info("Saved backup to ", backupPath);
      } catch (e) {
        logger.error(`Failed to save backup ${backupPath}`, e as any);
      }
      this.backupSaveThrottleTimeout = setTimeout(() => {
        this.backupSaveThrottleTimeout = undefined;
        if (this.hasThrottledBackupSave) {
          this.hasThrottledBackupSave = false;
          this.saveBackup();
        }
      }, 5000);
    }
  }

  async importFiles(files: ImportedFileRequest[]): Promise<(ImportedFileResult | undefined)[]> {
    const baseDirectory = await this.getResourceFolderPath();
    let imagesDirectory = baseDirectory;

    if (this.isTemporary()) {
      imagesDirectory = path.join(imagesDirectory, "images");
      await fs.promises.mkdir(imagesDirectory, { recursive: true });
    }

    const result = new Array(files.length).fill(undefined) as (ImportedFileResult | undefined)[];

    for (let i = 0; i < files.length; i++) {
      const { fileName, fileContents } = files[i]!;
      const ext = path.extname(fileName);
      const base = path.basename(fileName, ext);
      const buffer = Buffer.from(fileContents);
      let candidate = path.join(imagesDirectory, `${base}${ext}`);
      let counter = 0;

      for (;;) {
        try {
          await fs.promises.writeFile(candidate, buffer, { flag: "wx" });
          result[i] = { filePath: path.relative(baseDirectory, candidate) };
          break;
        } catch (e: any) {
          if (e.code !== "EEXIST") {
            throw e;
          }
        }

        try {
          const existing = await fs.promises.readFile(candidate);
          if (existing.equals(buffer)) {
            result[i] = { filePath: path.relative(baseDirectory, candidate) };
            break;
          }
        } catch (e: any) {
          if (e.code === "ENOENT" || e.code === "EISDIR") {
            continue;
          }
          throw e;
        }

        counter++;
        candidate = path.join(imagesDirectory, `${base}-${counter}${ext}`);
      }
    }

    return result;
  }

  async importFileByName(fileName: string, fileContents: ArrayBuffer): Promise<ImportedFileResult> {
    const imported = await this.importFiles([{ fileName, fileContents }]);
    const file = imported[0];
    if (!file) {
      throw new Error("Failed to import file");
    }
    return file;
  }

  async importFileByUri(fileUriString: string): Promise<{ filePath: string; fileContents: ArrayBuffer }> {
    const sourceFile = fileURLToPath(fileUriString);
    const fileName = path.basename(sourceFile);
    const fileContents = fs.readFileSync(sourceFile);
    const result = await this.importFileByName(fileName, fileContents.buffer);
    return {
      filePath: result.filePath,
      fileContents: fileContents.buffer,
    };
  }

  async openDocument(type: string) {
    logger.info("openDocument", type);
    const filePath = type.endsWith(".pen") ? type : `pencil-${type}.pen`;
    this.emit("load-file", { filePath, zoomToFit: true } satisfies LoadFileEvent);
  }

  getActiveThemeKind(): "dark" | "light" {
    return electron.nativeTheme.shouldUseDarkColors ? "dark" : "light";
  }

  async submitPrompt(prompt: string, modelID: string, _selectedIDs: string[], files?: any) {
    logger.info("submitPrompt", prompt, modelID);
    this.emit("prompt-agent", prompt, modelID, files);
  }

  async loadURL(fileToLoad: string) {
    logger.info("[DesktopResourceDevice] loadURL() | fileToLoad:", fileToLoad);
    if (IS_DEV) {
      return this.window.webContents.loadURL(`http://localhost:${EDITOR_PORT}/#/editor/${fileToLoad}`);
    }
    return this.window.webContents.loadURL(`${APP_PROTOCOL}://editor/#/editor/${fileToLoad}`);
  }

  toggleDesignMode() {
    logger.info("toggleDesignMode not implemented for desktop");
  }

  setLeftSidebarVisible(visible: boolean) {
    logger.info("setLeftSidebarVisible not implemented for desktop", visible);
  }

  signOut() {
    for (const filePath of [sessionFilePath, legacyLicenseFilePath]) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch {}
    }
  }

  openExternalUrl(url: string) {
    shell.openExternal(url);
  }

  getAgentPackagePath(type: "codex" | "claude"): string | undefined {
    return type === "codex" ? getCodexPackagePath() : getClaudeCodePackagePath();
  }

  getAgentApiKey(type: "codex" | "claude"): string | undefined {
    return type === "codex"
      ? desktopConfig.get("codexLoginType") === "api-key"
        ? desktopConfig.get("codexApiKey")
        : undefined
      : desktopConfig.get("claudeLoginType") === "api-key"
        ? desktopConfig.get("claudeApiKey")
        : undefined;
  }

  execPath(): string | undefined {
    return getClaudeExecPath();
  }

  getAgentEnv(): NodeJS.ProcessEnv {
    return getClaudeCodeEnv();
  }

  agentIncludePartialMessages(): boolean {
    return true;
  }

  isTemporary(): boolean {
    const resource = this.getResourcePath();
    return !path.isAbsolute(resource) && resource.startsWith("pencil-");
  }

  async getResourceFolderPath(): Promise<string> {
    if (!this.isTemporary()) {
      return path.dirname(this.getResourcePath());
    }

    const resourcePath = path.join(CONFIG_FOLDER, "resources", this.id);
    fs.mkdirSync(resourcePath, { recursive: true });
    return resourcePath;
  }

  async saveTempFile(base64Data: string, ext: string, name?: string): Promise<string> {
    const tmpDir = path.join(os.tmpdir(), "pencil-clipboard");
    if (!fs.existsSync(tmpDir)) {
      await fs.promises.mkdir(tmpDir, { recursive: true });
    }
    const fileName = name || `clipboard-${Date.now()}.${ext}`;
    const filePath = path.join(tmpDir, fileName);
    await fs.promises.writeFile(filePath, Buffer.from(base64Data, "base64"));
    return filePath;
  }

  async cleanupTempFiles(paths: string[]) {
    for (const p of paths) {
      try {
        if (fs.existsSync(p)) {
          fs.unlinkSync(p);
        }
      } catch (err) {
        logger.warn("failed to clean up temp file", String(err));
      }
    }
  }

  async dispose() {
    this.removeAllListeners();
    if (this.window && !this.window.isDestroyed()) {
      this.window.close();
    }

    if (!this.isTemporary()) {
      return;
    }

    const dir = await this.getResourceFolderPath();
    if (fs.existsSync(dir)) {
      await fs.promises.rm(dir, { recursive: true, force: true });
    }
  }

  async turnIntoLibrary() {
    if (
      this.isTemporary() ||
      this.filePath.startsWith("pencil:") ||
      this.filePath.toLowerCase().endsWith(".lib.pen")
    ) {
      throw new Error(`Can't turn ${this.filePath} into a library`);
    }

    if (await this.saveResource({ userAction: false })) {
      return;
    }

    let counter = 0;
    let newPath: string;
    while (true) {
      newPath = `${this.filePath.slice(0, -".pen".length)}${
        counter === 0 ? "" : `-${counter}`
      }.lib.pen`;
      counter++;

      try {
        await fs.promises.access(newPath, fs.constants.F_OK);
      } catch {
        break;
      }
    }

    await fs.promises.rename(this.filePath, newPath);
    this.emit("load-file", {
      filePath: newPath,
      zoomToFit: false,
      closeCurrent: true,
    } satisfies LoadFileEvent);
  }

  async findLibraries(): Promise<string[]> {
    if (this.filePath.startsWith("pencil:") || !path.isAbsolute(this.filePath)) {
      return [];
    }

    const libraries: string[] = [];
    const ignored = new Set(["node_modules", ".git"]);
    const visited = new Set<string>();

    const collectLibraries = async (_path: string) => {
      let entries: string[] | undefined;
      try {
        let stats = await fsPromise.stat(_path);
        if (stats.isSymbolicLink()) {
          _path = await fsPromise.realpath(_path);
          stats = await fsPromise.stat(_path);
        }

        if (visited.has(_path)) {
          return;
        }
        visited.add(_path);

        if (stats.isDirectory()) {
          entries = await fsPromise.readdir(_path);
        } else {
          if (stats.isFile() && _path.toLowerCase().endsWith(".lib.pen")) {
            libraries.push(_path);
          }
          return;
        }
      } catch (error) {
        logger.error(`Failed to traverse ${_path}`, error as any);
        return;
      }

      for (const entry of entries) {
        if (!ignored.has(entry)) {
          await collectLibraries(path.join(_path, entry));
        }
      }
    };

    await collectLibraries(path.dirname(this.filePath));
    return libraries;
  }

  async browseLibraries(multiple: boolean): Promise<string[] | undefined> {
    const result = await dialog.showOpenDialog(this.window, {
      filters: [{ name: "Pencil Libraries", extensions: ["lib.pen"] }],
      properties: multiple ? ["multiSelections"] : undefined,
    });

    return result.canceled ? undefined : result.filePaths;
  }

  async getWorkspaceFolderPath(): Promise<string | undefined> {
    if (this.isTemporary()) {
      return this.temporaryWorkspacePath;
    }

    const workspaceFolders = desktopConfig.get("workspaceFolders");
    if (workspaceFolders[this.getResourcePath()]) {
      return workspaceFolders[this.getResourcePath()];
    }

    return this.getResourceFolderPath();
  }

  async setWorkspaceFolderPath(workspacePath: string) {
    if (this.isTemporary()) {
      this.temporaryWorkspacePath = workspacePath;
      return;
    }

    desktopConfig.set("workspaceFolders", {
      ...desktopConfig.get("workspaceFolders"),
      [this.getResourcePath()]: workspacePath,
    });
  }
}

function trimPrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value.substring(prefix.length) : value;
}

export function backupFilePath(filePath: string): string {
  return path.join(CONFIG_FOLDER, "backup", `${sha1Hex(filePath)}`);
}
