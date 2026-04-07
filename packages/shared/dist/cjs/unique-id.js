"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueId = createUniqueId;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
// Using 5 length unique IDs means a ~4e-8 probability for collision within 1000
// nodes, which should be sufficient for our use case.
const { randomUUID } = new short_unique_id_1.default({ length: 5 });
/**
 * Generates a unique ID for nodes in .pen documents.
 */
function createUniqueId() {
    return randomUUID();
}
