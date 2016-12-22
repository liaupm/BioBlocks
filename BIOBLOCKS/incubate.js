/***************************************************************************************************************************************************************/
/* Name: incubate.js																																	   */
/* Developer: Jesús Irimia																																	   */
/* Function: Special function of incubate. Include special inputs for the incubate function.						                                   */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['incubate'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput("INCUBATE")
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("INCUBATE")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		    
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("time of operation")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "timeOfOperation");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("temperature")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "TEMPERATURE")
		    .appendField(new Blockly.FieldDropdown([["Celsius", "celsius"], ["Kelvin", "kelvin"]]), "Unit_Temp");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("duration")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "DURATION")
		    .appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "Unit_Time");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("shaking speed")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "SHAKINGSPEED");  
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("CO2 percent")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "C02PERCENT");
		            
	},
	
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['incubate1'] function 
	optionsDisplay_ : function(code, block) {
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                "time of operation: " ' +this.getFieldValue("timeOfOperation") +'", \n';  // Write the next code added to the first code.
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			if(this.getFieldValue("Unit_Temp")=="celsius"){
				currentCode= currentCode + '                "temperature": "' +this.getFieldValue("TEMPERATURE")+':' +"celsius"+'", \n';
			}else{
				currentCode= currentCode + '                "temperature": "' +(Number(this.getFieldValue("TEMPERATURE"))+273)+':' +"Celsius"+'", \n';
			}
		}	
		if(this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + '                 "duration": " ' +this.getFieldValue("DURATION")+':'+this.getFieldValue("Unit_Time") +'", \n';
		}
		if(this.getFieldValue('SHAKINGSPEED')!=null){
			currentCode= currentCode + '                "shaking": " ' +this.getFieldValue("SHAKINGSPEED") +'", \n';
		}
		if(this.getFieldValue('C02PERCENT')!=null){
			currentCode= currentCode + '                "c02_percent": " ' +this.getFieldValue("C02PERCENT") +'"\n';
		}
		return currentCode;
	},
	optionsDisplay_naturalLanguage: function(code, block) {
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + 'in the time of operation ' +this.getFieldValue("timeOfOperation") ;  // Write the next code added to the first code.
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			currentCode= currentCode + ', at temperature ' +this.getFieldValue("TEMPERATURE") + " " + this.getFieldValue("Unit_Temp") + " " ;
		}	
		if( this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + 'for ' +this.getFieldValue("DURATION") + " " + this.getFieldValue("Unit_Time")+"s" + " " ;
		}
		if(this.getFieldValue('SHAKINGSPEED')!=null){
			currentCode= currentCode + 'with shaking speed ' +this.getFieldValue("SHAKINGSPEED") +' ';
		}
		if(this.getFieldValue('C02PERCENT')!=null){
			currentCode= currentCode + ' and with a c02 percent of ' +this.getFieldValue("C02PERCENT") ;
		}
		return currentCode;
	}
};

