/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR FUNCTION***************************************/
/**********************************************************************************************************/
/********************The most of the operational blocks use this function to write ************************/
/********************the intern natural languagecode because keep the same structure***********************/
/**********************************************************************************************************/
regularNaturalLanguageTranslation_ = function(code,block) {
	var currentExecutingBlock=block
	var code = code;
	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(currentExecutingBlock.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = currentExecutingBlock.getInputTargetBlock('source') 
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		
		/*FOR LIST CASE*/
		if(isList){
			var substring='contListOptionValueNum';  //Substring to complete with the number of the position of each block.
			var j = 0;
			for(var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j;  //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockSource.getInputTargetBlock(string)
				if(currentBlock!=null){
					code= code + ' container ' +currentBlock.getFieldValue("containerName")+' ';
					if (i+2 <= blockSource.getFieldValue('contListOptionValue')){
						code = code + 'and ';
					}
				}	
			}
			code = currentExecutingBlock.optionsDisplay_naturalLanguage(code, currentBlock); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
		}
		/*CASE NOT LIST*/
		else if ( numberOfBlocks == 1 && blockSource!=null){//If it exists child and it's just one.
			code = code + ' container ' + blockSource.getFieldValue("containerName") +' '; 
			code = currentExecutingBlock.optionsDisplay_naturalLanguage(code,blockSource); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
		
		}
	}
	code = code +".\n";
	return code;	
};

/******************************************************************************************************** */
/**
 * Return the name of the actual equipment that does some block operation
 */
getEquipmentName = function(block_title) {
	if (block_title == "INCUBATE") {
		return "Incubator";
	} else {
		return block_title;
	}
}

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************Basicly choose the possibility of change the first sentence of the block************/
/**********************************************************************************************************/

Blockly.NaturalLanguage_english['centrifugation'] = function(block) {
	var code = '   <font color="blue"> Spin ';  /*This is an example of how we can modify the color of a sentence*/
	code = regularNaturalLanguageTranslation_(code,this);
	code = code +'</font> ';
	return code;
}
	
Blockly.NaturalLanguage_english['electrophoresis'] = function(block) {
	var code = '    Do an electrophoresis';  
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}


Blockly.NaturalLanguage_english['flashFreeze'] = function(block) {
	var code = '    Flash freeze ';   
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['flowCitometry'] = function(block) {
	var code = '    Flow Analyze with data: \n';  
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['incubate'] = function(block) {
	var code = '    Incubate ';    
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['mix'] = function(block) {
	var code = '    Mix ';    
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['oligosynthesize'] = function(block) {
	var code = '    Oligosynthesize ';    
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['sangerSequencing'] = function(block) {
	var code ='    Sanger sequencing';
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['thermocycling'] = function(block) {
	var code ='    Thermocycle operation';
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

Blockly.NaturalLanguage_english['measurement'] = function(block) {
	var type_measure = block.getFieldValue('parameters');
	switch (type_measure){//This function is to get the real name of the different kinds of pipetting.
		case '1':
			type_measure="Absorbance";
		break;
		case '2':
			type_measure="Fluorescence";
		break;
		case '3':
			type_measure="Luminiscence";
		break;
		case '4':
			type_measure="Volume";
		break;
		case '5':
			type_measure="Temperature";
		break;
		default:
		alert("Some error appeared translating language");
	}
	//Creating general code of PIPETTE function and its type
	var code ='    ' + type_measure +' measure' ;
	code = regularNaturalLanguageTranslation_(code,this);
	return code;
}

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL SPECIAL BLOCKS*****************************************/
/**********************************************************************************************************/
/*****************They are special just because they have source and destination blocks********************/
/*********Particularly PIPETTE is the most complex because it can include lists in source and dest*********/
/**********************************************************************************************************/


Blockly.NaturalLanguage_english['cellSpreading'] = function(block) {
	var code = '    Spread ';     //initialize the code for incubate function
	
	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source');
		blockDestination = this.getInputTargetBlock('destination');
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		
		if ( numberOfBlocks == 1 && blockSource!=null){  //If it exists child and it's just one.
			code = code + ' from ' + blockSource.getFieldValue("containerName") +"/"+blockSource.getFieldValue("container_type_global")+' '; 
			if(this.getInputTargetBlock('destination')!=null){
				code = code + ' to ' + blockDestination.getFieldValue("containerName") +"/"+blockDestination.getFieldValue("container_type_global")+' ';
			code = this.optionsDisplay_naturalLanguage(code,blockDestination); //Call the function optionsDisplay_naturalLanguage which it exists in each function block, with their own parameters.
			}
		}
	}
	code = code + "\n";
	return code;
};

Blockly.NaturalLanguage_english['colonyPicking'] = function(block) {
	var code = '    Autopick ';     //initialize the code for incubate function
	
	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source') ;
		blockDestination = this.getInputTargetBlock('destination');
		//var isList = blockSource.getInput('contListOption');//Check if it is a list
		if ( numberOfBlocks == 1 && blockSource!=null){  //If it exists child and it's just one.
			code = code + ' from ' + blockSource.getFieldValue("containerName") +"/"+blockSource.getFieldValue("container_type_global")+' '; 
			if(this.getInputTargetBlock('destination')){
				code = code + 'to ' + blockDestination.getFieldValue("containerName") +"/"+blockDestination.getFieldValue("container_type_global")+' ';
			}	
			code = this.optionsDisplay_naturalLanguage(code,blockSource);//Call the function optionsDisplay_naturalLanguage which it exists in each function block, with their own parameters.
		}
	}
	code = code +".\n";
	return code;
};


Blockly.NaturalLanguage_english['pipette'] = function(block) {
	var type_pipette = block.getFieldValue('pipetteTypeName');
	switch (type_pipette){//This function is to get the real name of the different kinds of pipetting.
		case '1':
			type_pipette="Transfer";
		break;
		case '2':
			type_pipette="Distribute";
		break;
		case '3':
			type_pipette="Consolidate";
		break;
		case '4':
			type_pipette="Continuous transfer";
		break;
		default:
		alert("Some error appeared translating language");
	}
	//Creating general code of PIPETTE function and its type
	var code = "    " + type_pipette + ' from  ';
	
	//SOURCE operations:****************************************************************************************************************************
	//Loop to get the real number of container blocks connected to the pipette, because is the pipette that extract the info of each container block.
	var numberOfBlocks = 1; 
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source') 
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		if(isList){
				
			var substring='contListOptionValueNum'; //Substring to complete with the number of the position of each block.
		
			var j = 0;
			for(var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockSource.getInputTargetBlock(string)
				if (currentBlock != null){					
					code= code +currentBlock.getFieldValue("containerName")+' ';
					code = this.optionsDisplay_naturalLanguage(code, currentBlock); //Call the function optionsDisplay_naturalLanguage which it exists in each function block, with their own parameters.
					if (i+2 <= blockSource.getFieldValue('contListOptionValue')){
						code = code + ' and ';
					}
				}
			}
		}
	
	
		/*CASE only one block in source*/
		else if ( numberOfBlocks == 1 && blockSource!=null){//If it exists child and it's just one.
			if ( blockSource.getInputTargetBlock('volume') || blockSource.getInput('datareference') || blockSource.getInput('singlewelladdrinput') || blockSource.getInput('singleWell') || blockSource.getInput('multipleWellAddrInput') || blockSource.getInput('multiplewells') || blockSource.getInput('gelcomposition') || blockSource.getInput('valueagarose') || blockSource.getInput('optionsCTMode') || blockSource.getInput('optionsCTMode2') || blockSource.getInput('steps')  ){
				
				code= code + blockSource.getFieldValue("containerName") +' '; 
				code = this.optionsDisplay_naturalLanguage(code,blockSource); //Call the function optionsDisplay_naturalLanguage which it exists in each function block, with their own parameters.
				
			}else{
				code = code  + blockSource.getFieldValue("containerName");
			}
		}
	}
	
	//DESTINATION operations:****************************************************************************************************************************
	//Loop to get the real number of container blocks connected to the pipette, because is the pipette that extract the info of each container block.
	var code = code+ ' to ';
	var numberOfBlocks = 1; 
	if(this.getInputTargetBlock('destination') ){ //Get the block in the SOURCE input if exists
		blockDestination = this.getInputTargetBlock('destination') 
		var isList = blockDestination.getInput('contListOption');//Check if it is a list
		if(isList){
			var substring='contListOptionValueNum'; //Substring to complete with the number of the position of each block.
			var j = 0;
			for(var i = 0; i < blockDestination.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockDestination.getInputTargetBlock(string)
				if (currentBlock != null){
					code= code +currentBlock.getFieldValue("containerName");
					code = this.optionsDisplay_naturalLanguage(code, currentBlock); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
					if (i+2 <= blockDestination.getFieldValue('contListOptionValue')){
						code = code + ' and ';
					}
				}
			}
			
		} 
		/*CASE only one block in destination*/
		else if ( numberOfBlocks == 1 && blockDestination!=null){//If it exists child and it's just one.
			if ( blockDestination.getInputTargetBlock('volume') || blockDestination.getInput('datareference') || blockDestination.getInput('singlewelladdrinput') || blockDestination.getInput('singleWell') || blockDestination.getInput('multipleWellAddrInput') || blockDestination.getInput('multiplewells') || blockDestination.getInput('gelcomposition') || blockDestination.getInput('valueagarose') || blockDestination.getInput('optionsCTMode') || blockDestination.getInput('optionsCTMode2') || blockDestination.getInput('steps')  ){
				code = code+ blockDestination.getFieldValue("containerName") ; 
				code = this.optionsDisplay_naturalLanguage(code,blockDestination);  //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
				
			}else{
				code = code + blockDestination.getFieldValue("containerName") ;
			}
		}
	}
	
	code = code +'.\n';
	
	return code;
};

//TODO:
Blockly.NaturalLanguage_english['turbidostat'] = function(block) {
	return "";
};

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************************GENERAL BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

Blockly.NaturalLanguage_english['experiment'] = function(block) {
	var code = "Experiment name - " + block.getFieldValue('experimentName')+"\n\nSolutions/reagents:\n\n";
	
	var comparationArray={};
		
	var childrenArray = this.getDescendants(); /*Get all the children*/
	for(var k=0;k<childrenArray.length;k++){ /*Loop to write all names of different containers*/
		if (childrenArray.hasOwnProperty(k)){
			if(childrenArray[k].getFieldValue("containerName")){
				if (!comparationArray.hasOwnProperty(childrenArray[k].getFieldValue("containerName"))){
					code = code + '- ' + childrenArray[k].getFieldValue("containerName") +' \n';
					comparationArray[childrenArray[k].getFieldValue("containerName")]=k;
				}
			}
		}
	}
	
	code = code + "\nEquipment:\n\n";
	
	for(var k=0;k<childrenArray.length;k++){ /*Loop for write all the equipment used (function blocks)*/
		if (childrenArray.hasOwnProperty(k)){
			if(!childrenArray[k].getFieldValue("containerName") && !childrenArray[k].getFieldValue("contListOptionValue") && !childrenArray[k].getFieldValue("experimentName")&& !childrenArray[k].getFieldValue("step") ){
				if (!comparationArray.hasOwnProperty(childrenArray[k].getFieldValue())){
					code = code + '- ' + getEquipmentName(childrenArray[k].getTitleValue())  +' \n';
					comparationArray[childrenArray[k].getFieldValue()]=k;
				}
			}
		}
	}
	code = code + "\nSteps:\n";
	
	code = code + Blockly.NaturalLanguage_english.blockToCode(this.getInputTargetBlock('inputOfExperiment')); /*Call children blocks */
	return code;
};

Blockly.NaturalLanguage_english['step'] = function(block) {
	var code = block.getFieldValue('step') +". "+"\n";
	code = code + Blockly.NaturalLanguage_english.blockToCode(this.getInputTargetBlock('inputOfExperiment')); //Call the children blocks
	code = code +"\n"; 
	return code;
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.NaturalLanguage_english['container'] = function(block) {	
	
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.NaturalLanguage_english['containerList'] = function(block) {
	
};