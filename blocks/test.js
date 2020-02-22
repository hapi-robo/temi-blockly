Blockly.Blocks['show_image'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Show image")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};