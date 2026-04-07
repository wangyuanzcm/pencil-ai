import { ClaudeAgent } from "./claude/index.js";
import { CodexAgent } from "./codex/index.js";
function createAgent(type, config) {
  switch (type) {
    case "claude": {
      return new ClaudeAgent(config);
    }
    case "codex": {
      return new CodexAgent(config);
    }
    default:
      throw new Error(`Unknown agent type: ${type}`);
  }
}
export {
  createAgent
};
//# sourceMappingURL=create-agent.js.map
