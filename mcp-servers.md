# MCP Servers

Vaxtly includes a built-in MCP (Model Context Protocol) inspector for testing and debugging MCP servers. You can connect to servers using stdio, Streamable HTTP, or legacy SSE transports, then explore their tools, resources, and prompts — all without leaving the app.

## Adding a Server

1. Click the **plug icon** in the sidebar footer to switch to MCP mode
2. Click the **+** button in the sidebar header
3. A new server is created — click it to open the configuration form

## Configuring a Server

Each server needs a **name** and a **transport** configuration:

### stdio (Local Process)

Runs a local command as a child process and communicates via stdin/stdout.

| Field | Description |
|-------|-------------|
| **Command** | The executable to run (e.g., `npx`, `node`, `python`) |
| **Arguments** | Space-separated arguments (e.g., `-y @modelcontextprotocol/server-everything`) |
| **Environment Variables** | Key-value pairs passed to the process |
| **Working Directory** | Optional working directory for the process |

### Streamable HTTP

Connects to an HTTP endpoint that supports the MCP Streamable HTTP transport.

| Field | Description |
|-------|-------------|
| **URL** | The server endpoint (e.g., `http://localhost:3000/mcp`) |
| **Headers** | Optional HTTP headers (e.g., for authentication) |

### SSE (Legacy)

Connects to a Server-Sent Events endpoint (older MCP transport).

| Field | Description |
|-------|-------------|
| **URL** | The SSE endpoint URL |
| **Headers** | Optional HTTP headers |

## Connecting and Disconnecting

- Click **Connect** in the inspector header to establish a connection
- The status dot in the sidebar shows the connection state:
  - **Green** — connected
  - **Yellow** — connecting
  - **Red** — error
  - **Gray** — disconnected
- Click **Disconnect** to close the connection
- You can also right-click a server in the sidebar for Connect/Disconnect options

> [!NOTE]
> MCP connections are not restored on app restart. You need to reconnect manually after restarting Vaxtly.

## Exploring Server Capabilities

Once connected, the inspector shows five tabs:

### Tools

Lists all tools the server exposes. Each tool shows its name, description, and input schema.

To call a tool:
1. Click **Call** on the tool you want to test
2. Fill in the arguments using the auto-generated form (built from the tool's JSON Schema)
3. Click **Call Tool**
4. The result appears inline below the form

### Resources

Lists static resources and resource templates the server provides.

- Click **Read** on any resource to fetch and display its content
- Resource templates show their URI pattern — fill in the template variables to read

### Prompts

Lists prompt templates with their argument definitions.

- Click **Get** to fetch a prompt
- Fill in any required arguments
- The result shows the prompt messages (user/assistant) with their content

### Traffic

A live log of all JSON-RPC messages between Vaxtly and the server.

- Each entry shows direction (outgoing/incoming), method name, and timestamp
- Click an entry to expand and see the full params/result/error JSON
- Use **Clear** to reset the log

### Notifications

Shows server-initiated notifications (e.g., when the server's tool or resource list changes).

- Each entry shows the notification method and timestamp
- Click to expand and see the full notification params

## Variable Substitution

MCP server configuration fields support <code v-pre>{{variable}}</code> references, just like requests. Variables are resolved at connect time using the active environment.

Supported fields:

| Transport | Fields with variable support |
|-----------|----------------------------|
| **stdio** | Command, Arguments, Environment Variable values, Working Directory |
| **HTTP / SSE** | URL, Header values |

Variable names in key-value pairs (environment variable names, header names) are **not** substituted — only values.

Variables are highlighted inline in the configuration form: **green** for resolved variables, **red** for unresolved ones. Hover to see the resolved value and source.

> [!TIP]
> Use environment variables for sensitive values like API keys in MCP server env vars or headers. For example, set an environment variable <code v-pre>API_KEY: "{{my_api_key}}"</code> instead of hardcoding the value.

## Git Sync

MCP server configurations can be synced to the same Git remote as your collections. This requires [Remote Sync](/remote-sync) to be configured first.

### Enabling Sync

Right-click a server in the sidebar and select **Enable Sync**. The server is immediately pushed to the remote. A sync icon appears next to servers that have sync enabled.

### How It Works

- **Auto-push on save** — when you save changes to a sync-enabled server, it's automatically pushed to the remote
- **Auto-pull on startup** — if Auto Sync is enabled in Settings → Remote Sync, MCP servers are pulled along with collections on app launch
- **Manual pull** — clicking Pull in Settings → Remote Sync pulls both collections and MCP servers
- **Pull single server** — right-click → Pull from Remote overwrites the local config with the remote version
- **Push All** — pushes all sync-enabled collections and MCP servers at once

### Sensitive Data Scanning

Before pushing, Vaxtly scans MCP server env var values and header values for potentially sensitive data (API keys, tokens, secrets, etc.). The same scanning and sanitization options available for collections apply to MCP servers — see [Sensitive Data Scanning](/remote-sync#sensitive-data-scanning).

> [!TIP]
> Use <code v-pre>{{variable}}</code> references in your MCP server env vars and headers. Variable references are not flagged by the sensitive data scanner.

### File Format

MCP servers are stored in a `mcp-servers/` directory on the remote alongside `collections/`:

```
mcp-servers/
  _manifest.yaml       # Server ordering
  {server-id}.yaml     # One file per server
```

### Disabling Sync

Right-click a server and select **Disable Sync**. The server remains locally but is no longer pushed on save.

## Context Menu

Right-click any server in the sidebar for quick actions:

- **Connect** / **Disconnect** — manage the connection
- **Edit** — open the server configuration
- **Enable Sync** / **Disable Sync** — toggle Git sync for this server
- **Push to Remote** — manually push this server to the remote
- **Pull from Remote** — overwrite local config with the remote version
- **Delete** — remove the server (also deletes from remote if synced)

## Multiple Connections

You can connect to multiple MCP servers simultaneously. Each server maintains its own independent connection, traffic log, and notification history.
