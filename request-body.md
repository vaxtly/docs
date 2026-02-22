## Request Body

Vaxtly supports seven body types, selectable from tabs at the top of the body editor:

- **None** — no body (used for GET, HEAD, etc.)
- **JSON** — syntax-highlighted editor with a **Format** button that pretty-prints the content (shows "Invalid JSON" feedback if the JSON is malformed)
- **XML** — syntax-highlighted editor with a **Format** button
- **Form Data** — key-value table with a per-row type toggle between **Text** and **File**. Text values support <code v-pre>{{variable}}</code> substitution. File entries open the native OS file picker.
- **URL-Encoded** — key-value pairs sent as `application/x-www-form-urlencoded`
- **Raw** — plain text editor for any content type
- **GraphQL** — split editor with a query panel on top and a variables panel below (JSON format)

### Body Type Caching

Switching between body types preserves your content. Each type's content is cached independently, so switching away and back restores the previous content for that type.

### Form Data File Uploads

For form-data entries, click the type toggle button on a row to switch it from text to file mode. A "Choose file..." button opens the OS file dialog. Only files selected through this dialog can be read by the application — this is a security measure to prevent arbitrary file access.

> [!TIP]
> **Tip:** Environment variables (<code v-pre>{{variable}}</code>) work in form-data text values, URL-encoded values, and all text-based body types. File entries always reference a local file path.
