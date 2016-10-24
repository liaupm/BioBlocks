/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Polit�cnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file It contains the steps of the experiment. Also contains all the functions with the respective containers.
 * @author Vishal Gupta, Jes�s Irimia, Iv�n Pau, Alfonso Rodr�guez-Pat�n, �ngel Panizo <contactLIAUPM@gmail.com>
 */
Blockly.Blocks['experiment'] = {
  init: function() {
   
	/*Usual initialization of a common block*/
	this.appendDummyInput("Experiment")
		.setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Experiment"); //name of the block
    this.setInputsInline(false);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.appendDummyInput("experimentName")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Name/Reference")
			.appendField(new Blockly.FieldTextInput("insert name"), "experimentName");
    this.appendStatementInput("inputOfExperiment");
   
  },
  onchange : function(){
  		myOwnFunction1();
  		myOwnFunction2();
  		myOwnFunction3();
	}
};




