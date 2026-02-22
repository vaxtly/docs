## Vault Integration

Vaxtly can sync environment variables with an external secrets manager so sensitive values (API keys, database passwords, tokens) never live in the local database. Two providers are supported: **HashiCorp Vault** and **AWS Secrets Manager**.

### Choosing a Provider

Open **Settings → Vault**. At the top of the page you will see a **Provider** toggle with two options: **HashiCorp Vault** and **AWS Secrets Manager**. Select the one you use and the form below will update to show the relevant fields.

---

### HashiCorp Vault

Works with open-source Vault, Vault Enterprise, and HCP Vault (KV v1 and v2 secrets engines).

Fill in the following fields:

- **Vault URL** — The base URL of your Vault server, e.g. `https://vault.example.com` or `https://vault-cluster.vault.xxxxx.aws.hashicorp.cloud:8200`. Do not include a trailing slash or any path.
- **Authentication** — Choose **Token** (direct Vault token) or **AppRole** (Role ID + Secret ID). AppRole is recommended for automated or shared environments.
- **Token** — Your Vault token (for Token auth). Starts with `hvs.` for service tokens.
- **Role ID / Secret ID** — Your AppRole credentials (for AppRole auth).
- **Namespace** — *Optional, AppRole only.* The Vault namespace used during AppRole login (sent as `X-Vault-Namespace` header). Only needed if your AppRole is in a specific namespace. Leave empty for token auth or if the AppRole is in the root namespace.
- **Engine Path** — The **full mount path** to the KV secrets engine. This is the complete path as it appears in the Vault URL, including any namespace prefixes. For example: `secret`, `admin/kv`, or `organization/team/kv-engine`. For HCP Vault and Vault Enterprise with namespaces, include the full path from the root (e.g. `admin/my-namespace/secret`).
- **Verify SSL** — Validate the server's TLS certificate. Disable only for self-signed certificates in development.
- **Auto Sync** — When enabled, automatically pulls secrets from Vault on application startup.

> [!NOTE]
> **Important:** The **Namespace** field is only used during AppRole authentication. For all data operations (list, read, write, delete), Vaxtly uses the **Engine Path** directly. If your KV engine is nested inside Vault namespaces, include the full namespace path in the Engine Path field, not in the Namespace field.

> [!TIP]
> **Tip:** Vaxtly automatically tries both KV v2 and KV v1 API formats when listing secrets, so it works with either engine version without extra configuration.

---

### AWS Secrets Manager

AWS Secrets Manager is a fully managed service that stores secrets as JSON objects in the AWS cloud. Each Vaxtly environment maps to one AWS secret whose value is a JSON object with key-value pairs.

**How secrets are stored:** Vaxtly stores every environment as a single secret in AWS Secrets Manager. The secret name matches the environment's vault path (by default, a slugified version of the environment name). The secret value is a JSON object where each key is a variable name and each value is the variable's value. For example, an environment called "Production" would be stored as a secret named `production` with the content:

`{"DB_HOST": "db.prod.internal", "API_KEY": "sk-live-abc123"}`

Fill in the following fields:

- **Region** — The AWS region where your secrets are stored (e.g. `us-east-1`, `eu-west-1`, `ap-southeast-1`). You can find this in the AWS Console URL bar or in your AWS CLI config. If you are unsure, check your AWS Console: open Secrets Manager and look at the region name in the top-right corner of the page.
- **Authentication** — Choose one of three methods:
  - **Access Keys** — Paste an IAM Access Key ID (starts with `AKIA`) and its Secret Access Key. Best for quick setup or CI/headless environments.
  - **Profile** — Enter the name of an AWS CLI named profile from your `~/.aws/credentials` file (e.g. `default`, `production`). Best if you already have the AWS CLI configured.
  - **Default Chain** — Uses the AWS SDK default credential chain: environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), the default profile in `~/.aws/credentials`, or EC2/ECS instance roles. Best for server deployments or when credentials are managed externally.
- **Auto Sync** — When enabled, automatically pulls secrets from AWS on application startup.

> [!NOTE]
> **Important:** You must explicitly select an authentication method and fill in its required fields before Vaxtly will attempt to connect to AWS. Simply browsing this settings page does not trigger any AWS calls.

---

### Step-by-Step: Creating an AWS IAM User for Vaxtly

If you don't already have AWS credentials, follow these steps to create a dedicated IAM user with the minimum permissions Vaxtly needs:

- **1.** Open the **AWS Console** and go to **IAM → Users → Create user**.
- **2.** Enter a name (e.g. `vaxtly-secrets`) and click **Next**.
- **3.** Choose **Attach policies directly**, then click **Create policy**.
- **4.** In the policy editor, switch to the **JSON** tab and paste this policy (replace `123456789012` with your actual AWS account ID and `us-east-1` with your region):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:ListSecrets",
        "secretsmanager:GetSecretValue",
        "secretsmanager:PutSecretValue",
        "secretsmanager:CreateSecret",
        "secretsmanager:DeleteSecret"
      ],
      "Resource": "*"
    }
  ]
}
```

- **5.** Name the policy (e.g. `VaxtlySecretsManagerAccess`), create it, then go back and attach it to your new user.
- **6.** On the user summary page, go to **Security credentials → Create access key**. Choose **Application running outside AWS**.
- **7.** Copy the **Access Key ID** and **Secret Access Key**.
- **8.** In Vaxtly → Settings → Vault, select **AWS Secrets Manager**, choose **Access Keys** as the authentication method, and paste your credentials.

> [!TIP]
> **Tip:** To restrict access to specific secrets instead of all secrets, replace `"Resource": "*"` in the policy with a specific ARN pattern, e.g. `"Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:myapp/*"`. This limits Vaxtly to secrets whose names start with `myapp/`.

---

### Step-by-Step: Using an Existing AWS CLI Profile

If you already have the AWS CLI installed and configured, you can skip creating access keys and just point Vaxtly at an existing profile:

- **1.** Open a terminal and run `aws configure list-profiles` to see your available profiles.
- **2.** Pick the profile that has access to Secrets Manager (or use `default`).
- **3.** In Vaxtly → Settings → Vault, select **AWS Secrets Manager** as the provider.
- **4.** Enter the **Region** (e.g. `us-east-1`).
- **5.** Choose **Profile** as the authentication method and type the profile name.
- **6.** Click **Test Connection**. If it succeeds, click **Save**.

> [!NOTE]
> **Note:** If your credentials come from environment variables or a `default` profile, choose **Default Chain** as the authentication method instead. Vaxtly will not attempt to connect to AWS unless you explicitly choose an authentication method.

---

### Step-by-Step: Creating Your First Secret in AWS

If you want to create secrets directly in the AWS Console before pulling them into Vaxtly:

- **1.** Open the **AWS Console** and go to **Secrets Manager** (search for it in the top search bar).
- **2.** Make sure you are in the correct **region** (top-right corner of the console).
- **3.** Click **Store a new secret**.
- **4.** Choose **Other type of secret**, then select **Plaintext** and paste a JSON object with your variables, for example:

`{"DB_HOST": "db.prod.internal", "DB_PASSWORD": "s3cret", "API_KEY": "sk-live-abc123"}`

- **5.** Click **Next**. For the secret name, use a simple slug like `production` or `staging`. This name will become the environment name in Vaxtly when you pull.
- **6.** Skip rotation settings and click **Store**.
- **7.** In Vaxtly, go to **Settings → Vault**, make sure AWS is configured, and click **Pull All**. Your new secret will appear as a Vaxtly environment.

---

### Testing the Connection

Click **Test Connection** to verify your configuration. For HashiCorp Vault this checks authentication and engine path. For AWS Secrets Manager this verifies that Vaxtly can list secrets using your credentials and region. The test will show descriptive error messages for common issues like invalid credentials, wrong region, or network problems.

### Pull & Push Secrets

**Pull All** lists all secrets from your provider and creates a local environment for each one that doesn't already exist. Use this for initial setup or to discover new secrets added by teammates.

**Push** sends your local environment variables to the provider. You can push from individual environment editors (for synced environments) or use the Vault settings tab for bulk operations.

---

### Vault-Synced Environments

When editing an environment, you can enable **Vault Sync** (the toggle says "Sync variables with HashiCorp Vault" or "Sync variables with AWS Secrets Manager" depending on your provider). This links the environment to a specific secret path. The path defaults to a slugified version of the environment name, but you can customize it.

With sync enabled, **Save** pushes variables to the provider instead of writing them to the local database. The **Pull from Vault** button fetches fresh values from the provider.

---

### Migrate Path

If you need to move secrets between paths (e.g., after renaming an environment), use the **Migrate** feature to copy secrets from the old path to the new one and delete the old path, without manual re-entry.

### Workspace-Scoped Configuration

Each workspace can have its own vault provider and credentials. When you save vault settings inside a workspace, those settings override the global defaults for that workspace only. This lets you connect different workspaces to different AWS accounts or Vault servers. A banner at the top indicates when you are viewing inherited global defaults.

---

### How Secrets Are Stored Locally

Vaxtly **never writes secret values to the local database**. When vault sync is enabled, the database only stores metadata (environment name, vault path, sync status). Actual secret values are held in memory for the current session and fetched fresh from the provider on each app launch (or when you pull manually). This means if someone gains access to your Vaxtly database file, they will not find any secret values.

> [!NOTE]
> **Note:** Your vault credentials (Vault token, AWS access keys) are stored locally, but they are encrypted at rest using AES-256-CBC backed by your operating system's secure key storage.
