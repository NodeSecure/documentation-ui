import * as documentationUI from "../index.js";

document.addEventListener("DOMContentLoaded", async() => {
  documentationUI.render(document.getElementById("main"), {
    defaultFlagName: "customResolver",
    preCacheAllFlags: true
  });
});
