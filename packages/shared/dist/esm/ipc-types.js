/**
 * Shared types for IPC communication between VSCode extension and webview
 */
export class IPCError extends Error {
    constructor(code, message, stack) {
        super(message);
        this.code = code;
        this.name = "IPCError";
        if (stack) {
            this.stack = stack;
        }
    }
}
