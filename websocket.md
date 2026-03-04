---
title: WebSocket
---

# WebSocket

Vaxtly supports WebSocket connections as a first-class feature. You can create, connect, send messages, and inspect responses — all within the same collection and folder structure you use for HTTP requests.

## Creating a WebSocket Connection

There are two ways to create a WebSocket connection:

1. **From a collection**: Right-click a collection in the sidebar → **Add WebSocket**
2. **From a folder**: Right-click a folder → **Add WebSocket**

A new entry appears in the sidebar with a **WS** badge in teal.

## Connection Bar

The connection bar at the top of the WebSocket view has:

- **Protocol badge** — Shows **WS** or **WSS** based on the URL scheme
- **URL input** — Supports <code v-pre>{{variable}}</code> substitution from your active environment
- **Connect / Disconnect** button — Press <kbd>Enter</kbd> in the URL input to toggle connection
- **Save** button — Persists the URL and headers (<kbd>Cmd+S</kbd>)

> [!TIP]
> You can use environment variables in the URL, e.g. <code v-pre>wss://{{host}}/ws</code>. Variables are resolved when you connect.

## Sending Messages

Once connected, use the message composer at the bottom of the **Messages** tab:

- **Text mode** — Plain text input
- **JSON mode** — Full CodeMirror editor with syntax highlighting and a **Format** button to pretty-print
- Press <kbd>Enter</kbd> to send, <kbd>Shift+Enter</kbd> for a new line

> [!NOTE]
> <span v-pre>{{variable}}</span> references in your message are resolved on the server side when the message is sent.

## Message Log

All sent and received messages appear in the message log:

- **↑** (teal) — Messages you sent
- **↓** (blue) — Messages received from the server
- Each entry shows the message preview, size, and timestamp
- Click a message to expand it — JSON messages render in a syntax-highlighted CodeMirror viewer
- Use the **Clear** button to remove all messages from the log

Messages are persisted to the database (up to 500 per connection) so they survive app restarts.

## Headers

Switch to the **Headers** sub-tab to configure custom headers sent during the WebSocket handshake. This uses the same key-value editor as HTTP requests.

Headers also support <code v-pre>{{variable}}</code> substitution.

## Testing

Here are some public echo servers you can use to test:

- `wss://echo.websocket.org`
- `wss://ws.postman-echo.com/raw`
- `wss://socketsbay.com/wss/v2/1/demo/`

These servers echo back whatever you send, which is useful for verifying your connection and message flow.

## How It Works

WebSocket connections are managed in Vaxtly's main process using the `ws` library. This means:

- Connections stay alive even if you switch tabs
- SSL verification respects your global **Verify SSL** setting
- URL schemes are auto-corrected: `https://` → `wss://`, `http://` → `ws://`
- WebSocket entries are stored as requests with method `WEBSOCKET`, so they inherit collections, folders, drag-and-drop, and remote sync
