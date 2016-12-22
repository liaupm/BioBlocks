/***************************************************************************************************************************************************************/
/* Name: oligosynthesize.js																																	   */
/* Developer: Jesús Irimia																																	   */
/* Function: Special function of electrophoresis. Include special inputs for the electrophoresis function.						                                   */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['oligosynthesize'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("OLIGOSYNTHESIZE")
			
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
		    .appendField("destination")
		    .appendField(new Blockly.FieldTextInput("---"), "DESTINATION");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("sequence")
		    .appendField(new Blockly.FieldTextInput("0"), "SEQUENCE");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("scale")
		    .appendField(new Blockly.FieldTextInput("---"), "SCALE");  
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("PURIFICATION")
		    .appendField(new Blockly.FieldTextInput("---"), "PURIFICATION");
		            
	},
	
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['incubate1'] function 
	optionsDisplay_ : function(code, block) {
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                "time of operation: " ' +this.getFieldValue("timeOfOperation") +'", \n';  // Write the next code added to the first code.
		}
		if(this.getFieldValue('DESTINATION')!=null){
			currentCode= currentCode + '                "DESTINATION": " ' +this.getFieldValue("DESTINATION") +'", \n';
		}	
		if( this.getFieldValue('SEQUENCE')!=null){
			currentCode= currentCode + '                "sequence": " ' +this.getFieldValue("SEQUENCE") +'", \n';
		}
		if(this.getFieldValue('SCALE')!=null){
			currentCode= currentCode + '                "scale": " ' +this.getFieldValue("SCALE") +'", \n';
		}
		if(this.getFieldValue('PURIFICATION')!=null){
			currentCode= currentCode + '                "purification": " ' +this.getFieldValue("PURIFICATION") +'"\n';
		}
		return currentCode;
	},
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['incubate1'] function 
	optionsDisplay_naturalLanguage : function(code, block) {
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + ', with the time of operation ' +this.getFieldValue("timeOfOperation")  ;  // Write the next code added to the first code.
		}
		if(this.getFieldValue('DESTINATION')!=null){
			currentCode= currentCode + ', to the destination ' +this.getFieldValue("DESTINATION") ;
		}	
		if( this.getFieldValue('SEQUENCE')!=null){
			currentCode= currentCode + ', with the sequence ' +this.getFieldValue("SEQUENCE") ;
		}
		if(this.getFieldValue('SCALE')!=null){
			currentCode= currentCode + ', in the scale ' +this.getFieldValue("SCALE") ;
		}
		if(this.getFieldValue('PURIFICATION')!=null){
			currentCode= currentCode + ' and purification ' +this.getFieldValue("PURIFICATION") ;
		}
		return currentCode;
	},
	onchange: function() {
		var blockSource = this.getInputTargetBlock('source') //Get the block set in the source
    	if(blockSource!=null){
			var isList1 = blockSource.getInput('contListOption');
        	if(isList1){ //Check if it is a list
	        	var currentBlock
				for(var i=1;i<blockSource.getFieldValue('contListOptionValue')+1;i++){/*Iterate over all inputs in the list*/
					var chain='contListOptionValueNum'+i//Name of the current block
					currentBlock = blockSource.getInputTargetBlock(chain);//Current block got with chain
					if(currentBlock!=null){
						if( currentBlock.getFieldValue('container_type_global')==201){//If it is  AGAROSE
							currentBlock.setParent(null);//Remove the parent of its own parameters
							var dx = Blockly.SNAP_RADIUS * (currentBlock.RTL ? -1 : 1);//calculate the movement of the block in x axis
						    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
						    currentBlock.moveBy(dx, dy); //Move the block with the measures gotten.						
						}
					}
				}
        	}else if(blockSource!=null){
	        	if(blockSource.getFieldValue('container_type_global')==201){//If it is  a list 
	        		blockSource.setParent(null);//Remove the parent of its own parameters
					var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);//calculate the movement of the block in x axis
				    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
				    blockSource.moveBy(dx, dy); //Move the block with the measures gotten.
			    }
    		}
		}
	}
};

