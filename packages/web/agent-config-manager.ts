import {
  getDefaultModel,
  getSupportedModels,
  type AgentConfig,
  type AgentType,
  type LoginType,
} from "@ha/shared";
import { desktopConfig } from "./config";
import { logger } from "./logger";

export class AgentConfigManager {
  constructor(private readonly ipcDeviceManager: any) {}

  get(): AgentConfig {
    logger.debug("AgentConfigManager.get()");

    const claudeLogin = desktopConfig.get("claudeLoginType");
    const codexLogin = desktopConfig.get("codexLoginType");

    const claudeModels = getSupportedModels("claude", claudeLogin);
    const codexModels = getSupportedModels("codex", codexLogin);

    return {
      claude: {
        loginType: desktopConfig.get("claudeLoginType") as LoginType,
        apiKeyStored: Boolean(desktopConfig.get("claudeApiKey")),
        defaultModel: getDefaultModel("claude", claudeLogin),
        supportedModels: claudeModels,
      },
      codex: {
        loginType: desktopConfig.get("codexLoginType") as LoginType,
        apiKeyStored: Boolean(desktopConfig.get("codexApiKey")),
        defaultModel: getDefaultModel("codex", codexLogin),
        supportedModels: codexModels,
      },
      allSupportedModels: [...claudeModels, ...codexModels],
    };
  }

  set(agentType: AgentType, loginType: LoginType, apiKey?: string) {
    logger.debug("AgentConfigManager.set()", agentType, loginType, Boolean(apiKey));

    if (agentType === "claude") {
      desktopConfig.set("claudeLoginType", loginType);
      if (apiKey) {
        desktopConfig.set("claudeApiKey", apiKey);
      }
    } else if (agentType === "codex") {
      desktopConfig.set("codexLoginType", loginType);
      if (apiKey) {
        desktopConfig.set("codexApiKey", apiKey);
      }
    }

    this.notify();
  }

  notify() {
    const agentConfig = this.get();
    logger.debug("AgentConfigManager.notify()");
    this.ipcDeviceManager.notifyAll("agent-config-changed", agentConfig);
  }
}
