## Cookie Jar

Vaxtly automatically manages cookies across requests. Cookies from `Set-Cookie` response headers are captured and sent with subsequent requests to matching domains — just like a browser.

### How It Works

- **Auto-capture** — when a response includes `Set-Cookie` headers, cookies are stored in an in-memory cookie jar
- **Auto-inject** — before each request, matching cookies are added as a `Cookie` header (domain, path, and secure flag are checked per RFC 6265)
- **User headers win** — if you manually set a `Cookie` header on a request, the cookie jar won't override it

### Domain Matching

Cookie domain matching follows RFC 6265:

- **No `Domain` attribute** — the cookie matches only the exact host that set it (e.g., a cookie from `api.example.com` won't be sent to `other.example.com`)
- **With `Domain` attribute** — the cookie matches the specified domain and all subdomains (e.g., `Domain=.example.com` matches `api.example.com`, `staging.example.com`, and `example.com` itself)

Path matching is also enforced: a cookie with `Path=/api` will only be sent to URLs under `/api/`.

### Cookie Jar Viewer

Click the **cookie jar icon** in the sidebar footer toolbar to open the Cookie Jar modal. It shows all stored cookies grouped by domain, with details for each:

- Cookie name and value
- Badges for HttpOnly, Secure, and non-root paths
- Expiry (session cookies show "Session")
- A delete button for individual cookies
- A **Clear All** button to remove everything

### Collection Runner Integration

Cookies flow automatically between sequential requests in the [Collection Runner](/collections-folders#collection-runner). This means session-based workflows (login → use token → access protected resources) work out of the box without manual cookie management.

### Settings

Cookie auto-management is enabled by default. The feature is controlled by the `request.send_cookies` setting (default: `true`).

> [!NOTE]
> Cookies are stored **in memory only** and are cleared when the app restarts. This is a deliberate security choice — cookies may contain session tokens that shouldn't persist on disk.
