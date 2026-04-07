"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var claude_exports = {};
__export(claude_exports, {
  ClaudeAgent: () => ClaudeAgent
});
module.exports = __toCommonJS(claude_exports);
var path = __toESM(require("node:path"));
var import_claude_agent_sdk = require("@anthropic-ai/claude-agent-sdk");
var import_eventemitter3 = require("eventemitter3");
var import_jsonrepair = require("jsonrepair");
class ClaudeAgent extends import_eventemitter3.EventEmitter {
  config;
  agentQuery = void 0;
  abortController = void 0;
  constructor(config) {
    super();
    this.config = config;
  }
  async execute(prompt, files) {
    const { logger, systemPrompt, sessionId } = this.config;
    this.abortController = new AbortController();
    let queryError;
    try {
      logger.info("Starting Claude Agent");
      if (sessionId) {
        logger.info(`Resuming session: ${sessionId}`);
      }
      if (files && files.length > 0) {
        logger.info(`Processing ${files.length} file attachment(s)`);
      }
      const mcpServers = this.getMcpConfig();
      const disallowedTools = [];
      if (this.config.disallowedTools) {
        for (const toolName of this.config.disallowedTools) {
          disallowedTools.push(`mcp__pencil__${toolName}`);
        }
      }
      const options = {
        model: this.config.model === "custom-model" ? void 0 : this.config.model,
        pathToClaudeCodeExecutable: this.getExecutablePath(),
        // @ts-expect-error
        executable: this.config.execPath,
        env: this.config.env,
        cwd: this.config.cwd,
        stderr: (data) => {
          logger.debug("Agent stderr:", data);
        },
        settingSources: ["local", "project", "user"],
        mcpServers,
        maxTurns: this.config.maxTurns || 500,
        allowedTools: ["mcp__pencil", "WebSearch", "WebFetch"],
        disallowedTools,
        systemPrompt: {
          type: "preset",
          preset: "claude_code",
          append: systemPrompt
        },
        abortController: this.abortController,
        ...this.config.dangerouslySkipPermissions ? {
          allowDangerouslySkipPermissions: true,
          permissionMode: "bypassPermissions"
        } : void 0,
        includePartialMessages: this.config.includePartialMessages,
        canUseTool: async (toolName, input, options2) => {
          logger.info("Claude permission request", toolName, input, options2);
          if (this.config.cwd && input.file_path && isPathInside(input.file_path, this.config.cwd)) {
            return {
              behavior: "allow",
              updatedInput: input
            };
          }
          if (this.config.cwd && options2.blockedPath && isPathInside(options2.blockedPath, this.config.cwd)) {
            return {
              behavior: "allow",
              updatedInput: input
            };
          }
          const result = await new Promise(
            (resolve) => {
              this.emit("permission-request", {
                toolName,
                input,
                resolve
              });
            }
          );
          if (result === "allow") {
            return {
              behavior: "allow",
              updatedInput: input
            };
          }
          if (result === "always-allow") {
            return {
              behavior: "allow",
              updatedInput: input,
              updatedPermissions: options2.suggestions
            };
          }
          return {
            behavior: "deny",
            message: "User denied permission"
          };
        }
      };
      if (sessionId) {
        const sessionFound = (await (0, import_claude_agent_sdk.listSessions)()).find(
          (s) => s.sessionId === sessionId
        );
        if (sessionFound) {
          options.resume = sessionId;
          options.cwd = sessionFound.cwd;
        } else {
          logger.warn(`Cannot resume, session id does not exist: ${sessionId}`);
        }
      }
      const promptContent = await this.buildPromptWithFiles(
        prompt,
        sessionId,
        files
      );
      this.agentQuery = (0, import_claude_agent_sdk.query)({
        prompt: promptContent,
        options
      });
      const batchDesignCalls = /* @__PURE__ */ new Map();
      const spawnAgentCalls = /* @__PURE__ */ new Map();
      const thinkingMessages = /* @__PURE__ */ new Map();
      let finalResponse = "";
      for await (const message of this.agentQuery) {
        if (message.type !== "stream_event") {
          logger.debug(`onMessage received: type=${message.type}`);
          if (message.type === "system" && message.subtype === "init" && message.session_id) {
            this.emit("chat-session", {
              sessionId: message.session_id
            });
          }
          if (message.type === "user" && message.message?.content) {
            if (typeof message.message.content !== "string") {
              for (const content of message.message.content) {
                if (content.type === "tool_result" && content.tool_use_id) {
                  logger.debug(`Tool result for ${content.tool_use_id}`);
                  this.emit("chat-tool-result", {
                    toolUseId: content.tool_use_id,
                    toolOutput: content.content,
                    isError: content.is_error || false
                  });
                }
              }
            }
          }
          if (message.type === "assistant" && message.message?.content) {
            logger.debug(
              `Assistant message with ${message.message.content.length} content items`
            );
            for (const content of message.message.content) {
              if (content.type === "tool_use" && content.name) {
                this.emit("chat-tool-use", {
                  toolName: content.name,
                  toolInput: content.input,
                  toolUseId: content.id
                });
              }
            }
            this.emit("chat-agent-message", {
              content: message.message.content
            });
          }
        }
        if (message.type === "system" && message.subtype === "init") {
          logger.debug("Session initialized:", message.session_id);
        }
        if (message.type === "stream_event") {
          if (message.event.type === "content_block_start" && message.event.content_block.type === "tool_use" && message.event.content_block.name === "mcp__pencil__batch_design") {
            batchDesignCalls.set(message.event.index, {
              operations: [],
              acc: "",
              id: message.event.content_block.id
            });
            this.emit("tool-use-start", {
              name: message.event.content_block.name,
              id: message.event.content_block.id
            });
          }
          if (message.event.type === "content_block_start" && message.event.content_block.type === "tool_use" && message.event.content_block.name === "mcp__pencil__spawn_agents") {
            spawnAgentCalls.set(message.event.index, {
              agentsConfig: [],
              acc: "",
              id: message.event.content_block.id,
              index: 0
            });
            this.emit("tool-use-start", {
              name: message.event.content_block.name,
              id: message.event.content_block.id
            });
          }
          if (message.event.type === "content_block_start" && message.event.content_block.type === "text") {
            thinkingMessages.set(message.event.index, {
              acc: message.event.content_block.text
            });
          }
          if (message.event.type === "content_block_stop") {
            const call = spawnAgentCalls.get(message.event.index);
            if (!call) {
              continue;
            }
            const newConfigs = call.agentsConfig.slice(
              call.index,
              call.agentsConfig.length
            );
            this.emit("spawn-agents", {
              filePath: call.filePath,
              agentsConfig: newConfigs,
              id: call.id,
              partial: true
            });
            spawnAgentCalls.delete(message.event.index);
          }
          if (message.event.type === "content_block_stop") {
            batchDesignCalls.delete(message.event.index);
            thinkingMessages.delete(message.event.index);
          }
          if (message.event.type === "content_block_delta" && message.event.delta.type === "input_json_delta" && batchDesignCalls.has(message.event.index)) {
            const call = batchDesignCalls.get(message.event.index);
            if (!call) {
              continue;
            }
            call.acc += message.event.delta.partial_json;
            const parsed = completePartialBatchDesign(call.acc);
            if (parsed?.operations && parsed.operations.length > call.operations.length) {
              const newOperations = [];
              for (let i = call.operations.length; i < parsed.operations.length; ++i) {
                newOperations.push(parsed.operations[i]);
              }
              call.filePath = parsed.filePath;
              call.operations = parsed.operations;
              const newEvent = {
                filePath: parsed.filePath,
                operations: newOperations.join("\n"),
                id: call.id,
                partial: true
              };
              this.emit("batch-design", newEvent);
            }
          }
          if (message.event.type === "content_block_delta" && message.event.delta.type === "input_json_delta" && spawnAgentCalls.has(message.event.index)) {
            const call = spawnAgentCalls.get(message.event.index);
            if (!call) {
              continue;
            }
            call.acc += message.event.delta.partial_json;
            const parsed = completePartialSpawnAgents(call.acc);
            if (parsed?.config) {
              const newConfigs = [];
              for (let i = call.agentsConfig.length; i < parsed.config.length; ++i) {
                newConfigs.push(parsed.config[i]);
              }
              call.filePath = parsed.filePath;
              call.agentsConfig = parsed?.config;
              if (call.agentsConfig.length > call.index + 1) {
                const newConfigs2 = call.agentsConfig.slice(
                  call.index,
                  call.agentsConfig.length - 1
                );
                call.index += newConfigs2.length;
                this.emit("spawn-agents", {
                  filePath: parsed.filePath,
                  agentsConfig: newConfigs2,
                  id: call.id,
                  partial: true
                });
              }
            }
          }
          if (message.event.type === "content_block_delta" && message.event.delta.type === "text_delta") {
            const thinkingMessage = thinkingMessages.get(message.event.index);
            if (!thinkingMessage) {
              continue;
            }
            thinkingMessage.acc += message.event.delta.text;
            const agentThinking = Array.from(thinkingMessages.values()).map((m) => m.acc).join("\n\n");
            this.emit("thinking-update", { text: agentThinking });
          }
        }
        if (message.type === "assistant" && message.message.type === "message") {
          logger.debug(
            "Agent message:",
            JSON.stringify(message.message.content, null, 2)
          );
          queryError = message.error;
          for (const content of message.message.content) {
            if (content.type === "text") {
              finalResponse = content.text;
            }
          }
        }
      }
      this.emit("completed", { response: finalResponse, error: queryError });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error executing Claude Agent:", errorMessage);
      this.emit("failed", { message: errorMessage, error: queryError });
    } finally {
      this.agentQuery = void 0;
      this.abortController = void 0;
    }
  }
  async stop() {
    if (this.agentQuery) {
      this.config.logger.info("Stopping Claude Agent");
      try {
        this.abortController?.abort();
        this.config.logger.info("Agent stopped successfully");
      } catch (error) {
        this.config.logger.error("Error stopping agent:", error);
      }
      this.emit("stopped");
      this.agentQuery = void 0;
      this.abortController = void 0;
    }
  }
  isRunning() {
    return this.agentQuery !== void 0;
  }
  getConfig() {
    return Object.freeze({ ...this.config });
  }
  destroy() {
    const { logger } = this.config;
    logger.debug("destroy()");
    this.removeAllListeners();
  }
  getMcpConfig() {
    const mcpServers = {};
    if (!this.config.mcpServers) {
      return mcpServers;
    }
    for (const server of this.config.mcpServers) {
      if (server.transport === "stdio") {
        mcpServers[server.name] = {
          command: server.command,
          args: server.args,
          env: server.env
        };
      }
    }
    return mcpServers;
  }
  async buildPromptWithFiles(prompt, sessionId, files) {
    if (!files || files.length === 0) {
      return prompt;
    }
    const params = files.map((f) => {
      if (f.type === "image") {
        return { type: "image", source: f.source };
      } else if (f.type === "text") {
        return { type: "text", text: f.content };
      }
      return void 0;
    }).filter(Boolean);
    const userMessage = {
      type: "user",
      message: {
        role: "user",
        content: [...params, { text: prompt, type: "text" }]
      },
      session_id: sessionId ?? "",
      parent_tool_use_id: null
    };
    return async function* () {
      yield userMessage;
    }();
  }
  getExecutablePath() {
    return this.config.packagePath ? path.join(this.config.packagePath, "cli.js") : void 0;
  }
}
function completePartialBatchDesign(str) {
  try {
    let res = str.slice(0);
    res = (0, import_jsonrepair.jsonrepair)(res);
    const parsed = JSON.parse(res);
    if (parsed.operations) {
      parsed.operations = parsed.operations.split("\n").filter((op) => op.endsWith(")"));
    }
    return parsed;
  } catch (_err) {
    return void 0;
  }
}
function completePartialSpawnAgents(str) {
  try {
    let res = str.slice(0);
    res = (0, import_jsonrepair.jsonrepair)(res);
    const parsed = JSON.parse(res);
    if (parsed.config && !Array.isArray(parsed.config)) {
      return void 0;
    }
    return parsed;
  } catch (_err) {
    return void 0;
  }
}
function isPathInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClaudeAgent
});
//# sourceMappingURL=index.js.map
