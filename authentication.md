## Authentication

The Auth tab supports four authentication methods, selectable via buttons at the top:

- **None** — no authentication header
- **Bearer Token** — sends `Authorization: Bearer <token>`. A single token input field.
- **Basic Auth** — sends base64-encoded `Authorization: Basic <credentials>`. Username and password fields (password is masked).
- **API Key** — sends a custom header with your API key. You specify both the header name (e.g., `X-API-Key`) and the value.

The selected auth method generates an implicit header shown in the Headers tab's "Auto-generated" section. If you add a manual `Authorization` header, it overrides the auto-generated one.

All auth input fields support `<span v-pre>{{variable}}</span>` substitution with inline highlighting, so you can reference tokens stored in environments.

Auth credentials are **encrypted at rest** using AES-256-CBC. Tokens and passwords stored in the database use an `enc:` prefix and are decrypted transparently when read.

> [!NOTE]
> **Note:** Environment variables (`<span v-pre>{{token}}</span>`) work in all auth fields, so you can store sensitive tokens in environments and reference them here.
