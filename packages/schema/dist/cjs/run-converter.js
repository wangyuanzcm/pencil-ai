"use strict";
// npx tsx lib/schema/src/run-converter.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const schema_to_ts_1 = require("./schema-to-ts");
const schema_to_validator_1 = require("./schema-to-validator");
const schemaPath = path.join(__dirname, "..", "pen.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const version = schema.properties.version.const;
const configs = ["public", "private"];
for (const config of configs) {
    const typescript = (0, schema_to_ts_1.convertJSONSchemaToTypeScript)(schema, "Document", config);
    const outputPath = path.join(__dirname, `generated-types-${config}.ts`);
    fs.writeFileSync(outputPath, typescript);
    console.log(`${config} output: ${outputPath}`);
}
const typescript = (0, schema_to_validator_1.convertJSONSchemaToValidator)(schema);
const outputPath = path.join(__dirname, `generated-validator.ts`);
fs.writeFileSync(outputPath, typescript);
console.log(`Validator output: ${outputPath}`);
const indexContent = `// Content of this file is generated from "npm run generate"

export * from "./generated-types-private";
export * from "./generated-validator";

export const CURRENT_SCHEMA_VERSION = "${version}";
`;
const indexPath = path.join(__dirname, `index.ts`);
fs.writeFileSync(indexPath, indexContent);
console.log(`Generated index.ts`);
