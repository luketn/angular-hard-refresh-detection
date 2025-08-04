# Angular Hard Refresh Detection

This project is a small Angular application that detects whether a page load was triggered by a hard browser refresh (e.g. F5 or Ctrl‑R) or by in-app navigation. The `HardRefreshService` examines the browser's Performance Navigation API to make this determination.

## Local development

```bash
npm install
npm start
```

Open <http://localhost:4200> to see the app in action. Changes in the source code trigger a live reload.

## How it works

`HardRefreshService` checks `performance.getEntriesByType('navigation')` and falls back to the legacy `performance.navigation` API. If the navigation type is reported as `reload`, the service exposes that state through `isHardRefresh()` so components can react to a full page reload.

## Building

```bash
npm run build
```

The optimized application is emitted to `dist/angular-hard-refresh-detection`.

## Continuous deployment with GitHub Pages

The repository is configured to publish the site using [GitHub Pages](https://pages.github.com/). A GitHub Actions workflow builds the project and deploys the contents of `dist/angular-hard-refresh-detection` whenever the `main` branch receives a push.

To enable Pages on your fork:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions**.

The workflow file lives at `.github/workflows/deploy.yml` and runs:

```yaml
npm run build -- --configuration production --base-href "/angular-hard-refresh-detection/"
```

Adjust the `baseHref` if you rename the repository.
