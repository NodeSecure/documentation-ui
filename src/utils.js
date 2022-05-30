// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

/**
 * @param {keyof HTMLElementTagNameMap} kind
 * @param {object} [options]
 * @param {string[]} [options.classList]
 * @param {HTMLElement[]} [options.childs]
 * @param {Record<string, any>} [options.attributes]
 * @param {string | null} [options.text]
 * @returns {HTMLElement}
 */
export function createDOMElement(kind = "div", options = {}) {
  const { classList = [], childs = [], attributes = {}, text = null } = options;

  const el = document.createElement(kind);
  classList.forEach((name) => el.classList.add(name));
  childs.forEach((child) => el.appendChild(child));

  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }

  if (text !== null) {
    el.appendChild(document.createTextNode(String(text)));
  }

  return el;
}

export function createMainContainer(navigationFragment = document.createDocumentFragment()) {
  return createDOMElement("div", {
    classList: ["documentation--main"],
    childs: [
      createDOMElement("div", {
        classList: [CONSTANTS.DIV_NAVIGATION],
        childs: [navigationFragment]
      }),
      createDOMElement("div", { classList: [CONSTANTS.DIV_CONTENT] })
    ]
  });
}

/**
 * Create a navigation menu
 * @param {!string} menuName
 * @param {!FlagObject} parameters
 * @returns {HTMLElement}
 */
export function createNavigationMenu(menuName, parameters) {
  return createDOMElement("div", {
    classList: ["navigation--item"],
    attributes: { "data-title": parameters.title },
    childs: [
      createDOMElement("p", { classList: ["icon"], text: parameters.emoji }),
      createDOMElement("p", { classList: ["description"], text: menuName })
    ]
  });
}
