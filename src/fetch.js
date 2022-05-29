// CONSTANTS
const kRawGithubFlagsURL = "https://raw.githubusercontent.com/NodeSecure/flags/main/src/flags";

/**
 * @param {!string} flagTitle
 * @returns {Promise<string>}
 */
export async function fetchFlagHTML(flagTitle) {
  const httpResponse = await fetch(`${kRawGithubFlagsURL}/${flagTitle}.html`);
  const htmlResponse = await httpResponse.text();

  return htmlResponse;
}
