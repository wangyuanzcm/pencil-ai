"use strict";
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
exports.WebSocketServerManager = void 0;
const crypto = __importStar(require("node:crypto"));
const node_events_1 = require("node:events");
const ws_1 = require("ws");
class WebSocketServerManager extends node_events_1.EventEmitter {
    constructor(logger, preferredPort) {
        super();
        this.logger = logger;
        this.preferredPort = preferredPort;
        this.wsServer = null;
        this.wsPort = 0;
        this.connectedClients = new Map();
    }
    start() {
        if (this.wsServer) {
            this.logger.warn("WebSocket server already running");
            return;
        }
        this.wsServer = new ws_1.WebSocketServer({
            host: "localhost",
            port: this.preferredPort || 0,
        });
        this.wsServer.on("listening", () => {
            const address = this.wsServer?.address();
            if (typeof address === "object" && address) {
                this.wsPort = address.port;
                this.logger.info(`WebSocket server listening on port ${this.wsPort}`);
                this.emit("ready", this.wsPort);
            }
        });
        this.wsServer.on("connection", (ws) => {
            this.handleNewConnection(ws);
        });
        this.wsServer.on("error", (error) => {
            this.logger.error("WebSocket server error:", error);
        });
    }
    handleNewConnection(socket) {
        const clientId = crypto.randomUUID();
        this.logger.info(`New MCP client connected with ID: ${clientId}`);
        // Send client ID to the connecting client
        const customResponse = {
            request_id: "client-id-assignment",
            success: true,
            client_id: clientId,
        };
        socket.send(JSON.stringify(customResponse));
        this.connectedClients.set(clientId, { socket });
        socket.on("message", (data) => {
            try {
                const message = JSON.parse(data.toString());
                this.emit("tool_request", message);
            }
            catch (error) {
                this.logger.error("Invalid WebSocket message:", error);
            }
        });
        socket.on("close", () => {
            this.logger.info(`MCP client disconnected: ${clientId}`);
            this.connectedClients.delete(clientId);
        });
        socket.on("error", (error) => {
            this.logger.error(`WebSocket error for client ${clientId}:`, error);
            this.connectedClients.delete(clientId);
        });
    }
    sendResponse(response) {
        const clientId = response.client_id;
        const client = this.connectedClients.get(clientId);
        if (client && client.socket.readyState === client.socket.OPEN) {
            client.socket.send(JSON.stringify(response));
        }
        else {
            this.logger.warn(`Cannot send message to client ${clientId}: not connected`);
        }
    }
    stop() {
        if (this.wsServer) {
            this.wsServer.close();
            this.wsServer = null;
        }
        this.connectedClients.clear();
    }
    getPort() {
        return this.wsPort;
    }
}
exports.WebSocketServerManager = WebSocketServerManager;
