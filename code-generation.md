## Code Generation

Generate ready-to-use code snippets from any request by clicking the `</>` button in the request sub-tab bar. A modal opens with five language options:

- **cURL** — multi-line command with proper flag formatting
- **Python** — using the `requests` library
- **PHP** — using Laravel's HTTP facade
- **JavaScript** — using the `fetch` API with async/await
- **Node.js** — using the `axios` library

The generated code includes all enabled headers, query parameters, body content, and authentication. Disabled entries are excluded. Environment variables are resolved to their actual values before code is generated, so the output is ready to copy and run.

Click **Copy to Clipboard** at the bottom of the modal to copy the snippet. A "Copied!" confirmation appears for 2 seconds.

> [!TIP]
> **Tip:** The code generator respects your auth configuration — Bearer tokens, Basic credentials, and API key headers are all included in the generated code.
