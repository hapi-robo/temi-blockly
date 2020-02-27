Blockly.Blocks['speech_say'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Say")
        .appendField(new Blockly.FieldTextInput("hello world"), "utterance");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("Type what you want temi to say");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['locations_goto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Go to")
        .appendField(new Blockly.FieldTextInput("kitchen"), "location");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Command temi to go to a pre-defined location");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['follow_unconstrained'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Follow");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Follow the nearest person in front of temi");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['follow_constrained'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Follow")
        .appendField("(in-place)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("Follow (in-place) the nearest person in front of temi");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Turn temi by a specified angle");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_tilt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tilt")
        .appendField(new Blockly.FieldNumber(0, -15, 55), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Tilt temi by a specified angle. Choose a value between -15 and 55.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['movement_joystick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField("X:")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField("Y:")
        .appendField(new Blockly.FieldNumber(0), "y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("Move temi along the X and Y axis");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['locations_go_home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Return Home");
    this.setPreviousStatement(true, null);
    this.setColour(230);
 this.setTooltip("Command temi to return Home");
 this.setHelpUrl("");
  }
};