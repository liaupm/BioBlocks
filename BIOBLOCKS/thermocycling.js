/***************************************************************************************************************************************************************/
/* Name: thermocycling.js																																	   */
/* Developer: Jesús Irimia																																	   */
/* Function: Special function of thermocycling.. Include special inputs for the thermocycling. function.						                                   */	
/*																																							   */
/*				 																																               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['thermocycling'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("THERMOCYCLING")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Time of operation")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "timeOfOperation");  
		this.appendDummyInput("cycles")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("cycles")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "CYCLES");
		
		          
	},
	
	optionsDisplay_ : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		//alert("HEHRH");
		/*Special thermocycling*/
				
		if( currentBlock.getFieldValue('steps')!=null){
			currentCode= currentCode + '                "groups": [{\n                    "cycles": ' + this.getFieldValue('CYCLES')+',\n                    "steps: [{\n'
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode + '                             "duration": " ' +currentBlock.getFieldValue("duration"+i) +'", \n'	
				currentCode= currentCode + '                             "temperature": " ' +currentBlock.getFieldValue("temperature"+i) +'"\n                    },{ \n'
			}
			currentCode = currentCode.substring(0,currentCode.length-5);
			currentCode = currentCode + '}]\n                  }]\n';
		}
		return currentCode;
		
	},
	optionsDisplay_naturalLanguage : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		//alert("HEHRH");
		/*Special thermocycling*/
		
		if( currentBlock.getFieldValue('steps')!=null){
			currentCode= currentCode + ' with ' + this.getFieldValue('CYCLES')+' cycles with the following steps:'
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode +" step "+ (i+1) +': duration ' +currentBlock.getFieldValue("duration"+i) +' time scale(()) ';	
				currentCode= currentCode + ' and ' +currentBlock.getFieldValue("temperature"+i) +' degrees ';
			}
		}
		return currentCode;
	}
};


