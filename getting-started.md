## Getting Started

Vaxtly is a modern API client for crafting, testing, and managing HTTP requests. Everything is organized around **workspaces** — each workspace holds its own collections, environments, and settings. Switch between workspaces using the dropdown at the top of the sidebar.

### UI Layout

The interface is split into three main areas:

- **Sidebar** (left) — two modes: **Collections** (browse your request tree) and **Environments** (manage variable sets). Toggle between them using the mode tabs at the top. A search bar filters the tree in real time. The footer toolbar has buttons to expand/collapse the entire tree and cycle through themes.
- **Tab bar** (top) — open requests and environments as tabs. Each request tab shows the HTTP method badge and name. An orange dot indicates unsaved changes. Right-click a tab for options: Pin, Close, Close Others, Close All. Middle-click to close a tab. Pinned tabs survive "Close All."
- **Editor area** (center) — the request builder on top and response viewer on the bottom (or side-by-side, depending on layout setting). A draggable divider lets you resize the split.

### Creating Your First Request

Press <kbd>Cmd+N</kbd> (or <kbd>Ctrl+N</kbd> on Linux/Windows) to create a new request. If no collection exists yet, one will be created automatically. Enter a URL, choose an HTTP method, and hit <kbd>Cmd+Enter</kbd> to send.

### Saving

Press <kbd>Cmd+S</kbd> (or <kbd>Ctrl+S</kbd> on Linux/Windows) to save. If the collection has remote sync enabled, saving also pushes changes to Git in the background.

> [!TIP]
> **Tip:** Use <kbd>Cmd+B</kbd> to toggle the sidebar for more screen space while working.
