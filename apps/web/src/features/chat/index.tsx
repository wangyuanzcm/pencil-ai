import React from 'react'

const lazyImport = () => import('../../restored/unbundled-safe/app/chunk-017.js') as any

export type AgentType = 'claude' | 'codex' | 'unknown'

export type ChatFile =
  | {
      type: 'text'
      name: string
      content: string
      hidden?: boolean
    }
  | {
      type: 'image'
      name: string
      source: { media_type: string; data: string }
      hidden?: boolean
    }

export type ChatToolUse = {
  id?: string
  name: string
  input?: unknown
  output?: unknown
  isError?: boolean
}

export type ChatMessageModel = {
  id: string
  role: 'user' | 'assistant' | 'tool' | string
  text?: string
  status?: 'streaming' | 'final' | string
  toolUse?: ChatToolUse
  files?: ChatFile[]
  permissionRequest?: unknown
  agentError?: boolean
}

export type ChatConversationSnapshot = {
  id: string
  title?: string
  name?: string
  color?: [number, number, number]
  parentConversationId?: string
  modelID?: string
  pendingModelID?: string
  isRunning?: boolean
  lastUpdatedAt?: number
  queuedMessages?: { text: string; files?: ChatFile[]; agentMultiplier?: number }[]
  messages: ChatMessageModel[]
}

export type ChatManagerSnapshot = {
  conversations: ChatConversationSnapshot[]
  activeConversationId: string
  canSendMessage?: boolean
  agentConfig?: unknown
  defaultModel?: string
  dangerouslySkipPermissions?: boolean
}

export type ChatManagerLike = {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => ChatManagerSnapshot
  sendMessage: (args: {
    prompt: string
    conversationId?: string
    selectedIDs?: string[]
    files?: ChatFile[]
    subagent?: boolean
    agentMultiplier?: number
    parentConversationId?: string
    userMessageExtension?: string
  }) => void
  stopConversation: (conversationId: string) => void
  selectConversation: (conversationId: string) => void
  createConversation: () => void
  closeConversation: (conversationId: string) => void
  questionResponse: (conversationId: string, questionId: string, response: string) => void
  on: (eventName: 'notification', handler: (e: { body: string; conversationId: string }) => void) => void
  off: (eventName: 'notification', handler: (e: { body: string; conversationId: string }) => void) => void
  getActiveModelIdWithFallback: () => string | undefined
}

export type ChatPanelProps = {
  selectedIDs: string[]
  chatManager: ChatManagerLike
  onAgentDialogOpenChange?: (open: boolean) => void
  onCheckAgentStatus?: () => void
}

export type ChatMessageProps = {
  message: ChatMessageModel
  onQuestionSubmit?: (messageId: string, answer: string) => void
  onPermissionResponse?: (messageId: string, action: 'allow' | 'deny') => void
  onOpenTerminal?: () => void
  isQuestionSubmitted?: boolean
  agentType: AgentType
  name: string
  color: [number, number, number]
}

export type ToolUseCardViewProps = {
  toolUse: ChatToolUse
  isStreaming: boolean
}

export type ToolUseProps = {
  toolUse: ChatToolUse
  onQuestionSubmit?: (answer: string) => void
  isQuestionSubmitted?: boolean
  isStreaming: boolean
}

export const ChatPanel = React.lazy(async () => {
  const mod = await lazyImport()
  return { default: (mod as any).G$t }
}) as unknown as React.LazyExoticComponent<React.ComponentType<ChatPanelProps>>

export const ChatMessage = React.lazy(async () => {
  const mod = await lazyImport()
  return { default: (mod as any).z$t }
}) as unknown as React.LazyExoticComponent<React.ComponentType<ChatMessageProps>>

export const ToolUse = React.lazy(async () => {
  const mod = await lazyImport()
  return { default: (mod as any).j$t }
}) as unknown as React.LazyExoticComponent<React.ComponentType<ToolUseProps>>

export const ToolUseCardView = React.lazy(async () => {
  const mod = await lazyImport()
  return { default: (mod as any).L$t }
}) as unknown as React.LazyExoticComponent<React.ComponentType<ToolUseCardViewProps>>

export {
  applyPromptHistoryNavigation,
  getNextTabIndex,
  isChatNotificationsEnabled,
  shouldShowChatNotification
} from './utils'
