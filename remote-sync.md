## Remote Sync (Git)

Sync your collections to a Git repository for backup, sharing, and version control. Supported providers: **GitHub** and **GitLab**.

### Setup

Go to **Settings → Remote Sync** and configure:

- **Provider** — GitHub or GitLab
- **Repository** — in `owner/repo` format (e.g., `myorg/api-collections`)
- **Branch** — the Git branch to sync with (default: `main`)
- **Personal Access Token** — a token with repository read/write permissions

Click **Test Connection** to verify access before saving.

Sync is **per-collection** — you choose which collections to sync by right-clicking a collection in the sidebar and toggling "Enable Sync." Collections that aren't sync-enabled are purely local.

---

### Pull & Push

**Pull** downloads collections from the remote repository. Each collection is stored as a directory of YAML files — one `_collection.yaml` for metadata and one YAML file per request. Pulling creates local environments for any new collections found on the remote.

**Push** uploads your local collections to the remote. You can push individual collections (right-click → Push to Remote) or push all sync-enabled collections at once from the Remote Sync settings tab.

When you save a request in a sync-enabled collection, changes are automatically pushed to the remote in the background. Moving a request between sync-enabled collections triggers a push on both the source and target collections.

### How Files Are Stored

Each synced collection becomes a directory on the remote:

```
collections/
  {collection-id}/
    _collection.yaml     # Collection metadata + folder structure
    _manifest.yaml       # Ordering information
    {request-id}.yaml    # One file per request
```

Vaxtly uses a **3-way merge** strategy per file, tracking the local content hash and the remote blob SHA. This allows it to detect when both sides have changed independently.

---

### Conflict Resolution

When both local and remote have changed since the last sync, Vaxtly detects the conflict and presents a modal with two options:

- **Keep Local** — overwrites the remote with your local changes
- **Keep Remote** — overwrites your local data with the remote version

Conflicts are resolved per-collection, not per-file.

---

### Sensitive Data Scanning

Before pushing, Vaxtly scans your collection for potentially sensitive data in headers, query parameters, body, auth credentials, and collection variables. It checks for over 100 known sensitive key patterns including `authorization`, `api_key`, `token`, `password`, `secret`, `aws_secret_access_key`, `stripe_key`, and more.

If findings are detected, a modal shows each finding grouped by request, with the key name and a masked preview of the value (first 4 characters visible). You have three choices:

- **Cancel** — don't push
- **Sync without values** — sanitize the sensitive values before pushing (replaces them with empty strings, but preserves <code v-pre>{{variable}}</code> references)
- **Sync Anyway** — push as-is, including the sensitive data

### Auto Sync

Enable **Auto Sync** in Settings → Remote Sync to automatically pull on application startup and push after saving. Errors during auto-sync are logged to the session log and shown as toast notifications.

> [!TIP]
> **Tip:** Use environment variables (<code v-pre>{{api_key}}</code>) in your requests instead of hardcoded values. The sensitive data scanner won't flag variable references, and the actual values stay in your local environments.
