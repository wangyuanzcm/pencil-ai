"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    constructor() {
        this.config = {
            level: "debug",
            enabled: true,
        };
        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
    }
    setLevel(level) {
        this.config.level = level;
    }
    setEnabled(enabled) {
        this.config.enabled = enabled;
    }
    shouldLog(level) {
        return (this.config.enabled &&
            this.levels[level] >= this.levels[this.config.level]);
    }
    debug(...args) {
        if (this.shouldLog("debug")) {
            console.log("[DEBUG]", ...args);
        }
    }
    info(...args) {
        if (this.shouldLog("info")) {
            console.info("[INFO]", ...args);
        }
    }
    warn(...args) {
        if (this.shouldLog("warn")) {
            console.warn("[WARN]", ...args);
        }
    }
    error(...args) {
        if (this.shouldLog("error")) {
            console.error("[ERROR]", ...args);
        }
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
