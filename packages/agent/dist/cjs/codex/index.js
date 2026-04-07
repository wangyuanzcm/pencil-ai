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
var codex_exports = {};
__export(codex_exports, {
  CodexAgent: () => CodexAgent
});
module.exports = __toCommonJS(codex_exports);
var os = __toESM(require("node:os"));
var path = __toESM(require("node:path"));
var import_eventemitter3 = require("eventemitter3");
class CodexAgent extends import_eventemitter3.EventEmitter {
  config;
  thread = void 0;
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
      logger.info("Starting Codex Agent");
      if (sessionId) {
        logger.info(`Resuming session: ${sessionId}`);
      }
      if (files && files.length > 0) {
        logger.info(`Processing ${files.length} file attachment(s)`);
      }
      const { Codex } = await import("@openai/codex-sdk");
      const mcpTransport = this.getMcpConfig();
      const codex = new Codex({
        codexPathOverride: this.getExecutablePath(),
        apiKey: this.config.apiKey,
        config: {
          ...systemPrompt ? { developer_instructions: systemPrompt } : void 0,
          mcp_servers: {
            pencil: {
              ...mcpTransport ?? void 0,
              disabled_tools: this.config.disallowedTools ?? []
            }
          }
        }
      });
      const threadOptions = {
        model: this.config.model,
        skipGitRepoCheck: true,
        workingDirectory: this.config.cwd,
        webSearchEnabled: true,
        sandboxMode: this.config.dangerouslySkipPermissions ? "danger-full-access" : "workspace-write",
        modelReasoningEffort: "low",
        ...this.config.dangerouslySkipPermissions ? { approvalPolicy: "never" } : void 0
      };
      this.thread = sessionId ? codex.resumeThread(sessionId, threadOptions) : codex.startThread(threadOptions);
      const promptContent = await this.buildPromptWithFiles(prompt, files);
      const { events } = await this.thread.runStreamed(promptContent, {
        signal: this.abortController.signal
      });
      let finalResponse = "";
      for await (const event of events) {
        logger.info(event);
        switch (event.type) {
          case "thread.started":
            this.emit("chat-session", {
              sessionId: event.thread_id
            });
            break;
          case "turn.failed":
            logger.error("Codex agent turn failed:", queryError);
            break;
          case "error":
            queryError = event.message;
            logger.error("Codex agent error:", queryError);
            break;
          case "turn.completed":
            logger.info("Codex agent usage:", event.usage);
            break;
          case "item.started": {
            const item = event.item;
            switch (item.type) {
              case "mcp_tool_call":
                this.emit("chat-tool-use", {
                  toolName: item.tool,
                  toolInput: item.arguments,
                  toolUseId: item.id
                });
                break;
              case "agent_message":
                this.emit("chat-agent-message", {
                  content: [
                    {
                      type: "text",
                      text: item.text
                    }
                  ]
                });
                break;
              case "todo_list":
                this.emit("chat-tool-use", {
                  toolUseId: item.id,
                  toolInput: {
                    todos: item.items.map((i, ix) => {
                      return {
                        id: `${item.id}-${ix}`,
                        content: i.text,
                        status: i.completed ? "completed" : "pending"
                      };
                    })
                  },
                  toolName: "todo_write"
                });
                break;
              case "command_execution":
                this.emit("chat-tool-use", {
                  toolUseId: item.id,
                  toolInput: {
                    command: item.command
                  },
                  toolName: "Bash"
                });
                break;
              case "web_search":
                this.emit("chat-tool-use", {
                  toolUseId: item.id,
                  toolInput: item.action,
                  toolName: "WebSearch"
                });
                break;
              default:
                break;
            }
            break;
          }
          case "item.updated": {
            const item = event.item;
            if (item.type === "todo_list") {
              this.emit("chat-tool-use", {
                toolUseId: item.id,
                toolInput: {
                  todos: item.items.map((i, ix) => {
                    return {
                      id: `${item.id}-${ix}`,
                      content: i.text,
                      status: i.completed ? "completed" : "pending"
                    };
                  })
                },
                toolName: "todo_write"
              });
            }
            break;
          }
          case "item.completed": {
            const item = event.item;
            if (item.type === "agent_message") {
              finalResponse = item.text;
            }
            switch (item.type) {
              case "agent_message":
                this.emit("chat-agent-message", {
                  content: [
                    {
                      type: "text",
                      text: item.text
                    }
                  ]
                });
                break;
              case "reasoning":
                this.emit("chat-agent-message", {
                  content: [
                    {
                      type: "text",
                      text: item.text
                    }
                  ]
                });
                break;
              case "mcp_tool_call":
                this.emit("chat-tool-result", {
                  toolUseId: item.id,
                  toolOutput: item.status === "failed" ? item.error?.message : item.result?.content,
                  isError: item.status === "failed"
                });
                break;
              case "todo_list":
                this.emit("chat-tool-use", {
                  toolUseId: item.id,
                  toolInput: {
                    todos: item.items.map((i, ix) => {
                      return {
                        id: `${item.id}-${ix}`,
                        content: i.text,
                        status: i.completed ? "completed" : "pending"
                      };
                    })
                  },
                  toolName: "todo_write"
                });
                break;
              case "command_execution":
                this.emit("chat-tool-result", {
                  toolUseId: item.id,
                  toolOutput: item.aggregated_output,
                  isError: item.status === "failed"
                });
                break;
              case "file_change":
                this.emit("chat-tool-use", {
                  toolUseId: item.id,
                  toolInput: {
                    changes: item.changes,
                    status: item.status
                  },
                  toolName: "Update"
                });
                this.emit("chat-tool-result", {
                  toolUseId: item.id,
                  toolOutput: item.status,
                  isError: item.status === "failed"
                });
                break;
              case "web_search":
                this.emit("chat-tool-result", {
                  toolUseId: item.id,
                  toolOutput: item.action,
                  isError: false
                });
                break;
              default:
                break;
            }
            break;
          }
          default:
            break;
        }
      }
      this.emit("completed", { response: finalResponse, error: queryError });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error executing Codex Agent:", errorMessage);
      this.emit("failed", { message: errorMessage, error: queryError });
    } finally {
      this.thread = void 0;
      this.abortController = void 0;
    }
  }
  async stop() {
    if (this.thread) {
      this.config.logger.info("Stopping Codex Agent");
      try {
        this.abortController?.abort();
        this.config.logger.info("Agent stopped successfully");
      } catch (error) {
        this.config.logger.error("Error stopping agent:", error);
      }
      this.emit("stopped");
      this.thread = void 0;
      this.abortController = void 0;
    }
  }
  isRunning() {
    return this.thread !== void 0;
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
    if (!this.config.mcpServers) {
      return void 0;
    }
    for (const server of this.config.mcpServers) {
      if (server.transport === "stdio") {
        return {
          command: server.command,
          args: server.args,
          env: server.env
        };
      }
    }
    return void 0;
  }
  async buildPromptWithFiles(prompt, files) {
    if (!files || files.length === 0) {
      return prompt;
    }
    const inputs = [
      {
        type: "text",
        text: prompt
      }
    ];
    for (const file of files) {
      if (file.type === "text") {
        inputs.push({
          type: "text",
          text: file.content
        });
      } else if (file.type === "image" && file.path) {
        inputs.push({
          type: "local_image",
          path: file.path
        });
      }
    }
    return inputs;
  }
  getExecutablePath() {
    if (!this.config.packagePath) {
      return void 0;
    }
    const arch = os.arch() === "arm64" ? "aarch64" : "x86_64";
    const codexBinaryName = process.platform === "win32" ? "codex.exe" : "codex";
    const plat = os.platform() === "darwin" ? "apple-darwin" : os.platform() === "win32" ? "pc-windows-msvc" : "unknown-linux-musl";
    return path.join(
      this.config.packagePath,
      "vendor",
      `${arch}-${plat}`,
      "codex",
      codexBinaryName
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodexAgent
});
//# sourceMappingURL=index.js.map
