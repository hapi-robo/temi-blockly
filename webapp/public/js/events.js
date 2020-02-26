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
 * Start text-to-speech
 */
function buildCode() {
  // generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);

  // @TODO check that code is not empty
  // @TODO Busy indicator: https://www.cssscript.com/minimal-busy-indicator-javascript-css3/
  
  // https://stackoverflow.com/questions/40822025/send-data-to-expressjs-server-to-render-new-view
  // https://github.com/eligrey/FileSaver.js
  jQuery.ajax({
    method: "POST",
    url: "save",
    data: { 
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
 * Init
 */
function init() {
  return
}