## Headers & Query Params

Both headers and query parameters use the same **key-value editor**. Each row has a key, a value, and a checkbox to enable or disable it without deleting.

### Auto-Generated Headers

Some headers are added automatically based on your request configuration and displayed in a read-only section labeled "Auto-generated":

- **Content-Type** — set based on the selected body type (`application/json`, `application/xml`, `application/x-www-form-urlencoded`). For form-data, the Content-Type is managed automatically by the HTTP client to include the multipart boundary.
- **Authorization** — set based on the Auth tab configuration (Bearer, Basic, or API Key).

You can override any auto-generated header by adding one with the same name in the editable section below. User-provided headers always take precedence (case-insensitive matching).

### URL ↔ Params Sync

Query parameters and the URL are synchronized bidirectionally. Editing a parameter in the Params tab updates the URL query string, and editing the URL directly re-parses the parameters into the table.

### Environment Variables

Use <code v-pre>{{variable}}</code> syntax in any header or param key or value. Variables are highlighted inline — green when resolved, red when unresolved. Hover to see the resolved value and its source (e.g., "Env: Production" or "Collection").
