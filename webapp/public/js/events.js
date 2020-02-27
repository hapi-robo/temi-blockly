/**
 * Front-end event listeners
 *
 * Listens to webapp events (e.g. clicks, reload, etc.)
 *
 */

var demoWorkspace = Blockly.inject('blocklyDiv',
      {media: '/blockly/media/',
      toolbox: document.getElementById('toolbox')});

/**
 * Generate code and send request to server to build the application
 */
function buildCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  const app_name = document.getElementById('app-name-input').value;
  const code = Blockly.JavaScript.workspaceToCode(demoWorkspace);

  console.log(app_name)
  // @TODO check that code is not empty
  // @TODO Busy indicator: https://www.cssscript.com/minimal-busy-indicator-javascript-css3/
  
  // https://stackoverflow.com/questions/40822025/send-data-to-expressjs-server-to-render-new-view
  // https://github.com/eligrey/FileSaver.js
  jQuery.ajax({
    method: "POST",
    url: "save",
    data: { 
      app_name: app_name,
      code: code
    },
    success: function(data) {
      console.log(data);
    },
    error: function(e) {
      console.log(e.message);
    }
  })
}

/**
 * Download Button
 */
function download() {
  location.href = "/static/downloads/test.apk"
}

/**
 * Init
 */
function init() {
  return
}