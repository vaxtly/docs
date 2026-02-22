## Installation

Vaxtly is available for **Windows**, **macOS**, and **Linux**. Each platform offers a recommended package manager install and a manual download option. The package manager method is strongly recommended — it handles updates automatically and avoids OS security warnings that affect unsigned apps.

### Why Package Managers Are Recommended

Vaxtly is not code-signed. Code signing certificates require identity verification programs that aren't available in all countries, and third-party alternatives cost ~$500/year — prohibitive for an independent open-source project. Package managers solve this entirely: they bypass OS security gates (Windows SmartScreen, macOS Gatekeeper) because the package integrity is verified through the package manager's own trust chain.

The app is fully [open source](https://github.com/vaxtly/app) — you can audit every line of code and build it yourself if you prefer.

---

## Windows

### Option 1: Scoop (Recommended)

[Scoop](https://scoop.sh) is a command-line package manager for Windows. It installs apps to your user directory without requiring admin privileges.

```powershell
scoop bucket add vaxtly https://github.com/vaxtly/scoop-bucket
scoop install vaxtly
```

The first command registers the Vaxtly bucket (a repository of install manifests). The second installs the app. You only need to add the bucket once — future installs and updates skip that step.

**Pros:**

- Bypasses Windows SmartScreen completely — no security warnings
- One-command updates with `scoop update vaxtly`
- Clean uninstall with `scoop uninstall vaxtly` — no leftover files or registry entries
- No admin privileges required

**Cons:**

- Requires Scoop to be installed first
- Command-line only — no graphical installer

**Don't have Scoop?** Install it from [scoop.sh](https://scoop.sh). It's a one-liner in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

**Updating:**

```powershell
scoop update vaxtly
```

### Option 2: Direct Download (.exe)

Download the `.exe` installer from [GitHub Releases](https://github.com/vaxtly/app/releases/latest).

**Pros:**

- No prerequisites — just download and run
- Familiar graphical installer

**Cons:**

- **Windows SmartScreen will block the installer** because the app is unsigned. You'll see a blue warning screen — click "More info" then "Run anyway" to proceed. This happens only on first install.
- Manual updates — you need to download and run the new installer each time

> [!WARNING]
> SmartScreen may flag the installer as "unrecognized." This is expected for any unsigned application. The app is open source and the builds are produced by [GitHub Actions CI](https://github.com/vaxtly/app/actions) — you can verify the build pipeline yourself.

---

## macOS

### Option 1: Homebrew (Recommended)

[Homebrew](https://brew.sh) is the standard package manager for macOS.

```bash
brew install vaxtly/tap/vaxtly
```

This taps the Vaxtly formula repository and installs the app in a single command.

**Pros:**

- Bypasses macOS Gatekeeper completely — no quarantine warnings
- One-command updates with `brew upgrade vaxtly`
- Clean uninstall with `brew uninstall vaxtly`
- Handles both Intel and Apple Silicon automatically

**Cons:**

- Requires Homebrew to be installed first
- Command-line only

**Don't have Homebrew?** Install it from [brew.sh](https://brew.sh):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Updating:**

```bash
brew upgrade vaxtly
```

### Option 2: Direct Download (.dmg)

Download the `.dmg` file from [GitHub Releases](https://github.com/vaxtly/app/releases/latest). Open the DMG and drag Vaxtly to your Applications folder.

**Pros:**

- No prerequisites — standard macOS install experience
- Familiar drag-to-Applications flow

**Cons:**

- **Gatekeeper will block the app** because it's unsigned. You need to manually remove the quarantine attribute after downloading (see below)
- Manual updates — you need to download each new version yourself

**Removing the quarantine flag:**

After downloading and moving the app to Applications, run:

```bash
xattr -dr com.apple.quarantine /Applications/Vaxtly.app
```

Without this step, macOS will refuse to open the app and show a dialog saying it "can't be opened because Apple cannot check it for malicious software."

> [!TIP]
> If you prefer not to use the terminal, you can also right-click the app in Finder, select "Open," and then click "Open" in the dialog. This only needs to be done once.

---

## Linux

### Option 1: Snap (Recommended)

[Snap](https://snapcraft.io) is a universal package manager available on most Linux distributions.

```bash
snap install vaxtly
```

**Pros:**

- Automatic updates — Snap handles updates in the background
- Works on any distribution with `snapd` installed (Ubuntu, Fedora, Arch, Debian, openSUSE, etc.)
- Sandboxed — the app runs in a confined environment
- Listed on the [Snap Store](https://snapcraft.io/vaxtly) for discoverability

**Cons:**

- Snap packages use more disk space than native packages (bundles dependencies)
- Slightly slower cold start compared to native packages due to sandboxing
- Requires `snapd` — some distributions (like Linux Mint) disable it by default

**Don't have Snap?** Most Ubuntu-based distributions include it. For others:

```bash
# Debian / Ubuntu (if not pre-installed)
sudo apt install snapd

# Fedora
sudo dnf install snapd
sudo ln -s /var/lib/snapd/snap /snap

# Arch
sudo pacman -S snapd
sudo systemctl enable --now snapd.socket
```

**Updating:**

Snap updates automatically. To force an immediate update:

```bash
snap refresh vaxtly
```

### Option 2: AppImage

Download the `.AppImage` file from [GitHub Releases](https://github.com/vaxtly/app/releases/latest).

```bash
chmod +x Vaxtly-*.AppImage
./Vaxtly-*.AppImage
```

**Pros:**

- Universal — runs on virtually any Linux distribution
- No installation required — it's a single executable file
- No root privileges needed
- Fully portable — put it on a USB drive and run it anywhere

**Cons:**

- No automatic updates — you need to download new versions manually
- No desktop integration by default (no app icon in your launcher). You can use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) or create a `.desktop` file manually
- Larger file size since it bundles all dependencies

> [!TIP]
> For desktop integration, consider [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) — it automatically integrates AppImages into your application menu when you first run them.

### Option 3: .deb Package

Download the `.deb` file from [GitHub Releases](https://github.com/vaxtly/app/releases/latest). Best suited for Debian-based distributions (Debian, Ubuntu, Pop!_OS, Linux Mint, Elementary OS).

```bash
sudo dpkg -i vaxtly_*.deb
```

Or with `apt` (handles dependencies automatically):

```bash
sudo apt install ./vaxtly_*.deb
```

**Pros:**

- Native system integration — app icon, file associations, and menu entry are set up automatically
- Fastest startup time — no sandboxing overhead
- Smallest footprint — uses shared system libraries

**Cons:**

- Debian-based distributions only (`.deb` won't work on Fedora, Arch, etc.)
- No automatic updates — you need to download and install new `.deb` files manually
- Requires root privileges to install

---

## Comparison Table

| | Auto-updates | No security warnings | No prerequisites | No root needed |
|---|---|---|---|---|
| **Windows — Scoop** | `scoop update` | Yes | Scoop | Yes |
| **Windows — .exe** | No | No (SmartScreen) | None | Yes |
| **macOS — Homebrew** | `brew upgrade` | Yes | Homebrew | Yes |
| **macOS — .dmg** | No | No (Gatekeeper) | None | Yes |
| **Linux — Snap** | Automatic | Yes | snapd | No (initial) |
| **Linux — AppImage** | No | Yes | None | Yes |
| **Linux — .deb** | No | Yes | None | No |

---

## Building From Source

If you prefer to build Vaxtly yourself:

```bash
git clone https://github.com/vaxtly/app.git
cd app
npm install
npm run build
```

The build output will be in the `dist/` directory. See the [repository README](https://github.com/vaxtly/app) for full build instructions and requirements.

---

## Verifying Downloads

All release artifacts are built by [GitHub Actions](https://github.com/vaxtly/app/actions) in a clean CI environment. You can verify the integrity of any download by:

1. Checking the [Actions run](https://github.com/vaxtly/app/actions) that produced the release
2. Comparing file checksums listed in the release notes (when available)
3. Building from source and comparing the output

> [!NOTE]
> Vaxtly does not phone home, check for updates itself, or send any telemetry. If you install via direct download, check [GitHub Releases](https://github.com/vaxtly/app/releases) periodically for new versions, or watch the repository for release notifications.
