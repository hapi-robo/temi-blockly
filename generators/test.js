Blockly.JavaScript['speech_say'] = function(block) {
  var text_utterance = block.getFieldValue('utterance');
  var code = `
  TtsRequest ttsRequest = TtsRequest.create("${text_utterance}", false);
  robot.speak(ttsRequest);
  `;

  return code;
};

Blockly.JavaScript['locations_goto'] = function(block) {
  var text_location = block.getFieldValue('location');
  var code = `
  robot.goTo(${text_location});
  `;

  return code;
};

Blockly.JavaScript['media_image'] = function(block) {
  var checkbox_name = block.getFieldValue('NAME') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};