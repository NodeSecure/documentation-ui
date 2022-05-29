/* eslint-disable no-inline-comments */
// Import Third-party Dependencies
import { getManifest } from "@nodesecure/flags/web";

// Import Internal Dependencies
import * as utils from "./src/utils.js";
import { fetchFlagHTML } from "./src/fetch.js";

/** @type {HTMLElement} */
export let activeNavigation = null;

/** @type {Map<string, string>} */
export const cacheMap = new Map();

/**
 * @description Render the documentation module in a given container
 * @param {!HTMLElement} containerElement
 * @param {object} [options]
 * @param {boolean} [options.preCacheAllFlags=true]
 * @returns {void}
 */
export function renderDocumentationUI(containerElement, options = {}) {
  const { preCacheAllFlags = false } = options;

  containerElement.innerHTML = /* html */`
    <div class="documentation--main">
      <div class="documentation--navigation"></div>
      <div class="documentation--content"></div>
    </div>
  `;

  /**
   * CREATE Navigation
   */
  {
    const navigationContainer = containerElement.querySelector(".documentation--navigation");
    const navigationFragment = document.createDocumentFragment();
    for (const [emojiName, emojiParameters] of Object.entries(getManifest())) {
      if (preCacheAllFlags) {
        fetchFlagHTML(emojiParameters.title)
          .then((htmlResponse) => cacheMap.set(emojiParameters.title, htmlResponse))
          .catch(console.error);
      }

      const menu = utils.createNavigationMenu(emojiName, emojiParameters.emoji);
      menu.addEventListener("click", () => onNavigationMenuClick(menu, emojiParameters));

      if (activeNavigation === null) {
        activeNavigation = {
          dom: menu,
          parameters: emojiParameters
        };
        menu.classList.add("active");
      }
      navigationFragment.appendChild(menu);
    }
    navigationContainer.appendChild(navigationFragment);

    fetchActiveNavigationContent().catch(console.error);
  }
}

async function fetchActiveNavigationContent() {
  const htmlResponse = cacheMap.has(activeNavigation.parameters.title) ?
    cacheMap.get(activeNavigation.parameters.title) :
    await fetchFlagHTML(activeNavigation.parameters.title);

  console.log(htmlResponse);
  const documentContentElement = document.getElementsByClassName("documentation--content");
  if (documentContentElement.length === 0) {
    return;
  }
  documentContentElement[0].innerHTML = htmlResponse;
}

/**
 * @param {!HTMLElement} menu
 */
function onNavigationMenuClick(menu, parameters) {
  if (menu === activeNavigation.dom) {
    return;
  }

  activeNavigation.dom.classList.remove("active");
  menu.classList.add("active");
  activeNavigation = {
    dom: menu,
    parameters
  };

  fetchActiveNavigationContent().catch(console.error);
}
