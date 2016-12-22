/***************************************************************************************************************************************************************/
/* Name: step.js																																	  	   */
/* Developer: Jesús Irimia																																	   */
/* Function: It contains the steps of the experiment. Also contains all the functions with the respective containers.	 	                                   */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/
Blockly.Blocks['step'] = {
  init: function() {
   
	/*Usual initialization of a common block*/
    this.setInputsInline(false);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.setPreviousStatement(true);
	this.setNextStatement(true);
    this.appendDummyInput("step") 
        .appendField("step")
        .appendField(new Blockly.FieldTextInput("0"), "step")
    this.appendStatementInput("inputOfExperiment");     
  }
};



