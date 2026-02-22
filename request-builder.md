## Request Builder

The request builder is the main area for composing HTTP requests. It has five sub-tabs below the URL bar: **Params**, **Headers**, **Body**, **Auth**, and **Scripts**.

### URL Bar

At the top is the URL input with a **method selector** dropdown. Supported methods: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. Each method is color-coded for quick identification.

Environment variables (<code v-pre>{{variable}}</code>) in the URL are highlighted inline — green for resolved, red for unresolved. Hover over a highlighted variable to see its value and source.

### Sending & Cancelling

Press the **Send** button or <kbd>Cmd+Enter</kbd> to execute the request. You can also press <kbd>Enter</kbd> in the URL bar. While a request is in flight, the Send button becomes a **Cancel** button. Cancellation also triggers automatically if the request exceeds the configured timeout.

Sending a request implicitly saves it to the database. If the collection has sync enabled, changes are pushed to the remote in the background.

### Layout

The editor area is split between the request builder and the response viewer. You can switch the split orientation between **rows** (top/bottom) and **columns** (side-by-side) in Settings → General. The divider is draggable to resize the split (15–85%).

### Request Settings

Configurable in **Settings → General**:

- **Timeout** — 1 to 300 seconds (default: 30)
- **Follow Redirects** — on by default
- **Verify SSL** — on by default; disable for self-signed certificates
- **Layout** — rows or columns
