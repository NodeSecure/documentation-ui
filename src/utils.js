
/**
 * Create a navigation menu
 * @param {!string} menuName
 * @param {!string} menuIcon
 * @returns {HTMLElement}
 */
export function createNavigationMenu(menuName, menuIcon) {
  const navigationItem = document.createElement("div");
  navigationItem.className = "navigation--item";

  const iconParagraph = document.createElement("p");
  iconParagraph.className = "icon";
  iconParagraph.textContent = menuIcon;

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.className = "description";
  descriptionParagraph.textContent = menuName;

  navigationItem.appendChild(iconParagraph);
  navigationItem.appendChild(descriptionParagraph);

  return navigationItem;
}
