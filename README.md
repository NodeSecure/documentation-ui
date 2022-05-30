# Documentation-ui
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/documentation-ui/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/documentation-ui/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/documentation-ui/blob/master/LICENSE)

Portable UI for NodeSecure tools like [CLI](https://github.com/NodeSecure/cli) or [Preview](https://github.com/NodeSecure/preview) (to show be able to show the same guides and documentation to all users whatever the tool they use).

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/documentation-ui
# or
$ yarn add @nodesecure/documentation-ui
```

## Usage example
```js
// Import Third-party Dependencies
import * as documentationUI from "@nodesecure/documentation-ui";

document.addEventListener("DOMContentLoaded", async() => {
  const documentRootElement = document.getElementById("whatever-you-want");

  documentationUI.render(documentRootElement, {
    preCacheAllFlags: true
  });
});
```

The `render` API take an options payload describe by the following TS interface:
```ts
export interface RenderDocumentationUIOptions {
  /**
   * Prefetch all flags and cache them
   *
   * @default true
   */
  preCacheAllFlags?: boolean;
  /**
   * The default NodeSecure flag to load (the first one by default if none selected).
   */
  defaultFlagName?: Flags;
}
```

### Fetch assets required for the bundler
An incomplete example for esbuild.

```js
// Import Third-party Dependencies
import { getBuildConfiguration } from "@nodesecure/documentation-ui/node";
import esbuild from "esbuild";

// Note: all entry points for assets (css etc..).
const { entryPoints } = getBuildConfiguration();

await esbuild.build({
  entryPoints: [
    ...entryPoints
  ]
});
```

## API

### render(rootElement: HTMLElement, options: RenderDocumentationUIOptions): void;
Render the documentation in the given

### VARS
You can retrieve the active menu at any time

```js
import * as documentationUI from "@nodesecure/documentation-ui";

console.log(documentationUI.VARS.activeFlagsMenu);
```

## How to contribute/work on this project
You can use the local `example/` to work on any updates. Just use the `example` npm script:

```bash
$ npm ci
$ npm run example
```

```json
"scripts": {
  "example": "npm run example:build && http-server ./dist",
  "example:build": "node esbuild.config.js"
}
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
