/***************************************************************************************************************************************************************/
/* Name: electrophoresis.js																																	   */
/* Developer: Jesús Irimia																																	   */
/* Function: Special function of electrophoresis. Include special inputs for the electrophoresis function.						                                   */	
/*																																							   */
/*														 																						               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['electrophoresis'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("ELECTROPHORESIS")
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
		    .appendField("ladder")
		    .appendField(new Blockly.FieldTextInput("---"), "LADDER");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("field strength")
		    .appendField(new Blockly.FieldTextInput("0"), "FIELDSTRENGTH");    
		
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("duration")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "DURATION")
		    .appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "Unit_Time");
		this.appendValueInput("DATAREFERENCE")
		    .setAlign(Blockly.ALIGN_RIGHT)
	    	.appendField("data reference");
		           
	},
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
	optionsDisplay_ : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){  //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                 "time of operation": " ' +this.getFieldValue("timeOfOperation") +'", \n';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('LADDER')!=null){
			currentCode= currentCode + '                 "ladder": " ' +this.getFieldValue("LADDER") +'", \n';
		}
		if( this.getFieldValue('FIELDSTRENGTH')!=null){
			currentCode= currentCode + '                 "field_strength": " ' +this.getFieldValue("FIELDSTRENGTH") +'", \n';
		}
		if(this.getInputTargetBlock('DATAREFERENCE')!=null){
			currentCode= currentCode + '                 "dataref": " ' +this.getInputTargetBlock("DATAREFERENCE").getFieldValue('NUM') +'", \n';
		}
		if(this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + '                 "duration": " ' +this.getFieldValue("DURATION")+':'+this.getFieldValue("Unit_Time") +'" \n';
		}
		
		return currentCode;
	},
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
	optionsDisplay_naturalLanguage : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){  //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + ' in the time of operation ' +this.getFieldValue("timeOfOperation");  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('LADDER')!=null){
			currentCode= currentCode + ', with a ladder ' +this.getFieldValue("LADDER");
		}
		if( this.getFieldValue('FIELDSTRENGTH')!=null){
			currentCode= currentCode + ', with field strength ' +this.getFieldValue("FIELDSTRENGTH") ;
		}
		if( this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + ' during ' +this.getFieldValue("DURATION") + " " + this.getFieldValue("Unit_Time")+"s" + " " ;
		}
		if(this.getFieldValue('DATAREFERENCE')!=null){
			currentCode= currentCode + ', and a dataref ' +this.getFieldValue("DATAREFERENCE") ;
		}
		return currentCode;
	}
};


	