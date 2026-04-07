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
export {
  getPencilToolLabels
};
//# sourceMappingURL=util.js.map
