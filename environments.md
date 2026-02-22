## Environments & Variables

Environments let you define sets of variables (like `base_url`, `api_key`) and switch between them — e.g., development vs. staging vs. production. Each environment belongs to a workspace.

### Creating & Activating

Create environments from the sidebar's **Environments** panel. Activate one by clicking its name in the sidebar list, or using the **environment selector** dropdown in the tab bar. Only one environment can be active at a time per workspace. Clicking an already-active environment deactivates it.

Each variable row has a checkbox to enable or disable it individually without deleting.

### Variable Syntax

Use <code v-pre>{{variableName}}</code> anywhere in your request — URL, headers, query params, body, and auth fields. Variable names can contain letters, numbers, underscores, hyphens, and dots. Variables are resolved at send time from the active environment.

Variables are highlighted inline wherever they appear: **green** for resolved variables, **red** for unresolved ones. Hover to see the resolved value and its source (e.g., "Env: Production" or "Collection").

### Resolution Order

When the same variable name exists in multiple places, the highest-priority source wins:

1. **Collection variables** (set by post-response scripts or manually) — highest priority
2. **Active environment variables** — base layer

### Nested References

Variables can reference other variables: if `base_url` is <code v-pre>{{protocol}}://{{host}}</code>, Vaxtly resolves the chain automatically. The maximum nesting depth is 10 iterations to prevent infinite loops. Unresolved variables are left as literal <code v-pre>{{varName}}</code> in the output.

### Encryption

Environment variable values are encrypted at rest using AES-256-CBC. The `enc:` prefix in the database indicates encrypted values — this is handled transparently. You never see the prefix in the UI.

> [!TIP]
> **Tip:** For vault-synced environments, variable values are never stored in the local database at all — they're held in memory only and fetched from the vault provider on each app launch.
