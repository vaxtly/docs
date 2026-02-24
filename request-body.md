## Request Body

Vaxtly supports seven body types, selectable from tabs at the top of the body editor:

- **None** — no body (used for GET, HEAD, etc.)
- **JSON** — syntax-highlighted editor with a **Format** button that pretty-prints the content (shows "Invalid JSON" feedback if the JSON is malformed)
- **XML** — syntax-highlighted editor with a **Format** button
- **Form Data** — key-value table with a per-row type toggle between **Text** and **File**. Text values support <code v-pre>{{variable}}</code> substitution. File entries open the native OS file picker. Includes a **Bulk Edit** mode (see below).
- **URL-Encoded** — key-value pairs sent as `application/x-www-form-urlencoded`. Includes a **Bulk Edit** mode (same as headers/params).
- **Raw** — plain text editor for any content type
- **GraphQL** — split editor with a query panel on top and a variables panel below (JSON format)

### Body Type Caching

Switching between body types preserves your content. Each type's content is cached independently, so switching away and back restores the previous content for that type.

### Form Data File Uploads

For form-data entries, click the type toggle button on a row to switch it from text to file mode. A "Choose file..." button opens the OS file dialog. Only files selected through this dialog can be read by the application — this is a security measure to prevent arbitrary file access.

### Form Data Bulk Edit

The form-data editor has its own **Bulk Edit** button. Text entries use the standard `key:value` format. File entries appear as read-only lines like `#avatar:@photo.png (file)` — these are preserved when you switch back to row mode but cannot be added or modified in bulk text. To manage file entries, use the row editor.

> [!TIP]
> **Tip:** Environment variables (<code v-pre>{{variable}}</code>) work in form-data text values, URL-encoded values, and all text-based body types. File entries always reference a local file path.
