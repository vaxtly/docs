## Data Management

Export and import your data from **Settings → Data**.

### Export

Five export options:

- **Everything** — collections (with nested folders and requests) + environments + MCP servers + configuration
- **Collections** — all collections with their full folder/request tree
- **Environments** — all environments with variables (vault-synced environments export with empty variables)
- **MCP Servers** — all MCP server configurations and transport settings
- **Config** — sync and vault settings (tokens are excluded for security)

You can also export individual items by right-clicking in the sidebar and choosing "Export" — this works for both collections and MCP servers.

Exported data is saved as a JSON file named `vaxtly-export-{type}-{date}.json`.

### Import — Vaxtly Format

Import a previously exported Vaxtly JSON file. Collections, environments, MCP servers, and config are restored into the current workspace. All export types are supported — single items (one collection or one MCP server), category exports (all collections, all MCP servers, etc.), and full "Everything" exports.

### Import — Postman

Vaxtly auto-detects and supports three Postman formats:

- **Workspace dump** — full Postman export with multiple collections
- **Collection v2.1** — single Postman collection export (detected by `info._postman_id` or `info.schema`)
- **Environment** — Postman environment export (detected by `_postman_variable_scope` or `values` array)

### Import — Insomnia

Vaxtly auto-detects the Insomnia v4 JSON export format. The following resources are imported:

- **Workspaces** → Collections
- **Request groups** → Folders (with nested folder hierarchy preserved)
- **Requests** → Requests (method, URL, headers, query params, body, auth)
- **Environments** → Environments (variables as key-value pairs)

Supported body types: JSON, XML, form-data, URL-encoded, and GraphQL. Authentication types (Bearer, Basic, API Key, OAuth 2.0) are mapped automatically.

The import summary shows how many collections, environments, folders, and requests were imported, along with any errors.

### Drag-and-Drop Import

You can drag and drop a JSON file directly onto the Data tab. A drop zone with a dashed border appears — drop the file and it will be auto-detected and imported.

> [!TIP]
> Use the browse button or drag-and-drop to import files. The file format is detected automatically — you don't need to specify whether it's a Vaxtly, Postman, or Insomnia file.
