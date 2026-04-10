import { expect, test } from 'vitest'
import { applyPromptHistoryNavigation, getNextTabIndex, isChatNotificationsEnabled, shouldShowChatNotification } from '../src/features/chat'

test('chat utils: notifications enabled flag', () => {
  expect(isChatNotificationsEnabled(null)).toBe(true)
  expect(isChatNotificationsEnabled('true')).toBe(true)
  expect(isChatNotificationsEnabled('false')).toBe(false)
})

test('chat utils: shouldShowChatNotification', () => {
  expect(
    shouldShowChatNotification({
      hasDocumentFocus: true,
      activeConversationId: 'a',
      eventConversationId: 'a',
      notificationsEnabled: true,
      notificationPermission: 'granted'
    })
  ).toBe(false)

  expect(
    shouldShowChatNotification({
      hasDocumentFocus: false,
      activeConversationId: 'a',
      eventConversationId: 'a',
      notificationsEnabled: true,
      notificationPermission: 'granted'
    })
  ).toBe(true)

  expect(
    shouldShowChatNotification({
      hasDocumentFocus: false,
      activeConversationId: 'a',
      eventConversationId: 'b',
      notificationsEnabled: false,
      notificationPermission: 'granted'
    })
  ).toBe(false)
})

test('chat utils: applyPromptHistoryNavigation mirrors chunk behavior', () => {
  const history = ['h0', 'h1', 'h2']

  const up1 = applyPromptHistoryNavigation({ key: 'ArrowUp', currentValue: 'draft', currentIndex: -1, historyTexts: history, originalValue: '' })
  expect(up1.handled).toBe(true)
  expect(up1.nextIndex).toBe(0)
  expect(up1.nextValue).toBe('h0')
  expect(up1.nextOriginalValue).toBe('draft')

  const up2 = applyPromptHistoryNavigation({
    key: 'ArrowUp',
    currentValue: up1.nextValue,
    currentIndex: up1.nextIndex,
    historyTexts: history,
    originalValue: up1.nextOriginalValue
  })
  expect(up2.nextIndex).toBe(1)
  expect(up2.nextValue).toBe('h1')

  const down1 = applyPromptHistoryNavigation({
    key: 'ArrowDown',
    currentValue: up2.nextValue,
    currentIndex: up2.nextIndex,
    historyTexts: history,
    originalValue: up2.nextOriginalValue
  })
  expect(down1.nextIndex).toBe(0)
  expect(down1.nextValue).toBe('h0')

  const down2 = applyPromptHistoryNavigation({
    key: 'ArrowDown',
    currentValue: down1.nextValue,
    currentIndex: down1.nextIndex,
    historyTexts: history,
    originalValue: down1.nextOriginalValue
  })
  expect(down2.nextIndex).toBe(-1)
  expect(down2.nextValue).toBe('draft')
})

test('chat utils: getNextTabIndex', () => {
  expect(getNextTabIndex({ currentIndex: 0, tabCount: 3, shiftKey: false })).toBe(1)
  expect(getNextTabIndex({ currentIndex: 0, tabCount: 3, shiftKey: true })).toBe(2)
  expect(getNextTabIndex({ currentIndex: 2, tabCount: 3, shiftKey: false })).toBe(0)
  expect(getNextTabIndex({ currentIndex: 0, tabCount: 0, shiftKey: false })).toBe(-1)
})

