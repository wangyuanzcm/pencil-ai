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
var util_exports = {};
__export(util_exports, {
  getPencilToolLabels: () => getPencilToolLabels
});
module.exports = __toCommonJS(util_exports);
const PENCIL_TOOLS = {
  batch_design: "Crafting design...",
  find_empty_space_on_canvas: "Finding available space...",
  get_guidelines: "Loading guidelines...",
  get_screenshot: "Analyzing screenshot...",
  get_editor_state: "Checking current state...",
  get_variables: "Checking variables...",
  set_variables: "Updating variables...",
  replace_all_matching_properties: "Updating matching properties...",
  search_all_unique_properties: "Analyzing properties...",
  batch_get: "Reading...",
  snapshot_layout: "Analyzing layout...",
  update_properties: "Updating properties...",
  spawn_agents: "Splitting work..."
};
function addPrefix(tools, prefix) {
  const result = {};
  for (const [key, value] of Object.entries(tools)) {
    result[`${prefix}${key}`] = value;
  }
  return result;
}
const PENCIL_TOOL_LABELS_CLAUDE = addPrefix(
  PENCIL_TOOLS,
  "mcp__pencil__"
);
const PENCIL_TOOL_LABELS_CODEX = addPrefix(
  PENCIL_TOOLS,
  "pencil__"
);
function getPencilToolLabels(format = "claude") {
  return format === "codex" ? PENCIL_TOOL_LABELS_CODEX : PENCIL_TOOL_LABELS_CLAUDE;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPencilToolLabels
});
//# sourceMappingURL=util.js.map
