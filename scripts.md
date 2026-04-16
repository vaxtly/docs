## Scripts

Vaxtly supports **pre-request** and **post-response** scripts at both the **request level** and the **collection/folder level**, enabling dynamic workflows like automatic token refresh, response value extraction, and smart token caching.

### Request-Level Scripts

Each request can have its own pre-request and post-response scripts, configured in the **Scripts** sub-tab of the request builder.

### Collection & Folder-Level Scripts

Collections and folders can also define scripts via their **Settings** tab (right-click → Settings → Scripts). These run **before** any request-level scripts, in order:

1. Collection scripts
2. Folder chain scripts (root folder → leaf folder, top-down)
3. Request scripts

This is ideal for setting up authentication at the collection level — configure a token fetch once, and every request in the collection benefits.

### Pre-Request Scripts

Pre-request scripts run before the main request is sent. The available action is **dependent request execution** — you select another request from the same collection, and Vaxtly fires it first. This is typically used to fetch an auth token that the main request needs.

The request picker is searchable and shows each request's method badge and name.

Pre-request scripts execute before variable substitution, so any variables set by the dependent request's post-response script are available to the main request.

#### Only Fetch When Needed (Smart Token Caching)

When configuring a pre-request script, you can enable **"Only fetch when needed"**. This adds two fields:

- **Token variable** — the name of the variable holding the token (e.g., `api_token`)
- **Expiry variable** — the name of the variable holding the token's expiry timestamp (e.g., `api_token_expires_at`)

When enabled, Vaxtly checks before firing the dependent request:
- Is the token variable set and non-empty?
- Is the expiry timestamp still in the future (with a 30-second safety margin)?

If both are true, the dependent request is **skipped** — the existing token is reused. This prevents unnecessary token fetches on every request.

> [!TIP]
> Pair this with a **Set Token Expiry** post-response script (see below) to automatically track when the token expires. The typical setup:
> 1. Pre-request: fire "Get Token" request, with "Only fetch when needed" pointing to <code v-pre>api_token</code> and <code v-pre>api_token_expires_at</code>
> 2. Post-response: Set Variable `body.access_token` → <code v-pre>api_token</code>
> 3. Post-response: Set Token Expiry `body.expires_in` → <code v-pre>api_token_expires_at</code>

### Post-Response Scripts

Post-response scripts run after a response is received. Each script rule extracts a value from the response and stores it as a **collection variable**. You can add multiple extraction rules.

There are two action types:

#### Set Variable

Extracts a raw value and stores it directly.

- **Source** — where to extract the value from:
  - `body.path.to.value` — JSON dot-notation path (e.g., `body.data.token`, `body.items[0].id`)
  - `header.Header-Name` — response header value (case-insensitive lookup)
  - `status` — the HTTP status code as a string
- **Target** — the collection variable name to store the value in

#### Set Token Expiry

Extracts a numeric `expires_in` value (in seconds) from the response and converts it to an **absolute Unix timestamp** (milliseconds). This is designed to work with the "Only fetch when needed" feature.

For example, if the API responds with `{ "expires_in": 3600 }`, the script computes `Date.now() + 3600 * 1000` and stores that timestamp in the target variable.

---

Extracted values are sanitized: any <code v-pre>{{varName}}</code> patterns in the extracted value are stripped to prevent variable injection from malicious API responses.

If the active environment has a variable with the same name as the target, it's updated too (mirroring). This only updates existing variables — it won't create new ones in the environment. For vault-synced environments, the mirrored value is pushed to Vault automatically.

If you have the environment tab open while sending a request, the variables update live — no need to close and reopen the tab.

### Response Assertions (Tests)

The **Tests** tab in the request builder lets you define assertions that automatically verify response properties after each request. This is the foundation for automated API testing and the Collection Runner's pass/fail logic.

#### Adding Assertions

Click the **Tests** sub-tab, then **+ Add** to create an assertion. Each assertion has:

- **Type** — what to check:
  - `Status` — the HTTP status code
  - `Header` — a response header value (case-insensitive name lookup)
  - `JSON Path` — a value in a JSON response body (e.g., `data.items[0].id`)
  - `Response Time` — total response time in milliseconds
- **Target** — the header name or JSON path (only for Header and JSON Path types)
- **Operator** — the comparison:
  - `equals`, `not equals` — exact string match
  - `contains`, `not contains` — substring match
  - `exists`, `not exists` — checks if the value is present (no expected value needed)
  - `less than`, `greater than` — numeric comparison
  - `matches regex` — regular expression match
- **Expected** — the value to compare against

Each assertion can be toggled on/off individually. Disabled assertions are skipped during evaluation.

#### Viewing Results

After sending a request, if assertions are defined, a **Tests** tab appears in the response viewer showing:
- A summary bar with pass/fail counts
- Each assertion result with the actual value received and pass/fail status

The Tests tab badge shows a green "X pass" count when all assertions pass, or a red "X fail" count when any fail.

#### Operator Availability

Status and Response Time only support numeric operators: `equals`, `not equals`, `less than`, `greater than`. Header and JSON Path support all operators.

> [!TIP]
> Assertions are stored in the same `scripts` field as pre/post-response scripts — no database migration needed. They persist when you save the request.

### Script Chain Depth

Pre-request scripts can trigger chains (request A depends on request B, which depends on request C). The maximum chain depth is **3** to prevent infinite loops. Circular dependencies are detected and blocked.

> [!NOTE]
> **Note:** Script errors are logged but don't abort the main request. If a pre-request script fails, the main request still executes. If a post-response script fails, the response is still returned.
