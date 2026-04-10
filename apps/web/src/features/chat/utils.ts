export function isChatNotificationsEnabled(storageValue: string | null | undefined) {
  return storageValue !== 'false'
}

export function shouldShowChatNotification(args: {
  hasDocumentFocus: boolean
  activeConversationId: string
  eventConversationId: string
  notificationsEnabled: boolean
  notificationPermission: NotificationPermission
}) {
  if (args.hasDocumentFocus && args.activeConversationId === args.eventConversationId) return false
  if (!args.notificationsEnabled) return false
  return args.notificationPermission === 'granted'
}

export type HistoryNavigationDirection = 'up' | 'down'

export function applyPromptHistoryNavigation(args: {
  key: 'ArrowUp' | 'ArrowDown'
  currentValue: string
  currentIndex: number
  historyTexts: string[]
  originalValue: string
}) {
  const { key, currentValue, currentIndex, historyTexts, originalValue } = args
  if (key === 'ArrowUp') {
    if (historyTexts.length === 0) {
      return { handled: false as const, nextIndex: currentIndex, nextValue: currentValue, nextOriginalValue: originalValue }
    }
    const nextOriginalValue = currentIndex === -1 ? currentValue : originalValue
    const nextIndex = Math.min(currentIndex + 1, historyTexts.length - 1)
    const nextValue = historyTexts[nextIndex] ?? currentValue
    return { handled: true as const, nextIndex, nextValue, nextOriginalValue }
  }

  if (currentIndex < 0) {
    return { handled: false as const, nextIndex: currentIndex, nextValue: currentValue, nextOriginalValue: originalValue }
  }

  const nextIndex = currentIndex - 1
  if (nextIndex < 0) {
    return { handled: true as const, nextIndex: -1, nextValue: originalValue, nextOriginalValue: originalValue }
  }

  const nextValue = historyTexts[nextIndex] ?? currentValue
  return { handled: true as const, nextIndex, nextValue, nextOriginalValue: originalValue }
}

export function getNextTabIndex(args: { currentIndex: number; tabCount: number; shiftKey: boolean }) {
  const { currentIndex, tabCount, shiftKey } = args
  if (tabCount <= 0) return -1
  const cur = Math.max(0, Math.min(currentIndex, tabCount - 1))
  return shiftKey ? (cur - 1 + tabCount) % tabCount : (cur + 1) % tabCount
}

