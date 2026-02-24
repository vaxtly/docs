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

### States

- **Empty** — before any request is sent, shows a hint with the <kbd>Cmd+Enter</kbd> shortcut
- **Loading** — animated dots while the request is in flight
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
