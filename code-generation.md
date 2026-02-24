## Code Generation

Generate ready-to-use code snippets from any request by clicking the `</>` button in the request sub-tab bar. A modal opens with nine language options:

- **cURL** — multi-line command with proper flag formatting
- **Python** — using the `requests` library
- **JavaScript** — using the `fetch` API with async/await
- **Node.js** — using the `axios` library
- **Go** — using `net/http`
- **Ruby** — using `Net::HTTP`
- **PHP** — using Laravel's HTTP facade
- **C#** — using `HttpClient`
- **Java** — using `java.net.http.HttpClient`

The generated code includes all enabled headers, query parameters, body content, and authentication. Disabled entries are excluded. Environment variables are resolved to their actual values before code is generated, so the output is ready to copy and run.

Click **Copy to Clipboard** at the bottom of the modal to copy the snippet. A "Copied!" confirmation appears for 2 seconds.

> [!TIP]
> The code generator respects your auth configuration — Bearer tokens, Basic credentials, API key headers, and OAuth 2.0 tokens are all included in the generated code.
