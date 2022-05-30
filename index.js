// Import Third-party Dependencies
import { getManifest } from "@nodesecure/flags/web";

// Import Internal Dependencies
import * as utils from "./src/utils.js";
import { fetchNodeSecureFlagByTitle, fetchAndRenderByMenu } from "./src/fetch.js";

export const VARS = Object.seal({
  /** @type {HTMLElement} */
  activeFlagsMenu: null
});

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
  const navigationFragment = document.createDocumentFragment();
  for (const [emojiName, emojiParameters] of Object.entries(getManifest())) {
    if (preCacheAllFlags) {
      fetchNodeSecureFlagByTitle(emojiParameters.title).catch(console.error);
    }

    const menu = utils.createNavigationMenu(emojiName, emojiParameters);
    menu.addEventListener("click", () => setNewNavigationMenu(menu));

    if (VARS.activeFlagsMenu === null && (defaultFlagName === null || defaultFlagName === emojiName)) {
      VARS.activeFlagsMenu = menu;
      menu.classList.add("active");
    }
    navigationFragment.appendChild(menu);
  }

  fetchAndRenderByMenu(VARS.activeFlagsMenu).catch(console.error);

  const mainContainer = utils.createMainContainer(navigationFragment);
  for (const node of rootElement.childNodes) {
    node.remove();
  }
  rootElement.appendChild(mainContainer);
}

/**
 * @param {!HTMLElement} menu
 */
function setNewNavigationMenu(menu) {
  if (menu === VARS.activeFlagsMenu) {
    return;
  }

  VARS.activeFlagsMenu.classList.remove("active");
  menu.classList.add("active");
  VARS.activeFlagsMenu = menu;

  fetchAndRenderByMenu(VARS.activeFlagsMenu).catch(console.error);
}
