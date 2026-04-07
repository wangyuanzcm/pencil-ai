#!/usr/bin/env node
import { spawn } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { getMcpBinaryName } from "@ha/mcp";
let __filename;
let __dirname;
try {
  __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch {
  __filename = globalThis.__filename;
  __dirname = globalThis.__dirname;
}
console.log("Current working directory (Runner):");
console.log(process.cwd());
const logger = {
  setLevel: () => {
  },
  setEnabled: () => {
  },
  info: (...args) => console.log("[INFO]", ...args),
  warn: (...args) => console.warn("[WARN]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
  debug: (...args) => console.log("[DEBUG]", ...args)
};
function parseArgs() {
  const args = process.argv.slice(2);
  let agentType = "claude";
  let prompt = "";
  let filePath;
  let wsUrl;
  let wsPort = 50501;
  let mcpServerPath;
  let model;
  let systemPrompt;
  let apiKey;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--agent-type" && i + 1 < args.length) {
      agentType = args[i + 1];
    } else if (args[i] === "--prompt" && i + 1 < args.length) {
      prompt = args[i + 1];
    } else if (args[i] === "--file-path" && i + 1 < args.length) {
      filePath = args[i + 1];
    } else if (args[i] === "--ws-url" && i + 1 < args.length) {
      wsUrl = args[i + 1];
    } else if (args[i] === "--ws-port" && i + 1 < args.length) {
      wsPort = parseInt(args[i + 1], 10);
    } else if (args[i] === "--mcp-server-path" && i + 1 < args.length) {
      mcpServerPath = args[i + 1];
    } else if (args[i] === "--model" && i + 1 < args.length) {
      model = args[i + 1];
    } else if (args[i] === "--system-prompt" && i + 1 < args.length) {
      systemPrompt = args[i + 1];
    } else if (args[i] === "--api-key" && i + 1 < args.length) {
      apiKey = args[i + 1];
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
Standalone Agent Runner

Usage:
  agent-runner [options]

Required:
  --agent-type <type>       Agent type: claude, codex
  --prompt <text>           Prompt for the agent

Optional:
  --file-path <path>        Path to .pen file (if omitted, uses process.cwd()/tmp)
  --ws-url <url>            WebSocket server URL (default: ws://localhost:50501)
  --ws-port <number>        WebSocket server port (default: 50501)
  --mcp-server-path <path>  Path to MCP server binary (auto-detected if omitted)
  --model <model>           Model to use
  --system-prompt <text>    System prompt
  --api-key <key>           API key
  --help, -h                Show this help message

Examples:
  # Claude agent
  agent-runner --agent-type claude \\
    --prompt "Create a blue button" --file-path design.pen

  # Codex agent
  agent-runner --agent-type codex \\
    --prompt "Create a blue button"
`);
      process.exit(0);
    }
  }
  if (!prompt) {
    logger.error("--prompt is required");
    process.exit(1);
  }
  return {
    agentType,
    prompt,
    filePath,
    wsUrl,
    wsPort,
    mcpServerPath,
    model,
    systemPrompt,
    apiKey
  };
}
function startMcpServer(mcpServerPath, wsPort) {
  logger.info(`Starting MCP server...`);
  const mcpProcess = spawn(mcpServerPath, ["--ws-port", wsPort.toString()]);
  mcpProcess.stdout?.on("data", (data) => {
    logger.debug(`[MCP] ${data.toString().trim()}`);
  });
  mcpProcess.stderr?.on("data", (data) => {
    logger.debug(`[MCP stderr] ${data.toString().trim()}`);
  });
  mcpProcess.on("error", (error) => {
    logger.error(`MCP process error:`, error);
  });
  mcpProcess.on("exit", (code) => {
    logger.info(`MCP process exited with code ${code}`);
  });
  return mcpProcess;
}
async function main() {
  const config = parseArgs();
  try {
    let mcpServerPath = config.mcpServerPath;
    if (!mcpServerPath) {
      const mcpBinaryName = getMcpBinaryName();
      const projectRoot = path.resolve(__dirname, "../../../");
      mcpServerPath = path.join(projectRoot, "servers/mcp", mcpBinaryName);
      logger.info(`Auto-detected MCP server: ${mcpServerPath}`);
    }
    const mcpProcess = startMcpServer(mcpServerPath, config.wsPort);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    logger.info(`Starting ${config.agentType} agent...`);
    logger.info(`Prompt: ${config.prompt}`);
    mcpProcess.kill();
  } catch (error) {
    logger.error("Fatal error:", error);
    process.exit(1);
  }
}
main().catch((error) => {
  logger.error("Unhandled error:", error);
  process.exit(1);
});
//# sourceMappingURL=runner.js.map
