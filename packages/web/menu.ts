import fs from "node:fs";
import path from "node:path";
import * as Sentry from "@sentry/electron/main";
import {
  app,
  BrowserWindow,
  dialog,
  Menu,
  screen,
  shell,
  type MenuItemConstructorOptions,
} from "electron";
import { desktopConfig } from "./config";
import { IS_DEV, IS_MAC } from "./constants";
import { logger } from "./logger";
import {
  checkForUpdates,
  isUpdateDownloaded,
  quitAndInstallIfUpdateDownloaded,
} from "./updater";

type RecentFilesDeps = {
  getRecentFiles: () => string[];
  openRecentFile: (filePath: string) => Promise<void>;
  clearRecentFiles: () => void;
};

type MenuDeps = {
  ipcDeviceManager: any;
  handleNewFile: () => Promise<void>;
  handleOpenDialog: () => Promise<void>;
  handleToggleTheme: () => void;
  recentFiles: RecentFilesDeps;
};

let menuDependencies: MenuDeps | undefined;

function buildOpenRecentMenuItem(recent: RecentFilesDeps): MenuItemConstructorOptions {
  const files = recent.getRecentFiles();

  const submenu: MenuItemConstructorOptions[] =
    files.length === 0
      ? [{ label: "No Recent Files", enabled: false }]
      : [
          ...files.map((filePath) => ({
            label: path.basename(filePath),
            click: async () => {
              await recent.openRecentFile(filePath);
            },
          })),
          { type: "separator" },
          {
            label: "Clear Menu",
            click: () => {
              recent.clearRecentFiles();
            },
          },
        ];

  return {
    label: "Open Recent",
    submenu,
  };
}

function buildApplicationMenuTemplate(deps: MenuDeps): MenuItemConstructorOptions[] {
  const { ipcDeviceManager, handleNewFile, handleOpenDialog, handleToggleTheme, recentFiles } =
    deps;

  const settingsItem: MenuItemConstructorOptions = {
    label: "Settings…",
    accelerator: "CmdOrCtrl+,",
    click: () => {
      const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
      ipc?.notify("open-settings");
    },
  };

  const viewSubmenu: MenuItemConstructorOptions[] = [
    {
      label: "Show/Hide UI",
      accelerator: "CmdOrCtrl+\\",
      click: () => {
        const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
        ipc?.notify("toggle-ui-visibility");
      },
    },
    { type: "separator" },
    { role: "resetZoom" },
    { role: "zoomIn" },
    { role: "zoomOut" },
    { type: "separator" },
    { role: "togglefullscreen" },
  ];

  if (IS_DEV) {
    viewSubmenu.push({ role: "reload" } as any, { role: "forceReload" } as any, {
      role: "toggleDevTools",
    });
  } else {
    viewSubmenu.push({
      label: "Toggle Developer Tools",
      accelerator: "CmdOrCtrl+Shift+Alt+D",
      visible: false,
      click: () => {
        const { device } = ipcDeviceManager.getFocusedResourceAndIPC();
        if (device) {
          device.getWindow().webContents.toggleDevTools();
        }
      },
    });
  }

  const windowSubmenu: MenuItemConstructorOptions[] = [
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    {
      label: "Toggle Light/Dark Mode",
      click: () => handleToggleTheme(),
    },
    { type: "separator" },
    {
      label: "Organize Windows into Grid",
      click: () => organizeWindowsIntoGrid(),
    },
    { type: "separator" },
  ];

  if (IS_MAC) {
    windowSubmenu.push(
      { type: "separator" },
      { role: "front" },
      { type: "separator" },
      { role: "window" } as any,
    );
  } else {
    windowSubmenu.push({ role: "close" });
  }

  const helpSubmenu: MenuItemConstructorOptions[] = [
    {
      label: "Pencil Documentation",
      click: async () => {
        await shell.openExternal("https://docs.pencil.dev");
      },
    },
    {
      label: "Prompt Gallery && Tips",
      click: async () => {
        await shell.openExternal("https://pencil.dev/prompts");
      },
    },
    {
      label: "Pencil.dev Website",
      click: async () => {
        await shell.openExternal("https://pencil.dev");
      },
    },
    {
      type: "separator",
    },
    {
      label: "Cursor Extension",
      click: async () => {
        await shell.openExternal("cursor:extension/highagency.pencildev");
      },
    },
    {
      label: "VSCode Extension",
      click: async () => {
        await shell.openExternal(
          "https://marketplace.visualstudio.com/items?itemName=highagency.pencildev",
        );
      },
    },
    {
      type: "separator",
    },
    {
      label: "Join Our Discord",
      click: async () => {
        await shell.openExternal("https://discord.gg/Azsk8cnnVp");
      },
    },
  ];

  if (!IS_MAC) {
    helpSubmenu.push(
      { type: "separator" },
      {
        label: isUpdateDownloaded() ? "Restart && Install Update" : "Check for Updates…",
        click: () =>
          isUpdateDownloaded()
            ? quitAndInstallIfUpdateDownloaded({ forceQuitAndInstall: true })
            : handleCheckForUpdates(ipcDeviceManager),
      },
      { type: "separator" },
      { role: "about" },
    );
  }

  const fileSubmenu: MenuItemConstructorOptions[] = [
    {
      label: "New File",
      accelerator: "CmdOrCtrl+N",
      click: async () => {
        return handleNewFile();
      },
    },
    {
      label: "Open…",
      accelerator: "CmdOrCtrl+O",
      click: async () => {
        return handleOpenDialog();
      },
    },
    buildOpenRecentMenuItem(recentFiles),
    {
      type: "separator",
    },
    {
      label: "Import Image/SVG/Figma...",
      click: async () => {
        const { device, ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
        if (device && ipc) {
          return handleImportImages(device.getWindow(), ipc);
        }
      },
    },
    {
      label: "Export Selection to...",
      submenu: [
        {
          label: "PDF",
          click: () => {
            const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
            ipc?.notify("export-selection", { format: "pdf" });
          },
        },
        {
          label: "PNG",
          click: () => {
            const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
            ipc?.notify("export-selection", { format: "png" });
          },
        },
        {
          label: "JPEG",
          click: () => {
            const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
            ipc?.notify("export-selection", { format: "jpeg" });
          },
        },
        {
          label: "WebP",
          click: () => {
            const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
            ipc?.notify("export-selection", { format: "webp" });
          },
        },
      ],
    },
    {
      type: "separator",
    },
    {
      label: "Guide: How to Export Design to Code...",
      click: async () => {
        const { ipc } = ipcDeviceManager.getFocusedResourceAndIPC();
        ipc?.notify("show-code-mcp-dialog");
      },
    },
    {
      label: "Guide: How to Import from Figma...",
      click: async () => {
        const device = ipcDeviceManager.getFocusedResource();
        if (device) {
          return handleImportFigma(device.getWindow());
        }
      },
    },
  ];

  if (process.platform !== "win32") {
    fileSubmenu.push(
      { type: "separator" },
      {
        label: "Install 'pencil' command in PATH",
        click: async () => installPencilToPath(ipcDeviceManager),
      },
    );
  }

  fileSubmenu.push(
    { type: "separator" },
    {
      label: "Save",
      accelerator: "CmdOrCtrl+S",
      click: async () => {
        const { device } = ipcDeviceManager.getFocusedResourceAndIPC();
        if (device) {
          await device.saveResource({ userAction: true });
        }
      },
    },
    {
      label: "Save As…",
      accelerator: "CmdOrCtrl+Shift+S",
      click: async () => {
        const { device } = ipcDeviceManager.getFocusedResourceAndIPC();
        if (device) {
          await device.saveResource({
            userAction: true,
            saveAs: true,
          });
        }
      },
    },
    { type: "separator" },
  );

  if (!IS_MAC) {
    fileSubmenu.push(settingsItem, { type: "separator" });
  }

  fileSubmenu.push({ role: "close" });

  const template: MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: fileSubmenu,
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
        { type: "separator" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: viewSubmenu,
    },
    {
      label: "Window",
      submenu: windowSubmenu,
    },
    {
      role: "help",
      label: "Help",
      submenu: helpSubmenu,
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.name,
      submenu: [
        { role: "about" },
        {
          label: isUpdateDownloaded() ? "Restart && Install Update" : "Check for Updates…",
          click: () =>
            isUpdateDownloaded()
              ? quitAndInstallIfUpdateDownloaded({ forceQuitAndInstall: true })
              : handleCheckForUpdates(ipcDeviceManager),
        },
        { type: "separator" },
        settingsItem,
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });
  }

  return template;
}

export function setupMenu(
  ipcDeviceManager: any,
  handleNewFile: () => Promise<void>,
  handleOpenDialog: () => Promise<void>,
  handleToggleTheme: () => void,
  recentFiles: RecentFilesDeps,
) {
  menuDependencies = {
    ipcDeviceManager,
    handleNewFile,
    handleOpenDialog,
    handleToggleTheme,
    recentFiles,
  };

  const menu = Menu.buildFromTemplate(buildApplicationMenuTemplate(menuDependencies));
  Menu.setApplicationMenu(menu);
}

export function refreshApplicationMenu() {
  if (!menuDependencies) {
    return;
  }

  const menu = Menu.buildFromTemplate(buildApplicationMenuTemplate(menuDependencies));
  Menu.setApplicationMenu(menu);
}

async function handleCheckForUpdates(ipcDeviceManager: any) {
  if (IS_DEV) {
    return;
  }

  try {
    const isUpdateAvailable = await checkForUpdates();
    const device = ipcDeviceManager.getFocusedResource();

    if (isUpdateAvailable) {
      if (!desktopConfig.get("installOnAppQuit")) {
        ipcDeviceManager.notifyAll("desktop-update-available", {});
      }
    } else if (device) {
      dialog.showMessageBox(device.getWindow(), {
        type: "info",
        title: "No Updates Available",
        message: "There are currently no updates available.",
      });
    }
  } catch (error) {
    logger.error("Error checking for updates from menu:", error);
    Sentry.captureException(error);
  }
}

async function handleImportFigma(mainWindow: BrowserWindow) {
  await dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "Import from Figma",
    message: "How to import from Figma",
    detail:
      "1) Copy/Paste: Copy any layer or frame in Figma and paste it onto the canvas in Pencil. Btw: Images are not included.\n\n2) Import .fig file: For a full import including images, export a .fig file from Figma (File > Save local copy) and drag and drop it onto Pencil.\n\nNote: Some advanced graphics features might not yet be supported. Multi-page .fig files are not supported yet (can choose which page to import).",
  });
}

async function handleImportImages(mainWindow: BrowserWindow, ipc: any) {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Import Image, SVG or Figma",
    filters: [
      {
        name: "Images & Figma",
        extensions: ["png", "jpg", "jpeg", "svg", "fig"],
      },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: ["openFile", "multiSelections"],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    ipc?.notify("import-images", { filePaths: result.filePaths });
  }
}

export function organizeWindowsIntoGrid() {
  const windows = BrowserWindow.getAllWindows().filter((w) => !w.isDestroyed());
  if (windows.length === 0) {
    return;
  }

  const focused = BrowserWindow.getFocusedWindow();
  const display = focused
    ? screen.getDisplayNearestPoint(focused.getBounds() as any)
    : screen.getPrimaryDisplay();
  const { x, y, width, height } = display.workArea;

  const n = windows.length;
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const cellWidth = Math.floor(width / cols);
  const cellHeight = Math.floor(height / rows);

  windows.forEach((win, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    win.setBounds({
      x: x + col * cellWidth,
      y: y + row * cellHeight,
      width: cellWidth,
      height: cellHeight,
    });
  });
}

async function installPencilToPath(ipcDeviceManager: any) {
  const exePath = app.getPath("exe");
  const localBinDir = path.join(app.getPath("home"), ".local", "bin");
  const scriptPath = path.join(localBinDir, "pencil");
  const scriptContent = `#!/bin/sh\nexec "${exePath}" "$@"\n`;

  try {
    if (!fs.existsSync(localBinDir)) {
      await fs.promises.mkdir(localBinDir, { recursive: true });
    }

    try {
      await fs.promises.unlink(scriptPath);
    } catch {}

    await fs.promises.writeFile(scriptPath, scriptContent, {
      mode: 0o755,
    });

    const device = ipcDeviceManager.getFocusedResource();
    if (device) {
      dialog.showMessageBox(device.getWindow(), {
        type: "info",
        title: "Command Installed",
        message: "'pencil' command installed successfully.",
        detail: "Make sure ~/.local/bin is in your PATH.",
      });
    }
  } catch (error) {
    const device = ipcDeviceManager.getFocusedResource();
    if (device) {
      dialog.showMessageBox(device.getWindow(), {
        type: "error",
        title: "Installation Failed",
        message: "Failed to install 'pencil' command.",
        detail: String(error),
      });
    }
  }
}
