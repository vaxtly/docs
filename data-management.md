## Data Management

Export and import your data from **Settings → Data**.

### Export

Four export options:

- **Everything** — collections (with nested folders and requests) + environments + configuration
- **Collections** — all collections with their full folder/request tree
- **Environments** — all environments with variables (vault-synced environments export with empty variables)
- **Config** — sync and vault settings (tokens are excluded for security)

You can also export a single collection by right-clicking it in the sidebar and choosing "Export."

Exported data is saved as a JSON file named `vaxtly-export-{type}-{date}.json`.

### Import — Vaxtly Format

Import a previously exported Vaxtly JSON file. Collections, environments, and config are restored into the current workspace.

### Import — Postman

Vaxtly auto-detects and supports three Postman formats:

- **Workspace dump** — full Postman export with multiple collections
- **Collection v2.1** — single Postman collection export (detected by `info._postman_id` or `info.schema`)
- **Environment** — Postman environment export (detected by `_postman_variable_scope` or `values` array)

The import summary shows how many collections, environments, folders, and requests were imported, along with any errors.

### Drag-and-Drop Import

You can drag and drop a JSON file directly onto the Data tab. A drop zone with a dashed border appears — drop the file and it will be auto-detected and imported.

> [!TIP]
> **Tip:** Use the browse button or drag-and-drop to import files. The file format is detected automatically — you don't need to specify whether it's a Vaxtly export or a Postman file.
