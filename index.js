// Import Third-party Dependencies
import { getManifest } from "@nodesecure/flags/web";

// Import Internal Dependencies
import * as utils from "./src/utils.js";
import { fetchNodeSecureFlagByTitle, fetchAndRenderByMenu } from "./src/fetch.js";

export const VARS = Object.seal({
  /** @type {HTMLElement} */
  activeFlagsMenu: null,
  /** @type {HTMLElement} */
  activeWarningsMenu: null
});

// CONSTANTS
const kSASTWarnings = [
  "parsing-error",
  "unsafe-import",
  "unsafe-regex",
  "unsafe-stmt",
  "unsafe-assign",
  "encoded-literal",
  "short-identifiers",
  "suspicious-literal",
  "obfuscated-code",
  "weak-crypto"
];

/**
 * @description Render the documentation module in a given container
 * @param {!HTMLElement} rootElement
 * @param {object} [options]
 * @param {string} [options.defaultFlagName]
 * @param {boolean} [options.preCacheAllFlags=true]
 * @returns {void}
 */
export function render(rootElement, options = {}) {
  const { preCacheAllFlags = false, defaultFlagName = null } = options;

  /**
   * Generate the left side navigation menu for NodeSecure flags
   */
  const flagsNavFragment = document.createDocumentFragment();
  for (const [emojiName, emojiParameters] of Object.entries(getManifest())) {
    if (preCacheAllFlags) {
      fetchNodeSecureFlagByTitle(emojiParameters.title).catch(console.error);
    }

    const menu = utils.createNavigationMenu(emojiName, emojiParameters);
    menu.addEventListener("click", () => setFlagsNavigationMenu(menu));

    if (VARS.activeFlagsMenu === null && (defaultFlagName === null || defaultFlagName === emojiName)) {
      VARS.activeFlagsMenu = menu;
      menu.classList.add("active");
    }
    flagsNavFragment.appendChild(menu);
  }
  fetchAndRenderByMenu(VARS.activeFlagsMenu, "flags").catch(console.error);

  /**
   * Generate the left side navigation menu for NodeSecure SAST Warnings
   */
  const warningsNavFragment = document.createDocumentFragment();
  for (const warningName of kSASTWarnings) {
    const menu = utils.createNavigationMenu(warningName, { title: warningName, emoji: "" });
    menu.addEventListener("click", () => setWarningsNavigationMenu(menu));
    if (VARS.activeWarningsMenu === null) {
      VARS.activeWarningsMenu = menu;
      menu.classList.add("active");
    }

    warningsNavFragment.appendChild(menu);
  }
  fetchAndRenderByMenu(VARS.activeWarningsMenu, "warnings").catch(console.error);

  const mainContainer = utils.createMainContainer({
    flagsNavFragment,
    warningsNavFragment
  });
  for (const node of rootElement.childNodes) {
    node.remove();
  }
  rootElement.appendChild(mainContainer);
}

/**
 * @param {!HTMLElement} menu
 */
function setFlagsNavigationMenu(menu) {
  if (menu === VARS.activeFlagsMenu) {
    return;
  }

  VARS.activeFlagsMenu.classList.remove("active");
  menu.classList.add("active");
  VARS.activeFlagsMenu = menu;

  fetchAndRenderByMenu(VARS.activeFlagsMenu, "flags").catch(console.error);
}

/**
 * @param {!HTMLElement} menu
 */
function setWarningsNavigationMenu(menu) {
  if (menu === VARS.activeWarningsMenu) {
    return;
  }

  VARS.activeWarningsMenu.classList.remove("active");
  menu.classList.add("active");
  VARS.activeWarningsMenu = menu;

  fetchAndRenderByMenu(VARS.activeWarningsMenu, "warnings").catch(console.error);
}
