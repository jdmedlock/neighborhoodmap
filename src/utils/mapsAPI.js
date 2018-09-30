
/**
 * @description Add a <script> tag to the DOM
 * @param {String} url URL of the script source location
 * @param {function} callback Optional `onload` callback function
 */
const addScriptToDOM = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  if ( callback ) {
    script.onload = callback;
  }
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = url;
};

export { addScriptToDOM };