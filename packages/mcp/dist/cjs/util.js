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
var util_exports = {};
__export(util_exports, {
  getMcpBinaryName: () => getMcpBinaryName,
  getMcpConfiguration: () => getMcpConfiguration
});
module.exports = __toCommonJS(util_exports);
var import_node_os = __toESM(require("node:os"));
var import_node_path = __toESM(require("node:path"));
function getMcpBinaryName() {
  const platform = import_node_os.default.platform();
  const arch = import_node_os.default.arch();
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
    command: import_node_path.default.join(folderPath, "out", getMcpBinaryName()),
    args: [
      "--app",
      appName,
      ...conversationId ? ["--conversation_id", conversationId] : [],
      ...enableSpawnAgents ? ["--enable_spawn_agents"] : []
    ],
    env: {}
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMcpBinaryName,
  getMcpConfiguration
});
//# sourceMappingURL=util.js.map
