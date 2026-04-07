"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var create_agent_exports = {};
__export(create_agent_exports, {
  createAgent: () => createAgent
});
module.exports = __toCommonJS(create_agent_exports);
var import_claude = require("./claude/index.js");
var import_codex = require("./codex/index.js");
function createAgent(type, config) {
  switch (type) {
    case "claude": {
      return new import_claude.ClaudeAgent(config);
    }
    case "codex": {
      return new import_codex.CodexAgent(config);
    }
    default:
      throw new Error(`Unknown agent type: ${type}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAgent
});
//# sourceMappingURL=create-agent.js.map
