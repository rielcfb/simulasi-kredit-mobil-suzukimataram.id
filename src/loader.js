/**
 * this script to load the app to attach it to main web https://suzukimataram.id
 */
export default function simulasiAppLoader() {
  // create container
  var appContainer = document.createElement("div");
  appContainer.id = "simulasiAppContainer";
  document
    .querySelector(".parallax.footer")
    .insertAdjacentElement("beforebegin", appContainer);
}
