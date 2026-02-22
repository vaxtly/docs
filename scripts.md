## Scripts

Vaxtly supports **pre-request** and **post-response** scripts for each request, enabling dynamic workflows like token refresh chains and response value extraction.

### Pre-Request Scripts

Pre-request scripts run before the main request is sent. The available action is **dependent request execution** — you select another request from the same collection, and Vaxtly fires it first. This is typically used to fetch an auth token that the main request needs.

The request picker is searchable and shows each request's method badge and name. The current request is excluded from the list to prevent self-referencing.

Pre-request scripts execute before variable substitution, so any variables set by the dependent request's post-response script are available to the main request.

### Post-Response Scripts

Post-response scripts run after a response is received. Each script rule extracts a value from the response and stores it as a **collection variable**. You can add multiple extraction rules.

Each rule has two fields:

- **Source** — where to extract the value from:
  - `body.path.to.value` — JSON dot-notation path (e.g., `body.data.token`, `body.items[0].id`)
  - `header.Header-Name` — response header value (case-insensitive lookup)
  - `status` — the HTTP status code as a string
- **Target** — the collection variable name to store the value in

Extracted values are sanitized: any `<span v-pre>{{varName}}</span>` patterns in the extracted value are stripped to prevent variable injection from malicious API responses.

If the active environment has a variable with the same name as the target, it's updated too (mirroring). This only updates existing variables — it won't create new ones in the environment.

### Script Chain Depth

Pre-request scripts can trigger chains (request A depends on request B, which depends on request C). The maximum chain depth is **3** to prevent infinite loops. Circular dependencies are detected and blocked.

> [!NOTE]
> **Note:** Script errors are logged but don't abort the main request. If a pre-request script fails, the main request still executes. If a post-response script fails, the response is still returned.
