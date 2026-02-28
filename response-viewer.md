## Response Viewer

After sending a request, the response panel shows the result with a status bar and several tabs.

### Status Bar

The status bar displays:

- **Status code** — color-coded: green for 2xx, yellow for 3xx, orange for 4xx, red for 5xx. A status of 0 indicates a network error (timeout, DNS failure, connection refused, etc.) and shows "ERR" with the error message.
- **TTFB** — time to first byte (when the server started responding)
- **Total time** — total request duration
- **Size** — response body size (formatted as B, KB, or MB)

### Tabs

- **Body** — syntax-highlighted read-only editor. The language (JSON, HTML, XML, or plain text) is auto-detected from the `Content-Type` header. JSON responses are automatically pretty-printed. Use <kbd>Ctrl+F</kbd> to search within the response body.
- **Headers** — all response headers in a key-value list. Header names are highlighted in blue.
- **Cookies** — only shown when the response contains `Set-Cookie` headers. Each cookie is displayed as a card showing name, value, and attributes (domain, path, expires, httpOnly, secure, sameSite).
- **Preview** — only shown when the response `Content-Type` is `text/html`. Renders the HTML in a sandboxed iframe with all permissions disabled (no scripts, no forms, no plugins).

### SSE Streaming

Vaxtly automatically detects **Server-Sent Events (SSE)** responses — commonly used by AI APIs (OpenAI, Anthropic, etc.) and real-time feeds. When the server responds with `Content-Type: text/event-stream`, the response streams in real-time instead of waiting for the entire body to download.

#### How it works

- **Auto-detection** — no configuration needed. If the response is an SSE stream, Vaxtly switches to streaming mode automatically.
- **Status bar** — appears immediately with the HTTP status code. During streaming, the right side shows a pulsing green **STREAMING** indicator with live metrics: event count, elapsed duration, and accumulated size.
- **Events tab** — opens automatically when streaming starts. Shows a table of every SSE event as it arrives:
  - **#** — event index
  - **Time** — milliseconds since the request started
  - **Type** — the SSE event type (`message`, `content_block_delta`, etc.)
  - **Data** — the event payload (truncated to 200 characters in the table)
- **Body tab** — accumulates the raw event data in real-time as plain text. You can switch to this tab during streaming to watch content build up.
- **Cancel** — click the cancel button (or press <kbd>Cmd+Enter</kbd> again) to stop the stream at any time.

#### After streaming completes

Once the stream finishes (or is cancelled), the response behaves like any other response:
- The status bar switches to the standard TTFB / Total / Size display
- The Events tab remains available with the full event log and a count badge
- The Body tab shows the complete accumulated response

> [!TIP]
> The Events tab auto-scrolls to the bottom as new events arrive. Scroll up to pause auto-scrolling — it resumes when you scroll back to the bottom.

### States

- **Empty** — before any request is sent, shows a hint with the <kbd>Cmd+Enter</kbd> shortcut
- **Loading** — animated dots while the request is in flight
- **Streaming** — status bar with live metrics + Events/Body tabs updating in real-time (SSE responses only)
- **Error** — network errors show a red error card with the failure message
- **Success** — status bar + tabbed content

### Session Log Detail

Every HTTP request is also logged to the **Log panel** at the bottom of the window. HTTP log entries show a chevron (▸) — click a row to expand it and inspect the full request/response detail without leaving your current tab.

The expanded detail has two tabs:

- **Request** — URL, query parameters, headers, and body (with body type label). JSON bodies are auto-formatted.
- **Response** — status code, TTFB and total timing, response size, headers, body, and cookies.

This is useful for reviewing past requests, debugging failed requests (network errors show the request side populated with status 0), or inspecting requests triggered by pre-request scripts.

> [!TIP]
> Drag the top edge of the log panel to resize it. The panel remembers its height while the app is open.

> [!NOTE]
> **Note:** Responses are held in memory only while the tab is open. There is no persistent response history. The maximum response body size is 50 MB. Log entry bodies are truncated to 50 KB.
