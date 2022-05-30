// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

// CONSTANTS
const kRawGithubFlagsURL = "https://raw.githubusercontent.com/NodeSecure/flags/main/src/flags";

/** @type {Map<string, string>} */
export const cache = new Map();

/**
 * Fetch NodeSecure flags on Github
 *
 * @param {!string} title flag title
 * @param {object} [options]
 * @param {boolean} [options.cacheReponse=true] Set the HTML Response in cache and memoize the response for next call.
 * @returns {Promise<string>}
 */
export async function fetchNodeSecureFlagByTitle(title, options = {}) {
  const { cacheReponse = true } = options;

  if (cacheReponse && cache.has(title)) {
    return cache.get(title);
  }

  const httpResponse = await fetch(`${kRawGithubFlagsURL}/${title}.html`);
  const htmlResponse = await httpResponse.text();
  if (cacheReponse) {
    cache.set(title, htmlResponse);
  }

  return htmlResponse;
}

/**
 *
 * @param {!HTMLElement} menuElement
 * @returns {void}
 */
export async function fetchAndRenderByMenu(menuElement) {
  const htmlResponse = await fetchNodeSecureFlagByTitle(
    menuElement.getAttribute("data-title")
  );

  const [documentContentElement] = document.getElementsByClassName(CONSTANTS.DIV_CONTENT);
  documentContentElement.innerHTML = htmlResponse;
}
