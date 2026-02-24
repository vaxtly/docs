## Authentication

The Auth tab supports five authentication methods, selectable via buttons at the top:

- **None** — no authentication header
- **Bearer Token** — sends `Authorization: Bearer <token>`. A single token input field.
- **Basic Auth** — sends base64-encoded `Authorization: Basic <credentials>`. Username and password fields (password is masked).
- **API Key** — sends a custom header with your API key. You specify both the header name (e.g., `X-API-Key`) and the value.
- **OAuth 2.0** — full OAuth 2.0 flow with token management. Supports three grant types.

The selected auth method generates an implicit header shown in the Headers tab's "Auto-generated" section. If you add a manual `Authorization` header, it overrides the auto-generated one.

All auth input fields support <code v-pre>{{variable}}</code> substitution with inline highlighting, so you can reference tokens stored in environments.

Auth credentials are **encrypted at rest** using AES-256-GCM. Tokens and passwords stored in the database use an `enc:` prefix and are decrypted transparently when read.

### OAuth 2.0

OAuth 2.0 provides three grant types:

#### Authorization Code (+ PKCE)

For services like GitHub, Google, or any provider that requires user authorization in a browser.

1. Fill in **Authorization URL**, **Token URL**, **Client ID**, and optionally **Client Secret**
2. Set **Scope** (e.g., `repo user` for GitHub)
3. Set a **Redirect URL** (e.g., `http://127.0.0.1:9876/callback`) — Vaxtly starts a local server on this port to receive the callback
4. Toggle **PKCE** on or off (on by default — turn off for providers that don't support it, like GitHub OAuth Apps)
5. Click **Get Token** — your browser opens the authorization page, and once you approve, the token appears automatically

#### Client Credentials

For machine-to-machine authentication (no user interaction).

1. Fill in **Token URL**, **Client ID**, and **Client Secret**
2. Optionally set **Scope** and **Audience**
3. Click **Get Token** — the token is fetched directly

#### Password (Resource Owner)

For legacy systems that accept username/password credentials.

1. Fill in **Token URL**, **Client ID**, **Username**, and **Password**
2. Optionally set **Client Secret** and **Scope**
3. Click **Get Token**

#### Token Management

Once a token is obtained, the Auth tab shows the token status:

- **Active badge** with token type (e.g., Bearer) and expiry countdown
- **Token preview** (first 20 characters)
- **Refresh** button — manually refresh using the stored refresh token
- **Clear** button — remove all stored tokens

#### Auto-Refresh

When you send a request and the access token has expired (based on the stored expiry time), Vaxtly automatically refreshes the token using the refresh token before sending. This happens transparently — no manual intervention needed.

> [!TIP]
> For GitHub OAuth Apps, set the redirect URL to something like `http://127.0.0.1:9876/callback` and turn PKCE off. GitHub Apps (not OAuth Apps) do support PKCE.

> [!NOTE]
> Environment variables (<code v-pre>{{token}}</code>) work in all auth fields, so you can store sensitive tokens in environments and reference them here.
