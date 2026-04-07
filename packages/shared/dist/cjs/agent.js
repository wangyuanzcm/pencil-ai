"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedModels = getSupportedModels;
exports.getDefaultModel = getDefaultModel;
exports.mapCanvasModelsToThirdParty = mapCanvasModelsToThirdParty;
exports.getAgentTypeFromModelID = getAgentTypeFromModelID;
exports.parseToolName = parseToolName;
exports.getDefaultAgentConfig = getDefaultAgentConfig;
function getSupportedModels(agentType, login) {
    if (agentType === "codex") {
        return [
            { displayName: "GPT 5.3 Codex (Best)", id: "gpt-5.3-codex" },
            { displayName: "GPT 5.4", id: "gpt-5.4" },
            { displayName: "GPT 5.4 Mini", id: "gpt-5.4-mini" },
            { displayName: "GPT 5.2 Codex", id: "gpt-5.2-codex" },
            { displayName: "GPT 5.2", id: "gpt-5.2" },
            { displayName: "GPT 5.1 Codex Max", id: "gpt-5.1-codex-max" },
            { displayName: "GPT 5.1 Codex Mini", id: "gpt-5.1-codex-mini" },
        ];
    }
    if (login === "subscription" || login === "api-key") {
        return [
            {
                displayName: "Claude Opus 4.6 (Best)",
                id: "claude-opus-4-6",
                description: "Most capable, higher cost",
            },
            {
                displayName: "Claude Sonnet 4.6",
                id: "claude-sonnet-4-6",
                description: "Fast, balanced performance",
            },
            {
                displayName: "Claude Haiku 4.5",
                id: "claude-haiku-4-5",
                description: "Fastest, lowest cost",
            },
        ];
    }
    else {
        // Third-party logins may have different models available
        return [{ displayName: "Custom Model", id: "custom-model" }];
    }
}
function getDefaultModel(agentType, login) {
    if (agentType === "codex") {
        return "gpt-5.3-codex";
    }
    if (login === "subscription" || login === "api-key") {
        return "claude-opus-4-6";
    }
    else {
        // Third-party logins may have different models available
        return "custom-model";
    }
}
function mapCanvasModelsToThirdParty(agentType, login, canvasModelID) {
    if (!canvasModelID) {
        return getDefaultModel(agentType, login);
    }
    if (agentType === "codex") {
        if (canvasModelID === "claude-4.5-haiku") {
            return "gpt-5.1-codex-mini";
        }
        else if (canvasModelID === "claude-4.5-sonnet") {
            return "gpt-5.3-codex";
        }
        else if (canvasModelID === "claude-4.5-opus") {
            return "gpt-5.3-codex";
        }
        else {
            return canvasModelID;
        }
    }
    if (login === "subscription" || login === "api-key") {
        if (canvasModelID === "claude-4.5-haiku") {
            return "claude-haiku-4-5";
        }
        else if (canvasModelID === "claude-4.5-sonnet") {
            return "claude-sonnet-4-6";
        }
        else if (canvasModelID === "claude-4.5-opus") {
            return "claude-opus-4-6";
        }
        else {
            return canvasModelID;
        }
    }
    else {
        // Third-party logins may have different models available
        return "custom-model";
    }
}
function getAgentTypeFromModelID(modelID) {
    return modelID.startsWith("gpt-") ? "codex" : "claude";
}
function parseToolName(fullName) {
    const parts = fullName.split("__");
    return parts.pop();
}
function getDefaultAgentConfig() {
    const claudeModels = getSupportedModels("claude", "subscription");
    const codexModels = getSupportedModels("codex", "subscription");
    return {
        claude: {
            loginType: "subscription",
            apiKeyStored: false,
            defaultModel: getDefaultModel("claude", "subscription"),
            supportedModels: claudeModels,
        },
        codex: {
            loginType: "subscription",
            apiKeyStored: false,
            defaultModel: getDefaultModel("codex", "subscription"),
            supportedModels: codexModels,
        },
        allSupportedModels: [...claudeModels, ...codexModels],
    };
}
