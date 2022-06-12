// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

/**
 * @param {keyof HTMLElementTagNameMap} kind
 * @param {object} [options]
 * @param {string[]} [options.classList]
 * @param {HTMLElement[]} [options.childs]
 * @param {Record<string, any>} [options.attributes]
 * @param {string | null} [options.text]
 * @param {string | null} [options.className]
 * @returns {HTMLElement}
 */
export function createDOMElement(kind = "div", options = {}) {
  const { classList = [], childs = [], attributes = {}, text = null, className = null } = options;

  const el = document.createElement(kind);
  if (className !== null) {
    el.className = className;
  }
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

export function createHeader() {
  const title = createDOMElement("div", {
    className: "title",
    childs: [
      createDOMElement("img", {
        attributes: {
          src: "https://cdn.discordapp.com/attachments/850363535568928768/962763278663188520/Logo_sans_fond2x.png"
        }
      }),
      createDOMElement("p", { text: "NodeSecure wiki" })
    ]
  });

  const ul = createDOMElement("ul", {
    childs: [
      createDOMElement("li", {
        text: "Flags", classList: ["active"],
        attributes: { "data-menu": "flags" }
      }),
      createDOMElement("li", {
        text: "SAST Warnings",
        attributes: { "data-menu": "warnings" }
      })
    ]
  });
  let activeMenu = ul.children[0];

  for (const liElement of ul.children) {
    liElement.addEventListener("click", () => {
      const isActive = liElement.classList.contains("active");
      if (!isActive) {
        const dataMenu = liElement.getAttribute("data-menu");
        activeMenu.classList.remove("active");
        liElement.classList.add("active");

        const target = document.querySelector(`.documentation--${dataMenu}`);
        const current = document.querySelector(`.documentation--${activeMenu.getAttribute("data-menu")}`);
        current.style.display = "none";
        target.style.display = "flex";

        activeMenu = liElement;
      }
    });
  }

  return createDOMElement("div", {
    className: "documentation--header",
    childs: [title, ul]
  });
}

export function createMainContainer(options = {}) {
  const {
    flagsNavFragment = document.createDocumentFragment(),
    warningsNavFragment = document.createDocumentFragment()
  } = options;

  const flagsDocDivContainer = createDOMElement("div", {
    classList: ["documentation--flags", "documentation--sub-container"],
    childs: [
      createDOMElement("div", {
        className: CONSTANTS.DIV_NAVIGATION,
        childs: [flagsNavFragment]
      }),
      createDOMElement("div", { className: CONSTANTS.DIV_CONTENT })
    ]
  });

  const warningsDocDivContainer = createDOMElement("div", {
    classList: ["documentation--warnings", "documentation--sub-container"],
    childs: [
      createDOMElement("div", {
        className: CONSTANTS.DIV_NAVIGATION,
        childs: [warningsNavFragment]
      }),
      createDOMElement("div", { className: CONSTANTS.DIV_CONTENT })
    ]
  });
  warningsDocDivContainer.style.display = "none";

  return createDOMElement("div", {
    classList: ["documentation--main"],
    childs: [
      createHeader(),
      flagsDocDivContainer,
      warningsDocDivContainer
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
    className: "navigation--item",
    attributes: { "data-title": parameters.title },
    childs: [
      createDOMElement("p", { className: "icon", text: parameters.emoji }),
      createDOMElement("p", { className: "description", text: menuName })
    ]
  });
}
