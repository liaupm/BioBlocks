/***************************************************************************************************************************************************************/
/* Name: centrifugation.js																																	   */
/* Developer: Jesús Irimia								 																									   */
/* Function: Special function of centrifugate. Include special inputs for the centrifugate function.						                                   */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['centrifugation'] = {
	
	init: function() {
		
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("CENTRIFUGATION")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		    
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("speed")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "SPEED")
		    .appendField(" rpm");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("duration")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "DURATION")
		    .appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "Unit_Time");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("time of operation")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "timeOfOperation");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Temperature")
		    .appendField(new Blockly.FieldTextInput("---", Blockly.FieldTextInput.numberValidator), "TEMPERATURE")
		    .appendField(new Blockly.FieldDropdown([["Celsius", "celsius"], ["Kelvin", "kelvin"]]), "Unit_Temp");          
	},
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['centrifugation'] function 	
	optionsDisplay_ : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('SPEED')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                 "speed": " ' +this.getFieldValue("SPEED") +'", \n';  // Write the next code added to the first code.
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			if(this.getFieldValue("Unit_Temp")=="celsius"){
				currentCode= currentCode + '                "temperature": "' +this.getFieldValue("TEMPERATURE")+':' +"celsius"+'", \n';
			}else{
				currentCode= currentCode + '                "temperature": "' +(Number(this.getFieldValue("TEMPERATURE"))+273)+':' +"Celsius"+'", \n';
			}
		}	
		if(this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + '                 "duration": " ' +this.getFieldValue("DURATION")+':'+this.getFieldValue("Unit_Time") +'" \n';
		}
		return currentCode;
	},
	optionsDisplay_naturalLanguage : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('SPEED')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + ' with speed ' +this.getFieldValue("SPEED")+ ' rpm' +', ';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + ' during ' +this.getFieldValue("DURATION") + " " + this.getFieldValue("Unit_Time")+"s" + " " ;
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			if(this.getFieldValue("Unit_Temp")=="celsius"){
				currentCode= currentCode + ', at temperature ' +this.getFieldValue("TEMPERATURE") + " " + this.getFieldValue("Unit_Temp") + " " ;
			}else{
				currentCode= currentCode + ', at temperature ' +(Number(this.getFieldValue("TEMPERATURE"))+273) + " " + this.getFieldValue("Unit_Temp") + " " ;
			}
		}
		if(this.getFieldValue('timeOfOperation')!=null){
			currentCode= currentCode + 'at the time of operation ' +this.getFieldValue("timeOfOperation");
		}
		return currentCode;
	}
};



