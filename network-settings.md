## Network Settings

Configure proxy servers and TLS certificates in **Settings → General**. Both sections are collapsible — they stay collapsed until you configure them.

### Proxy

Route all HTTP requests through an HTTP or HTTPS proxy. Useful for corporate networks, VPNs, or debugging tools.

| Field | Description |
|-------|-------------|
| **Proxy URL** | The proxy server address, e.g. `http://proxy.corp.com:8080` |
| **Username** | Optional — for proxy servers that require authentication |
| **Password** | Optional — stored encrypted at rest |
| **No Proxy** | Comma-separated list of hosts that bypass the proxy |

**No Proxy patterns:**

- Exact hostname: `localhost`
- Wildcard prefix: `*.local` (matches `foo.local`, `bar.local`)
- Domain suffix: `.corp.com` (matches `api.corp.com`, `internal.corp.com`)
- Match all: `*` (disables proxy for everything — useful for temporary bypass)

> [!NOTE]
> Proxy applies to all HTTP requests (API calls, GraphQL introspection, vault API). WebSocket connections do not currently use the proxy.

### Certificates

Configure custom CA certificates and client certificates for mutual TLS (mTLS).

| Field | Description |
|-------|-------------|
| **CA Certificate** | Trust a custom certificate authority (PEM format) |
| **Client Certificate** | PEM certificate for mTLS client authentication |
| **Client Key** | PEM private key for the client certificate |
| **Key Passphrase** | Optional passphrase for an encrypted private key |

Click **Browse** to select a certificate file. Vaxtly accepts `.pem`, `.crt`, `.cer`, `.key`, `.p12`, and `.pfx` files.

> [!TIP]
> The CA Certificate field is dimmed when **Verify SSL** is off (in the Requests section above). Custom CA certificates only apply when SSL verification is enabled.

**How it works:**

- The **CA certificate** is added to the trust chain, so Vaxtly accepts servers signed by that CA
- **Client certificate + key** are sent to servers that require mTLS authentication
- Client certificates are sent regardless of the Verify SSL setting (mTLS is about client identity, separate from server verification)

> [!WARNING]
> If a configured certificate file is moved or deleted, requests will fail with a descriptive error. Use the **Clear** button to remove stale paths.

### Clearing Settings

Each section shows a **Clear** button when any value is configured. This removes all proxy or certificate settings at once, returning to default behavior.
