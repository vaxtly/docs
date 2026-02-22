## Collections & Folders

Collections group related requests together. Within a collection you can create nested **folders** to organize requests further (e.g., by resource or feature). Folders can be nested up to 10 levels deep.

### Managing Collections

Right-click in the sidebar to access the context menu:

- **Add Request** / **Add Folder** — create items inside the collection
- **Rename** — inline editing of the name
- **Set Environments** — choose which environments are available in this collection and set a default
- **Enable/Disable Sync** — toggle Git remote sync for this collection
- **Push to Remote** / **Pull from Remote** — manual sync operations (when sync is enabled)
- **Export** — download the collection as a JSON file
- **Delete** — permanently remove the collection and all its contents

### Drag-and-Drop

Requests can be moved between folders and collections by dragging them. Drop a request onto a collection or folder to move it there. A blue border highlights valid drop targets. If the collection has sync enabled, both the source and target collections are automatically pushed to the remote after a move.

> [!NOTE]
> **Note:** Folders and collections themselves cannot be reordered by drag-and-drop — only requests can be dragged.

### Sync Indicator

Collections with sync enabled show a colored dot next to their name: **green** when synced, **orange** when there are local changes that haven't been pushed yet.

### Default Environments

Each collection or folder can have a **default environment**. When you open a request, Vaxtly walks up the folder chain to find the nearest default: the immediate folder is checked first, then its parent, then the collection. The first one found is activated automatically.

Set a default by right-clicking a collection or folder and choosing "Set Environments."

> [!TIP]
> **Tip:** Folder-level defaults take precedence over collection-level defaults, so you can have a collection-wide "staging" env but override it for specific folders.
