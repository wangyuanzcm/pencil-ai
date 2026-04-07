import os from "node:os";
import path from "node:path";
function getMcpBinaryName() {
  const platform = os.platform();
  const arch = os.arch();
  let platformSuffix;
  if (platform === "win32") {
    platformSuffix = "-windows-x64.exe";
  } else if (platform === "darwin") {
    if (arch === "arm64") {
      platformSuffix = "-darwin-arm64";
    } else {
      platformSuffix = "-darwin-x64";
    }
  } else if (platform === "linux") {
    if (arch === "arm64") {
      platformSuffix = "-linux-arm64";
    } else {
      platformSuffix = "-linux-x64";
    }
  } else {
    platformSuffix = "";
  }
  return `mcp-server${platformSuffix}`;
}
function getMcpConfiguration({
  folderPath,
  appName,
  conversationId,
  enableSpawnAgents
}) {
  return {
    name: "pencil",
    transport: "stdio",
    command: path.join(folderPath, "out", getMcpBinaryName()),
    args: [
      "--app",
      appName,
      ...conversationId ? ["--conversation_id", conversationId] : [],
      ...enableSpawnAgents ? ["--enable_spawn_agents"] : []
    ],
    env: {}
  };
}
export {
  getMcpBinaryName,
  getMcpConfiguration
};
//# sourceMappingURL=util.js.map
