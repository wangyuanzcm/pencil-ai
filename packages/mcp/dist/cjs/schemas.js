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
var schemas_exports = {};
__export(schemas_exports, {
  toolSchemas: () => toolSchemas
});
module.exports = __toCommonJS(schemas_exports);
var import_batch_design = __toESM(require("./schemas/batch_design.json"));
var import_batch_get = __toESM(require("./schemas/batch_get.json"));
var import_export_nodes = __toESM(require("./schemas/export_nodes.json"));
var import_find_empty_space_on_canvas = __toESM(require("./schemas/find_empty_space_on_canvas.json"));
var import_get_editor_state = __toESM(require("./schemas/get_editor_state.json"));
var import_get_guidelines = __toESM(require("./schemas/get_guidelines.json"));
var import_get_screenshot = __toESM(require("./schemas/get_screenshot.json"));
var import_get_variables = __toESM(require("./schemas/get_variables.json"));
var import_open_document = __toESM(require("./schemas/open_document.json"));
var import_replace_all_matching_properties = __toESM(require("./schemas/replace_all_matching_properties.json"));
var import_search_all_unique_properties = __toESM(require("./schemas/search_all_unique_properties.json"));
var import_set_variables = __toESM(require("./schemas/set_variables.json"));
var import_snapshot_layout = __toESM(require("./schemas/snapshot_layout.json"));
var import_spawn_agents = __toESM(require("./schemas/spawn_agents.json"));
const toolSchemas = {
  batch_design: import_batch_design.default,
  batch_get: import_batch_get.default,
  export_nodes: import_export_nodes.default,
  find_empty_space_on_canvas: import_find_empty_space_on_canvas.default,
  get_editor_state: import_get_editor_state.default,
  get_guidelines: import_get_guidelines.default,
  get_screenshot: import_get_screenshot.default,
  get_variables: import_get_variables.default,
  open_document: import_open_document.default,
  replace_all_matching_properties: import_replace_all_matching_properties.default,
  search_all_unique_properties: import_search_all_unique_properties.default,
  set_variables: import_set_variables.default,
  snapshot_layout: import_snapshot_layout.default,
  spawn_agents: import_spawn_agents.default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toolSchemas
});
//# sourceMappingURL=schemas.js.map
