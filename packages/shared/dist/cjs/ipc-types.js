"use strict";
/**
 * Shared types for IPC communication between VSCode extension and webview
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCError = void 0;
class IPCError extends Error {
    constructor(code, message, stack) {
        super(message);
        this.code = code;
        this.name = "IPCError";
        if (stack) {
            this.stack = stack;
        }
    }
}
exports.IPCError = IPCError;
