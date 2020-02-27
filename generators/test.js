Blockly.JavaScript['speech_say'] = function(block) {
  var text_utterance = block.getFieldValue('utterance');
  var code = `robot.speak(TtsRequest.create("${text_utterance}", false));\n`;
  return code;
};

Blockly.JavaScript['locations_goto'] = function(block) {
  var text_location = block.getFieldValue('location');
  var code = `robot.goTo("${text_location}");\n`;
  // @TODO Add wait
  return code;
};

Blockly.JavaScript['follow_unconstrained'] = function(block) {
  var code = `robot.beWithMe();\n`;
  return code;
};

Blockly.JavaScript['follow_constrained'] = function(block) {
  var code = `robot.constraintBeWith();\n`;
  return code;
};

Blockly.JavaScript['movement_turn'] = function(block) {
  var number_angle = block.getFieldValue('angle');
  var code = `robot.turnBy(${number_angle});\n`;
  return code;
};

Blockly.JavaScript['movement_tilt'] = function(block) {
  var number_angle = block.getFieldValue('angle');
  var code = `robot.tiltBy(${number_angle});\n`;
  return code;
};

Blockly.JavaScript['movement_joystick'] = function(block) {
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  var code = `robot.skidJoy(${number_x}, ${number_y});\n`;
  return code;
};

Blockly.JavaScript['locations_go_home'] = function(block) {
  var code = `robot.goTo('home base');\n`;
  return code;
};