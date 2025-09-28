# Chat components

This folder contains small, focused pieces used by the main `ChatWidget` component:

- `useKeyboardInset.ts` — Hook that calculates the keyboard bottom inset using the Visual Viewport API with throttling and orientation handling. Returns a single number: the bottom inset in pixels (0 when no keyboard detected).
- `useChatApi.ts` — Hook that wraps fetch calls to the chat API and handles aborts and timeouts. Exposes `sendMessage(payload)`, `isLoading`, and `abort()`.
- `MessageList.tsx` — Presentational component that renders chat messages, the loading indicator, and the sentinel element for automatic scrolling.
- `ChatInput.tsx` — Presentational component for the message input area. Handles textarea rendering, composition events, auto-resize, send button, and error display. All behaviour and state is managed by the parent `ChatWidget`.

Design notes:
- Keep logic in `ChatWidget` minimal: it coordinates state, focus management, and usage of the hooks.
- The hook and components are intentionally small and dependency-free so they can be unit tested independently.
