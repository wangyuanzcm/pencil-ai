import { FileAttachment, PencilAgent } from '@ha/agent';
import { AgentType, ILogger, IPCHost, IPCServer } from '@ha/shared';
import { WebSocketServerManager as WebSocketServerManager$1, ToolRequest } from '@ha/ws-server';

interface ResourceDevice {
    getResourcePath(): string;
    getResourceContents(): string;
    getIsDirty(): boolean;
    getDeviceId(): string;
    getSession(): {
        email: string;
        token: string;
    } | undefined;
    setSession(email: string, token: string): void;
    readFile(filePath: string): Promise<Uint8Array<ArrayBufferLike>>;
    ensureDir(dirPath: string): Promise<void>;
    writeFile(filePath: string, contents: Uint8Array<ArrayBufferLike>): Promise<void>;
    saveResource(params: {
        userAction: boolean;
        saveAs?: boolean;
        destinationPath?: string;
    }): Promise<boolean>;
    submitPrompt(prompt: string, model: string | undefined, selectedIDs?: string[], files?: FileAttachment[]): Promise<void>;
    fileChanged(): void;
    importFiles(files: {
        fileName: string;
        fileContents: ArrayBufferLike;
    }[]): Promise<{
        filePath: string;
    }[]>;
    importFileByName(fileName: string, fileContents: ArrayBufferLike): Promise<{
        filePath: string;
    }>;
    importFileByUri(fileUriString: string): Promise<{
        filePath: string;
        fileContents: ArrayBufferLike;
    }>;
    openDocument(type: string): Promise<void>;
    getActiveThemeKind(): "dark" | "light";
    toggleDesignMode(): void;
    setLeftSidebarVisible(visible: boolean): void;
    getLastOnlineAt(): number | undefined;
    setLastOnlineAt(timestamp: number): void;
    signOut(): void;
    openExternalUrl(url: string): void;
    getAgentPackagePath(type: AgentType): string | undefined;
    execPath(): string | undefined;
    getAgentEnv(): {
        [envVar: string]: string | undefined;
    } | undefined;
    agentIncludePartialMessages(): boolean | undefined;
    isTemporary(): boolean;
    getResourceFolderPath(): Promise<string>;
    dispose(): Promise<void>;
    getAgentApiKey(type: AgentType): string | undefined;
    saveTempFile(base64Data: string, ext: string, name?: string): Promise<string>;
    cleanupTempFiles(paths: string[]): Promise<void>;
    getWorkspaceFolderPath(): Promise<string | undefined>;
    setWorkspaceFolderPath(workspacePath: string): Promise<void>;
    loadFile(filePath: string): void;
    findLibraries(): Promise<string[]>;
    turnIntoLibrary(): Promise<void>;
    browseLibraries(multiple: boolean): Promise<string[] | undefined>;
}

declare class IPCDeviceManager {
    private readonly wsServerManager;
    private readonly logger;
    private readonly appFolderPath;
    private readonly mcpAppName;
    private readonly onOpenDocument?;
    private readonly openDocument?;
    private ipcMap;
    private deviceMap;
    private initializedDocuments;
    private lastFocusedResource;
    private workspaces;
    private requestRouter;
    private pendingDocuments;
    private pencilAgents;
    private deviceConversations;
    constructor(wsServerManager: WebSocketServerManager$1, logger: ILogger, appFolderPath: string, mcpAppName: string, onOpenDocument?: ((filePath: string) => Promise<void>) | undefined, openDocument?: ((filePath: string) => Promise<void>) | undefined);
    setWorkspaces(dirs: string[]): void;
    waitForDocumentReady(filePath: string, timeoutMs?: number): Promise<void>;
    addResource(ipc: IPCHost, device: ResourceDevice): void;
    stopAllAgents(): Promise<void>;
    invokeAgent(obj: {
        prompt: string;
        device: ResourceDevice;
        agentType: AgentType;
        conversationId: string;
        modelID?: string;
        sessionId?: string;
        files?: FileAttachment[];
        disallowedTools?: string[];
        subagent?: boolean;
        agentMultiplier?: number;
        userMessageExtension?: string;
        dangerouslySkipPermissions?: boolean;
    }): Promise<PencilAgent>;
    removeResource(resourcePath: string): Promise<void>;
    notifyAll(event: string, payload: any): void;
    proxyMcpToolCallRequests(): void;
    updateLastResource(lastFocusedResource: string): void;
    getResourceDevice(resourcePath: string): ResourceDevice | undefined;
    getFocusedResource(): ResourceDevice | undefined;
    getFocusedResourceAndIPC(): {
        device: ResourceDevice | undefined;
        ipc: IPCServer | undefined;
    };
    getIPC(resourcePath: string): Promise<IPCServer | undefined>;
}

declare const NEW_DOC_TYPES: string[];

interface OperationResult<T = unknown> {
    success: boolean;
    result?: T;
    error?: string;
}
interface OperationHandler {
    readonly operationName: string;
    handle(request: ToolRequest, context: OperationContext): Promise<OperationResult>;
}
interface OperationContext {
    getIPC(filePath: string): Promise<IPCServer | undefined>;
    getDevice(filePath: string): ResourceDevice | undefined;
    emit(event: string, data: unknown): void;
    getLastFocusedResource(): string | null;
    openDocument?(filePath: string): Promise<void>;
    waitForDocumentReady?(filePath: string, timeoutMs?: number): Promise<void>;
}
interface OperationHandlerFactory {
    createHandler(operationName: string): OperationHandler;
}

interface WebSocketServerManager {
    on(event: string, handler: (req: ToolRequest) => void): void;
    emit(event: string, data: unknown): void;
    sendResponse(response: {
        client_id: string;
        request_id: string;
        success: boolean;
        result?: unknown;
        error?: string;
    }): void;
}
declare class WebSocketRequestRouter {
    private readonly wsServerManager;
    private readonly getIPC;
    private readonly deviceMap;
    private readonly getLastFocusedResource;
    private readonly logger;
    private readonly openDocument?;
    private readonly waitForDocumentReady?;
    private readonly handlerFactory;
    constructor(wsServerManager: WebSocketServerManager, getIPC: (filePath: string) => Promise<IPCServer | undefined>, deviceMap: Map<string, ResourceDevice>, getLastFocusedResource: () => string | null, logger: ILogger, openDocument?: ((filePath: string) => Promise<void>) | undefined, waitForDocumentReady?: ((filePath: string, timeoutMs?: number) => Promise<void>) | undefined, handlerFactory?: OperationHandlerFactory);
    start(): void;
    private handleRequest;
    private createContext;
    private findDevice;
    private sendResponse;
    private sendErrorResponse;
}

export { IPCDeviceManager, NEW_DOC_TYPES, type OperationContext, type OperationHandler, type OperationHandlerFactory, type OperationResult, type ResourceDevice, WebSocketRequestRouter, type WebSocketServerManager };
