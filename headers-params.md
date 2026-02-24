## Headers & Query Params

Both headers and query parameters use the same **key-value editor**. Each row has a key, a value, and a checkbox to enable or disable it without deleting.

### Auto-Generated Headers

Some headers are added automatically based on your request configuration. They appear inline in the same editor as your custom headers, marked with an **auto** badge:

- **Content-Type** — set based on the selected body type (`application/json`, `application/xml`, `application/x-www-form-urlencoded`). For form-data, the Content-Type is managed automatically by the HTTP client to include the multipart boundary.
- **Authorization** — set based on the Auth tab configuration (Bearer, Basic, or API Key).

Auto-generated headers stay in sync — changing the body type or auth config updates them automatically. You can:

- **Disable** an auto-generated header by unchecking it (e.g., to send a request without the Authorization header).
- **Edit** its value directly if you need a custom override.

Auto-generated headers cannot be deleted (no delete button), but they disappear automatically when the source is removed (e.g., switching body type to "none" or auth to "None"). They are not stored in the database — they are recomputed each time the request is loaded.

### URL ↔ Params Sync

Query parameters and the URL are synchronized bidirectionally. Editing a parameter in the Params tab updates the URL query string, and editing the URL directly re-parses the parameters into the table.

### Bulk Edit

Click the **Bulk Edit** button in the top-right corner of any key-value editor to switch to a plain-text textarea. Each line represents one entry in `key:value` format:

```
Content-Type:application/json
Authorization:Bearer {{token}}
Cache-Control:no-cache
```

- The first `:` splits the key from the value — values can contain colons.
- Prefix a line with `#` to mark it as **disabled**: `#X-Debug:true`
- Empty lines are ignored.

This makes it easy to paste multiple entries at once or copy them between editors (e.g., from headers to params). Click **Bulk Edit** again to return to the row editor.

### Environment Variables

Use <code v-pre>{{variable}}</code> syntax in any header or param key or value. Variables are highlighted inline — green when resolved, red when unresolved. Hover to see the resolved value and its source (e.g., "Env: Production" or "Collection").
