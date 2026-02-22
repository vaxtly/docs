## Remote Sync (Git)

Sync your collections to a Git repository for backup, sharing, and version control. Supported providers: **GitHub** and **GitLab**.

### Setup

Go to **Settings → Remote Sync** and configure:

- **Provider** — GitHub or GitLab
- **Instance URL** — leave empty for github.com / gitlab.com, or enter your self-hosted instance URL (e.g., `https://github.company.com`)
- **Repository** — in `owner/repo` format (e.g., `myorg/api-collections`)
- **Branch** — the Git branch to sync with (default: `main`)
- **Personal Access Token** — a token with repository read/write permissions (see below)

Click **Test Connection** to verify access before saving.

---

### GitHub Token Setup

You need a **Personal Access Token** with read/write access to the repository. GitHub offers two token types:

#### Fine-grained token (recommended)

Fine-grained tokens let you scope access to specific repositories, which is more secure than classic tokens.

1. Go to [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
2. Click **Generate new token**
3. Give it a name (e.g., `Vaxtly Sync`)
4. Set the expiration as needed
5. Under **Repository access**, select **Only select repositories** and pick your sync repository
6. Under **Permissions → Repository permissions**, set:
   - **Contents** → **Read and write** (required — covers file operations, commits, refs, and trees)
7. Click **Generate token** and copy it into Vaxtly

That's the only permission needed. Fine-grained tokens don't have access to anything else by default.

#### Classic token

If you prefer a classic token or need to sync across many repositories:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Select the **`repo`** scope (full control of private repositories)
4. Click **Generate token** and copy it into Vaxtly

> [!TIP]
> For public repositories, the `public_repo` scope is sufficient instead of the full `repo` scope.

The repository can be private or public. If it doesn't exist yet, create it on GitHub first — Vaxtly won't create repositories for you.

---

### GitLab Token Setup

You need a **Personal Access Token** with read/write access to the repository.

1. Go to your GitLab instance → **Preferences → Access Tokens** (or [gitlab.com/-/user_settings/personal_access_tokens](https://gitlab.com/-/user_settings/personal_access_tokens) for gitlab.com)
2. Click **Add new token**
3. Give it a name (e.g., `Vaxtly Sync`)
4. Set the expiration as needed
5. Select the following scopes:
   - **`read_repository`** — read files and list directory trees
   - **`write_repository`** — create/update/delete files and create commits
6. Click **Create personal access token** and copy it into Vaxtly

Alternatively, the **`api`** scope covers everything but grants broader access than necessary.

#### Repository format

Enter the **namespace/project** path (e.g., `myorg/api-collections`) or the **numeric project ID** as the repository value. Do not include `gitlab.com` — just the path portion. You can find the project ID on the project's main page in GitLab, just below the project name.

Sync is **per-collection** — you choose which collections to sync by right-clicking a collection in the sidebar and toggling "Enable Sync." Collections that aren't sync-enabled are purely local.

---

### Self-Hosted Instances

Vaxtly supports **GitHub Enterprise Server** and **self-hosted GitLab** instances. In **Settings → Remote Sync**, enter your instance's root URL in the **Instance URL** field — just the base URL, without any `/api` path suffix.

| Provider | Instance URL example | API endpoint used |
|----------|---------------------|-------------------|
| GitHub Enterprise | `https://github.company.com` | `https://github.company.com/api/v3` |
| Self-hosted GitLab | `https://gitlab.company.com` | `https://gitlab.company.com/api/v4` |

Leave the field empty to use the public cloud (github.com or gitlab.com). The API path suffix is added automatically.

> [!TIP]
> Token setup for self-hosted instances is the same as for the cloud versions — just create the token on your own instance instead of github.com/gitlab.com.

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
