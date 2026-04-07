import fs from "node:fs";
import path from "node:path";
import { activateIntegrations, removeIntegrations, type MCPSetupPlatformAdapter } from "@ha/mcp";
import type { MCPIntegration } from "@ha/shared";
import { app } from "electron";
import { desktopConfig } from "./config";
import { CONFIG_FOLDER } from "./constants";
import { logger } from "./logger";

export class DesktopMCPAdapter implements MCPSetupPlatformAdapter {
  log = logger;

  constructor(private readonly appPath: string) {}

  getInstallationPath(): string {
    return this.appPath;
  }

  getExternalExtensionPath(_extensionId: string): string | undefined {
    return undefined;
  }

  getAppPath(): string {
    return app.getPath("appData");
  }

  getAppName(): string {
    return "desktop";
  }

  static getSupportedIntegrations(): MCPIntegration[] {
    return [
      "claudeCodeCLI",
      "codexCLI",
      "geminiCLI",
      "openCodeCLI",
      "kiroCLI",
      "claudeDesktop",
    ];
  }

  async setupIntegrations(enabledIntegrations?: MCPIntegration[]) {
    const supportedIntegrations = DesktopMCPAdapter.getSupportedIntegrations();

    if (!enabledIntegrations) {
      enabledIntegrations = supportedIntegrations;
    }

    await removeIntegrations(this, supportedIntegrations);
    const activeIntegrations = await activateIntegrations(this, enabledIntegrations);
    desktopConfig.set("enabledIntegrations", activeIntegrations);
  }

  async saveMCPAppInfo(content: string): Promise<boolean> {
    try {
      const filePath = path.join(CONFIG_FOLDER, "apps", this.getAppName());
      if (!fs.existsSync(filePath)) {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      }
      await fs.promises.writeFile(filePath, content, "utf8");
      return true;
    } catch (err) {
      this.log.error(`failed to save MCP host info: ${String(err)}`);
    }
    return false;
  }

  async toggleIntegration(integration: MCPIntegration, state: boolean) {
    const supportedIntegrations = DesktopMCPAdapter.getSupportedIntegrations();
    if (!supportedIntegrations.includes(integration)) {
      logger.warn(`cannot enable unsupported integration: ${integration}`);
      return;
    }

    let enabledIntegrations = desktopConfig.get("enabledIntegrations") as MCPIntegration[];
    if (state) {
      if (!enabledIntegrations.includes(integration)) {
        enabledIntegrations.push(integration);
      }
    } else {
      enabledIntegrations = enabledIntegrations.filter((i) => i !== integration);
    }

    await this.setupIntegrations(enabledIntegrations);
  }
}
