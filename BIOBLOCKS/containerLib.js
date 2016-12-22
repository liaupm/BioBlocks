  /***************************************************************************************************************************************************************/
/* Name: containerLib.js																																	   */
/* Developer: Jes�s Irimia																																	   */
/* Function: it contains all the functions to work with containers and their behaviour and changes swith the parent function                                   */	
/*																																							   */
/*							 																													               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/			
/*Definition of the object which contains all the arrays of container parameters*/
var containerObject = {};
var containerList = { // The unit used for volume is milli-litres
	1 : "1.9", 
	2 : "5.9", 
	201 : "0.02", 
	202 : "49.7",
	301 : "0.18",
	302 : "0.18",
	4 : "149.7",
	5 : "149.7"	
};
var containerPicture = {
	0 : "images/empty.png",
	1 : "images/tube.png", 
	2 : "images/tube.png", 
	201 : "images/gel.png", 
	202 : "images/petri-dish.png",
	301 : "images/lab-wells.png",
	302 : "images/lab-wells.png",
	4 : "images/beaker.png",
	5 : "images/flask.png"
}
/*Start the container Block*/
Blockly.Blocks['container'] = {
	
	init: function() { //Function to initialize the block
		/*Creating LOCAL array for this container block, The first you create a container block this fucntion is called.*/
		var containerArray={};
		containerArray['id']=this.id; 
		containerObject[this.id]=containerArray; //It adds the LOCAL array in the GLOBAL object with the key "id".
		
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setOutput(true, "containerCheck");//Giving output type "containerCheck"
		this.setColour(210);
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("CONTAINER")
		this.setTooltip('');
		
		/*PARAMETERS*/
		this.appendDummyInput("containerName")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Name")
			.appendField(new Blockly.FieldTextInput("Insert name"), "containerName");


		//Drop down menu	
		//We define the programm names with numbers to facilitate their interpretation in the function. 
		//From 1 to x is not multiple well plate neither agarose, from x to 1 is a multiple container...
		var dropdownType = new Blockly.FieldDropdown([["eppendorf tube 2.0 ml", "1"], ["eppendorf tube 6.0 ml", "2"], ["agarose gel", "201"],["petri dish", "202"], ["96-well plate", "301"], ["192-well plate", "302"], ["beaker 150.0 ml", "4"], ["volumetric flask 150.0 ml", "5"]] , function(option){
			var containerTypeLocal = option;
			this.myType=containerTypeLocal;//Reserve the type in this variable to add from other function inside the same block, because else it is not addressable
			this.sourceBlock_.updateType_(containerTypeLocal); //Calling the mutation function to change the shape of the block adding some inputs.
		});

		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('Type')
			.appendField(dropdownType,'container_type_global');

		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)	
			.appendField("Initial volume")
			.appendField(new Blockly.FieldTextInput("0.0"), "initial_volume")
			.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "initial_volume_unit");
		
		
		this.appendDummyInput("Destiny")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Destiny")
			.appendField(new Blockly.FieldDropdown([["Store at Ambient", "Ambient"], ["Store at -80 deg.C", "Minus80"], ["Store at -20 deg.C", "minus20"], ["Store at 0 deg.C", "Zero"], ["Store at 4 deg.C", "Four"], ["Discard in Bio-Waste", "Bio-Waste"], ["Discard in Chemical-Waste", "Chemical-Waste"], ["Discard in Regular-Waste", "Regular-Waste"]]), "Destiny");
			
	},
		
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/			
	/*Currently this function is useless, In the future we could optimize this calling directly resetInputs() function. Also is just called from de dropdown menu above (dropdownType)*/
	updateType_ : function(containerTypeLocal){
		this.resetInputs_();
		if(this.getParent()!=null && containerTypeLocal==201){//Check if the block has parent and if it has parent pipette and the pipette hasn't parent.

		var parentBlockWork= this.getParent();//If parent assign it in parentBlockWork
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
        	if(isList){		
	        	if ( parentBlockWork.getParent() != null){									 //If contListOption exists it mean that the direct parent is a list.
	        	parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
        	}
        	}
    		if (parentBlockWork.getFieldValue("pipetteTypeName")==3 || parentBlockWork.getFieldValue("pipetteTypeName")==4){
        		this.setParent(null);//Remove the parent of its own parameters
				var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
			    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
			    this.moveBy(dx, dy); //Move the block with the measures gotten.
		    }
    	}
    	if(this.getParent()!=null && containerTypeLocal>300){//Check if the block has parent and if it has parent pipette and the pipette hasn't parent.
    
			var parentBlockWork= this.getParent();//If parent assign it in parentBlockWork
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
        	if(isList){	
	        	if ( parentBlockWork.getParent() != null){										 //If contListOption exists it mean that the direct parent is a list.
	        		parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
        		}
        	}
    		if ( parentBlockWork.getFieldValue("pipetteTypeName")==4){
        		this.setParent(null);//Remove the parent of its own parameters
				var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
			    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
			    this.moveBy(dx, dy); //Move the block with the measures gotten.
		    }
    	}
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/				
	
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function save all the changes in a LOCAL array of this block which is stored in a GLOBAL OBJECT of local arrays.*/
	updateArrayObject_ : function(){
		var myId=this.id;	//we get our id, to locate us in the global array.
		myId=myId.toString();
		var currentArray=containerObject[myId];// We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
		
		/*Space to add all the new information in the array*/
		
		currentArray['containerName']=this.getFieldValue('containerName');//Saving the value of parameter containerName, in the same space of the LOCAL array. This example is the same for the remaining parameters
		currentArray['STORE-DISCARD']=this.getFieldValue('STORE-DISCARD');
		currentArray['SEAL-COVER']=this.getFieldValue('SEAL-COVER');
		
		if (this.getInput("volume")!=null){//Check if this input exists 
			currentArray['volume']=this.getFieldValue('volume');//If the input exists set the current value of this input.
			currentArray['unit_volume']=this.getFieldValue('unit_volume');//If the input exists set the current value of this input.
		}
		
		
		/*Special Sanger Sequencing */
		if (this.getInput("datareference")!=null){
			currentArray['datareference']=this.getFieldValue('datareference');
		}
		
		/*sanger sequencing and measurement with multiple well*/
		if (this.getInput("singlemultiwells")!=null){
			currentArray['singlemultiwells']=this.getFieldValue('singlemultiwells');
			if (this.getInput("singleWell")!=null){
				currentArray['singlewelladdrinput']=this.getFieldValue('singlewelladdrinput');
				
			}
			if (this.getInput("multipleswells")!=null){
				currentArray['multipleswells']=this.getFieldValue('multipleswells');
			}	
			if (this.getInput("multiwell")!=null){
				currentArray['multipleWellAddrInput']=this.getFieldValue('multipleWellAddrInput');
			}
		}
		if (this.getInput("singleWell")!=null){
			currentArray['singlewelladdrinput']=this.getFieldValue('singlewelladdrinput');
		}
		
		if (this.getInput("multiplewells")!=null){
			currentArray['multiplewells']=this.getFieldValue('multiplewells');
			for( var i=0; i<this.getFieldValue('multiplewells');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentArray["multiplewelladdress"+i]=this.getFieldValue("multiplewelladdress"+i);
				currentArray["volume"+i]=this.getFieldValue("volume"+i);
				currentArray["unit_volume"+i]=this.getFieldValue("unit_volume"+i);
			}	 
		}
			
		/*Special for Agarose*/
		if (this.getInput("gelcomposition")!=null){
			currentArray['gelcomposition']=this.getFieldValue('gelcomposition');
		}
		if (this.getInput("valueagarose")!=null){
			currentArray['gelcomposition']=this.getFieldValue('gelcomposition');
			currentArray['valueagarose']=this.getFieldValue('valueagarose');
			for( var i=0; i<this.getFieldValue('valueagarose');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks
				currentArray["gelwelladdress"+i]=this.getFieldValue("gelwelladdress"+i);
				currentArray["volumegel"+i]=this.getFieldValue("volumegel"+i);
				currentArray["unit_volume_gel"+i]=this.getFieldValue("unit_volume_gel"+i);
			}	 
		}
		
		/*Special for eppendorf*/
		
		if (this.getInput("optionsCTMode")!=null){
			currentArray['flowrate']=this.getFieldValue('flowrate');
			currentArray['continuousmixing']=this.getFieldValue('continuousmixing');
		}
		if (this.getInput("optionsCTMode2")!=null){
			currentArray['continuousmixing']=this.getFieldValue('continuousmixing');
		}
		
		/*Special thermocycling*/
		if (this.getInput("steps")!=null){
			currentArray['steps']=this.getFieldValue('steps');
			for( var i=0; i<this.getFieldValue('steps');i++){//Loop which switch the number of steps update the fill the correct number of blanks
				currentArray["temperature"+i]=this.getFieldValue("temperature"+i);
				currentArray["duration"+i]=this.getFieldValue("duration"+i);
			}	 
		}
		
	},
	
	
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function go over it own local array and update with the memo values.*/
	/*Also it is essential when we restart the programme or we save and load some blocks, because it need to recover all the array data*/
	updateFieldsFromArray_ : function(){
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		
		/*update volume*/
		if (this.getInput("volume")!=null){//Check if the input exists
			if(currentArray.hasOwnProperty('volume')){ //Check if this parameters was previously stored in the local array to avoid errors.
				this.setFieldValue(currentArray['volume'],"volume") //Set the value of the array in this input field
			}
			if(currentArray.hasOwnProperty('unit_volume')){ //Check if this parameters was previously stored in the local array to avoid errors.
				this.setFieldValue(currentArray['unit_volume'],"unit_volume") //Set the value of the array in this input field
			}
		}
		if (this.getInput("datareference")!=null){
			if(currentArray.hasOwnProperty('datareference')){
				this.setFieldValue(currentArray['datareference'],"datareference");
			}
		}
		
		if (this.getInput("optionsCTMode")!=null){
			if(currentArray.hasOwnProperty('flowrate')){
				this.setFieldValue(currentArray['flowrate'],"flowrate");
			}
			if(currentArray.hasOwnProperty('continuousmixing')){
				this.setFieldValue(currentArray['continuousmixing'],"continuousmixing");
			}
		}
		if (this.getInput("optionsCTMode2")!=null){
			if(currentArray.hasOwnProperty('continuousmixing')){
				this.setFieldValue(currentArray['continuousmixing'],"continuousmixing")
			}
		}
		
		if (this.getInput("valueagarose")!=null){
			if(currentArray.hasOwnProperty('gelcomposition')){
				this.setFieldValue(currentArray['gelcomposition'],"gelcomposition")
			}
		}
		
		if (this.getInput("singleWell")!=null){
			if(currentArray.hasOwnProperty('singlewelladdrinput')){
				this.setFieldValue(currentArray['singlewelladdrinput'],"singlewelladdrinput")
			}
		}
		if (this.getInput("multiwell")!=null){
			
			if(currentArray.hasOwnProperty('multipleWellAddrInput')){
				this.setFieldValue(currentArray['multipleWellAddrInput'],"multipleWellAddrInput")
			}
		}
		
	},
	
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This is a particular function of JS*/
	/*each change appeared in the workspace/context call to this function*/
	/*we are using it to set the shape, display parameters and similar matter*/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	onchange : function(){
		
		this.updateArrayObject_();//The first action is to correct the array if the "onchange" function was called updating some field of this block.
		
		/*Locate and set parent in a variable*/
		if(this.getParent()!=null && this.sourceOrDest_()!=4){//Check if the block has parent and if it has parent pipette and the pipette hasn't parent.
			var parentBlockWork= this.getParent();//If parent assign it in parentBlockWork
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
        	if(isList){											 //If contListOption exists it mean that the direct parent is a list.
	        	parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
        	}
        	
        	/*Module to check if the parent is different, in this case we must reset the inputs, else every go on normally*/
        	if (this.parentType != parentBlockWork.getFieldValue('pipetteTypeName')){
	        	this.resetInputs_();
	        	this.parentType = parentBlockWork.getFieldValue('pipetteTypeName');
        	}
        	/*Cell Spreading module*/
        	if (parentBlockWork.getInput('cellSpread')&& this.sourceOrDest_()>1){
				/*In addition to satisfied the previous conditions, if the parent is CONSOLIDATE or TRANSFER and is connected in DESTINATION also have this input*/
				if(this.getInput('volume')==null){//Check if the input already exists, for not create again
					this.appendValueInput('volume')
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField("volume")
						.setCheck(["Number", "Variable"])
						.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume");
				}
			}
        	
        	
        	/*Sanger sequencing module*/
			if ( parentBlockWork.getInput('SangerSequencer')!=null){ //Check if the parent is a Sanger Sequencer block. This block is the only one that it has the 'SangerSequencer' input 
				if(this.getInput('datareference')==null){ //If the parent is SS and it has not the datareference input, it create it. Its so much important check if it exists because, this is checked each change.
					this.appendValueInput('datareference')
					    .setAlign(Blockly.ALIGN_RIGHT)
					    .appendField("data reference");
				}
				if(this.getFieldValue('container_type_global')>300){/*Also if container==multiwell*/
					if(this.getInput("singlemultiwells")==null){//Check if the input already exists, for not create again
						var dropdownSingleMultiple = new Blockly.FieldDropdown([["single well", "1"], ["multiple wells", "2"]], function(option){
							var containerSingleMulti = option;
							this.sourceBlock_.updateSingleMultiple_(containerSingleMulti);//Call this function to start the DD menu
							this.previousSingleMulti=containerSingleMulti;
						});
						this.appendDummyInput('singlemultiwells')//The DD menu is created, but with thi line it appears in the block
							.setAlign(Blockly.ALIGN_RIGHT)
							.appendField(dropdownSingleMultiple,'singlemultiwells')	
						var myId = this.id;//we get our id, to locate us in the global array.
						myId=myId.toString()
						var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
						
						if(currentArray.hasOwnProperty("singlemultiwells")){
							this.updateSingleMultiple_(currentArray['singlemultiwells']);
							this.setFieldValue(currentArray['singlemultiwells'],"singlemultiwells");
						}
						if (this.getFieldValue("singlemultiwells")==1){
							if (this.getInput("singleWell")==null){
								this.appendDummyInput("singleWell")
									.setAlign(Blockly.ALIGN_RIGHT)
									.appendField("Single well address")
									.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
								}
							if (currentArray.hasOwnProperty('singlewelladdrinput')){
								this.setFieldValue("singlewelladdrinput");
							}
						}
					}
				}
			}else if(this.getFieldValue('container_type_global')>100){/*It is not eppendorf*/
				if(this.getFieldValue('container_type_global')==201){/*It is not multiwell*/
					/*AGAROSE*/
					if(parentBlockWork.getFieldValue('pipetteTypeName')==1 || parentBlockWork.getFieldValue('pipetteTypeName')==2){/*Parent is TRANSFER or DISTRIBUTE type */
						if(this.getInput("valueagarose")==null){//Check if the input already exists, for not create again
							this.appendDummyInput("valueagarose")
									.setAlign(Blockly.ALIGN_RIGHT)
									.appendField("gel composition (%)")
									.appendField(new Blockly.FieldTextInput("---"), "gelcomposition")
							var dropdownNumber = new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"]], function(option){
								var numberChoose = option;
								this.actualValue=numberChoose;
								this.sourceBlock_.updateNumberWells_(numberChoose);
							});
							var myId = this.id;//we get our id, to locate us in the global array.
							myId=myId.toString()
							var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
							this.appendDummyInput("valueagarose")
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField("Number ")
								.appendField(dropdownNumber,'valueagarose');
							
							if(currentArray.hasOwnProperty('valueagarose')){	
								this.updateNumberWells_(currentArray['valueagarose']);
								this.setFieldValue(currentArray['valueagarose'],'valueagarose');
								for(var i=0; i<currentArray['valueagarose'];i++){
									//alert("TRYING "+ currentArray['valueagarose'] + " " +currentArray["gelwelladdress"+i] + " " +currentArray["volumegel"+i]);
									this.setFieldValue(currentArray["gelwelladdress"+i],"gelwelladdress"+i);
									this.setFieldValue(currentArray["volumegel"+i],"volumegel"+i);
									this.setFieldValue(currentArray["unit_volume_gel"+i],"unit_volume_gel"+i);
								}
							}else{
							this.updateFieldsFromArray_();		
							this.appendDummyInput("valueTexts")
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField("gel well address")
								.appendField(new Blockly.FieldTextInput("---"), "gelwelladdress0")
							this.appendValueInput("volumegel0")
								.setAlign(Blockly.ALIGN_RIGHT)
								.setCheck(["Number", "Variable"])
								.appendField("volume")
								.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume_gel0");
							}
						}
					}					
				}else { /*MULTIWELL*/ 
					if(parentBlockWork.getInput('DDMeasurement')){ /*If this input exists, it mean the parent is MEASUREMENT BLOCK, because this block is the only one that it has the 'DDMeasurement' input */
						
						if(this.getInput("singlemultiwells")==null){//Check if the input already exists, for not create again
							var dropdownSingleMultiple = new Blockly.FieldDropdown([["single well", "1"], ["multiple wells", "2"]], function(option){
								var containerSingleMulti = option;
								this.sourceBlock_.updateSingleMultiple_(containerSingleMulti);
								this.previousSingleMulti=containerSingleMulti;
							});
							
							this.appendDummyInput('singlemultiwells')
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField(dropdownSingleMultiple,'singlemultiwells')	
						}
							
					}else if((((parentBlockWork.getFieldValue('pipetteTypeName')<3 && this.sourceOrDest_()<2)) || ((parentBlockWork.getFieldValue('pipetteTypeName')==3 || parentBlockWork.getFieldValue('pipetteTypeName')==1) && this.sourceOrDest_()>1)) && parentBlockWork.getFieldValue('pipetteTypeName')!=null){
						/*ELSE if parent is TRANSFER or DISTRIBUTE and is connected to SOURCE    --- OR --- parent is CONSOLIDATE or TRANSFER and is connected in DESTINATION,*/
						if(this.getInput('singleWell')==null){//Check if the input already exists, for not create again
							this.appendDummyInput('singleWell')
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField("Single well address")
								.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
								
							if ((( parentBlockWork.getFieldValue('pipetteTypeName')==1) && this.sourceOrDest_()>1)){
								/*In addition to satisfied the previous conditions, if the parent is CONSOLIDATE or TRANSFER and is connected in DESTINATION also have this input*/
								if(this.getInput('volume')==null){//Check if the input already exists, for not create again
									this.appendValueInput('volume')
										.setAlign(Blockly.ALIGN_RIGHT)
										.appendField("volume")
										.setCheck(["Number", "Variable"])
										.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume");
								}
							}	
						}
					}else if(parentBlockWork.getFieldValue('pipetteTypeName')<4 && parentBlockWork.getFieldValue('pipetteTypeName')!=null){//If the parent is not CONTINUOUS TRANSFER, and is not satisfying the previous conditions
						
						if(this.getInput("multiplewells")==null){//Check if the input already exists, for not create again
							var dropdownNumber2 = new Blockly.FieldDropdown([["same","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"]], function(option){
								var numberChoose = option;
								this.actualValue=numberChoose;
								this.sourceBlock_.updateNumberWells2_(numberChoose);
							});
							var myId = this.id;//we get our id, to locate us in the global array.
							myId=myId.toString()
							var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
							this.appendDummyInput("multiplewells")
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField(dropdownNumber2,'multiplewells')
								.appendField(" addresses");
							if(currentArray.hasOwnProperty('multiplewells')){	
								this.updateNumberWells2_(currentArray['multiplewells']);
								for(var i=0; i<currentArray['multiplewells'];i++){
									this.setFieldValue(currentArray['multiplewells'],'multiplewells');
									this.setFieldValue(currentArray["multiplewelladdress"+i],"multiplewelladdress"+i);
									this.setFieldValue(currentArray["volume"+i],"volume"+i)
									this.setFieldValue(currentArray["unit_volume"+i],"unit_volume"+i);
								}
							}else{
							this.updateFieldsFromArray_();	
							this.appendDummyInput("valueTexts2")
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField("multiple well address")
								.appendField(new Blockly.FieldTextInput("---"), "multiplewelladdress0")
								.appendField("volume")
								.appendField(new Blockly.FieldTextInput("---"), "volume0")
								.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume0");
							}
						}
						
					} 
					 
				}
			}else{/*EPPENDORF*/
				if((parentBlockWork.getFieldValue('pipetteTypeName')<3 && this.sourceOrDest_()>1) || (parentBlockWork.getFieldValue('pipetteTypeName')==3 && this.sourceOrDest_()<2 )){
					/* if parent is NOT CONTINUOUS TRANSFER and is connected to DESTINATION --- OR --- parent is CONSOLIDATE  and is connected in SOURCE*/
					if(this.getInput('volume')==null){//Check if the input already exists, for not create again
						this.appendValueInput('volume')
							.setAlign(Blockly.ALIGN_RIGHT)
							.appendField("volume")
							.setCheck(["Number", "Variable"])
							.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume");
					}
				}else if(parentBlockWork.getFieldValue('pipetteTypeName')==4){//ELSE if parent is CONTINUOUS TRANSFER
					if(parentBlockWork.getFieldValue('pipetteTypeName0')<3 && this.sourceOrDest_()<2){
						/*if parent (continuous trasnfer) is ONE TO ONE or  ONE TO MANY and is connected to SOURCE*/
						if(this.getInput("optionsCTMode")==null){//Check if the input already exists, for not create again
							this.appendDummyInput("optionsCTMode")
								.setAlign(Blockly.ALIGN_RIGHT)
								.appendField("cont mixing")
						        .appendField(new Blockly.FieldCheckbox("FALSE"), "continuousmixing");
							this.appendValueInput("flowrate")
								.setAlign(Blockly.ALIGN_RIGHT)
								.setCheck(["Number", "Variable"])
								.appendField("flow rate")
								.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "flowrate_units_volume")
								.appendField("/")
								.appendField(new Blockly.FieldDropdown([["Hours", "hours"], ["Minutes", "minutes"], ["Seconds", "seconds"]]), "flowrate_units_time");
				        }
			        }else if(parentBlockWork.getFieldValue('pipetteTypeName0')==3){ //IF parent (continuous trasnfer) is MANY TO ONE
				   		if(this.sourceOrDest_()<2){ //FOR SOURCE
					   		if (this.getInput("optionsCTMode2")==null){//Check if the input already exists, for not create again
						   		this.appendDummyInput("optionsCTMode2")	
						   			.setAlign(Blockly.ALIGN_RIGHT)
									.appendField("cont mixing")
							        .appendField(new Blockly.FieldCheckbox("FALSE"), "continuousmixing");    
						    }
		       		    }else if(this.sourceOrDest_()>1){//FOR DESTINATION 
			       		    if (this.getInput("optionsCTMode")==null){//Check if the input already exists, for not create again
				       		 	this.appendDummyInput("optionsCTMode")
				       		 		.setAlign(Blockly.ALIGN_RIGHT)
									.appendField("cont mixing")
							        .appendField(new Blockly.FieldCheckbox("FALSE"), "continuousmixing");
								this.appendValueInput("flowrate")
									.setAlign(Blockly.ALIGN_RIGHT)
									.setCheck(["Number", "Variable"])
									.appendField("flow rate")
									.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "flowrate_units_volume")
									.appendField("/")
									.appendField(new Blockly.FieldDropdown([["Hours", "hours"], ["Minutes", "minutes"], ["Seconds", "seconds"]]), "flowrate_units_time");

						    } 
		       		    }
	       		    }
		       }
			}
			/*Special module just for Thermocycling block*/
			if(parentBlockWork.getInput("cycles")!=null){//Check if the parent is a Thermocycling block. This block is the only one that it has the 'cycles' input
				
			if(this.getInput("steps")==null){//Check if the input already exists, for not create again
					var dropdownNumber2 = new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],["19","19"],["20","20"]], function(option){
						var numberChoose = option;
						this.actualValue=numberChoose;
						this.sourceBlock_.updateNumbersteps_(numberChoose);
					});
					var myId = this.id;//we get our id, to locate us in the global array.
					myId=myId.toString()
					
					var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
					this.appendDummyInput("steps")
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(dropdownNumber2,'steps')
						.appendField(" steps");	
					if(currentArray.hasOwnProperty('steps')){
							this.updateNumbersteps_(currentArray['steps']);
							for(var i=0; i<currentArray['steps'];i++){
								this.setFieldValue(currentArray['steps'],'steps');
								this.setFieldValue(currentArray["temperature"+i],"temperature"+i);
								this.setFieldValue(currentArray["duration"+i],"duration"+i);
							}
					}else{
					this.updateFieldsFromArray_();	
					this.appendDummyInput("valueTexts3")
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField("temperature")
						.appendField(new Blockly.FieldTextInput("---"), "temperature0")
						.appendField("duration")
						.appendField(new Blockly.FieldTextInput("---"), "duration0");	
					}
				}
			}
			
		}else{this.resetInputs_();}//If any conditions are satisfied or the block has not parent, it resets all the inputs
		
		
		this.updateFieldsFromArray_();//Finally we must update all the fields of the block from the array.
		
		if(this.getFieldValue("showerTable")=="TRUE" && this.previousShower==0){
			this.show_table()
			this.previousShower=1;
			//alert("hey")
		}else if (this.getFieldValue("showerTable")=='FALSE'){
			this.previousShower=0;
		}
		
		if (this.getParent()!=null){		
			if( this.getParent().getInput("COLONYPICKING")){
				//("HEY")
				this.removeInput('volume');
				this.removeInput("unit_volume");
			} 						
		}
		
		//Control de volume
		this.checkInitialValue();

		if(this.getFieldValue('container_type_global')== 202){/*It is not multiwell*/
					/*PETRI PLATE*/
			console("cheking petri plate");
			var ifNegativeDetach = -1;
			if (this.getParent()!=null){
				if(parentBlockWork.getInput("COLONYPICKING") || parentBlockWork.getInput("CELLSPREADING")  || parentBlockWork.getInput("INCUBATE")|| parentBlockWork.getInput("MEASUREMENT")){
					ifNegativeDetach = 1;
					if( this.sourceOrDest_() > 1 && parentBlockWork.getInput("COLONYPICKING")){
						ifNegativeDetach = -1;
					}
					if( this.sourceOrDest_() < 2  && parentBlockWork.getInput("CELLSPREADING")){
						ifNegativeDetach = -1;
					}
				}
				if (ifNegativeDetach <0 ){
					this.setParent(null);//Remove the parent of its own parameters
					var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
				    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
				    this.moveBy(dx, dy); //Move the block with the measures gotten.
			   	}
		   	}
		}	
		/*controlFlow++;
		alert("Hey, I'm controlFlow step " +controlFlow +" and I'm in onchange_"); */
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/		
	/**
	 * Checks if the initial volume of the container blocks is not bigger than the 
	 * actual capacity of the container
	 */
	checkInitialValue : function(){
		if (this.getFieldValue("initial_volume")) {
			var currentVolume = Number(this.getFieldValue("initial_volume"))
			if(this.getFieldValue("initial_volume_unit")=="nanoliter"){
				currentVolume = currentVolume/1000000;
			}else if(this.getFieldValue("initial_volume_unit")=="microliter"){
				currentVolume = currentVolume/1000;
			}

			if (currentVolume > Number(containerList[this.getFieldValue("container_type_global")])) {
				alert("WARNING: The initial volume of the container can't be bigger than the container's capacity");
			}		
		}
	},


/*This function was created to know what is the connection beteween this block and it pipette parent in the case.*/	
/******Input: none; ***  output: integer     *******************************/
/****** INFO about output: SOURCE=0,1; DESTINATION=2,3; THERE ISN'T PARENT PIPETTE=4 ****/

	sourceOrDest_ : function(){
		parentCurrentBlock=this.getParent();//Obtain the parent
		var isList = parentCurrentBlock.getInput('contListOption');//Check if it has the "contListOption" parameter, only included in "List of Container" block
		/*IF IS LIST*/
		if(isList){
			parentCurrentBlock2 = parentCurrentBlock.getParent();//If is a list get the parent
			if(parentCurrentBlock2!=null){
				if(parentCurrentBlock2.getInputTargetBlock('source')==parentCurrentBlock){
				//parentcurrentBlock2 is the pipette the function obtain the child connected in source, if this child is the same of parentcurrentBlock(the list), then return SOURCE	 
					var sod = 1;return sod;
				}else if(parentCurrentBlock2.getInputTargetBlock('destination')==parentCurrentBlock){
				//parentcurrentBlock2 is the pipette the function obtain the child connected in destination, if this child is the same of parentcurrentBlock(the list), then return DESTINATION
					var sod=3;return sod;
				}
			}else{sod=4;return sod;}/*If the parent of the list not exists*/
		/*IF IS NOT LIST*/
		}else{
			if (parentCurrentBlock.getInputTargetBlock('source') == this ||
				parentCurrentBlock.getInputTargetBlock('media') == this || //values for trubidostat
				parentCurrentBlock.getInputTargetBlock('cellCulture') == this ||
				parentCurrentBlock.getInputTargetBlock('waste') == this) 
			{
				var sod = 0; return sod;
			} else if (parentCurrentBlock.getInputTargetBlock('destination') == this) {
				var sod = 2; return sod;
			} else { alert("Warning. Error appeared in sourceOrDest_()"); }
		}	
	},
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/		
/*Function to update the number of different wells with a concrete volume gel and the gel well address for an agarose gel.*/
	updateNumberWells_ : function(numberChoose){
		
		if(this.getInput('valueTexts')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts');//Remove the input if it exists.
			}while(this.getInput('valueTexts'));//Remove all the inputs.

			var i = 0;
			while(this.getInput("volumegel" + i)) {
				this.removeInput("volumegel" + i);
				i++;
			}
		}
		
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("gel well address"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "gelwelladdress"+i);
			this.appendValueInput("volumegel" + i)
				.setAlign(Blockly.ALIGN_RIGHT)
				.setCheck(["Number", "Variable"])
				.appendField("volume"+(i+1))
				.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume_gel"+i);
		}
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('valueagarose') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("gelwelladdress"+i) ){
					this.setFieldValue(currentArray["gelwelladdress"+i],"gelwelladdress"+i);
				}
				if(currentArray.hasOwnProperty("volumegel"+i)){
					this.setFieldValue(currentArray["volumegel"+i],"volumegel"+i)
					this.setFieldValue(currentArray["unit_volume_gel"+i],"unit_volume_gel"+i);
				}
			}
		}
	},
/*Function to update the number of different wells with a concrete volume  and the well address for multiple well plate.*/
	updateNumberWells2_ : function(numberChoose){
		
		if(this.getInput('valueTexts2')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts2');//Remove the input if it exists.
			}while(this.getInput('valueTexts2'));//Remove all the inputs.

			var i = 0;
			while(this.getInput("volume" + i)) {
				this.removeInput("volume" + i);
				i++;
			}
		}
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts2")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("multiple well address"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "multiplewelladdress"+i)
			this.appendValueInput("volume" + i)
				.setAlign(Blockly.ALIGN_RIGHT)
				.setCheck(["Number", "Variable"])
				.appendField("volume"+(i+1))
				.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume"+i);
		}
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('multiplewells') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("multiplewelladdress"+i) ){
					this.setFieldValue(currentArray["multiplewelladdress"+i],"multiplewelladdress"+i);
				}
				if(currentArray.hasOwnProperty("volume"+i)){
					this.setFieldValue(currentArray["volume"+i],"volume"+i);
					this.setFieldValue(currentArray["unit_volume"+i],"unit_volume"+i);
				}
			}
		}
		
	},
/*Function to update the number of different steps ina a thermocycling function, with a concret temperature and duration of the function .*/	
	updateNumbersteps_ : function(numberChoose){
	
		if(this.getInput('valueTexts3')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts3');//Remove the input if it exists.
			
			}while(this.getInput('valueTexts3'));//Remove all the inputs.
		}
		
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts3")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("temperature"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "temperature"+i)
				.appendField("duration"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "duration"+i);
		}
		
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('steps') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("temperature"+i) ){
					this.setFieldValue(currentArray["temperature"+i],"temperature"+i);
				}
				if(currentArray.hasOwnProperty("duration"+i)){
					this.setFieldValue(currentArray["duration"+i],"duration"+i);
				}
			}
		}
	},
/*Function to update a container block which is able to be single well or multiple well from a dropdown menu.*/	
	updateSingleMultiple_ : function(containerSingleMulti){
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		
		if (containerSingleMulti==1){/*If choice is single well*/
			/*Remove inputs of multiwell if it exists*/
			var inputExists = this.getInput('multiwell')
			if(inputExists){
				this.removeInput('multiwell');
			}
			var inputExists = this.getInput('multipleswells')
			if(inputExists){
				this.removeInput('multipleswells');
			}
			/*Create single well input if not exists*/
			if (this.getInput('singleWell')==null){
				this.appendDummyInput('singleWell')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("Single well address")
					.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
			}
			if(currentArray.hasOwnProperty("singlewelladdrinput")){
				this.setFieldValue(currentArray["singlewelladdrinput"],"singlewelladdrinput");
			}
		}
		/*If choice is multi well*/
		else{
			/*Remove inputs of singlewell if it exists*/
			var inputExists = this.getInput('singleWell')
			if(inputExists){
					this.removeInput('singleWell');
			}
			/*Create multi well input if not exists which is a new dropdown menu*/
			if (this.getInput('multipleswells')==null){
				var dropdownmultiwells = new Blockly.FieldDropdown([["whole plate", "1"], ["individual multiple wells", "2"]], function(option){
					var containerMultiMulti = option;
					this.sourceBlock_.updateMultipleMultiple_(containerMultiMulti);
				});
				this.appendDummyInput('multipleswells')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(dropdownmultiwells,'multipleswells');
				
				if(currentArray.hasOwnProperty("multipleswells")){
					this.updateMultipleMultiple_(currentArray['multipleswells']);
					this.setFieldValue(currentArray['multipleswells'],"multipleswells");
					
				}	
				if (this.getFieldValue("multipleswells")==2){
					if (this.getInput("multiwell")==null){
						this.appendDummyInput("multiwell")
							.setAlign(Blockly.ALIGN_RIGHT)
							.appendField("multiple well address")
							.appendField(new Blockly.FieldTextInput("e.g. A-1,C-3 or A-3,B-12 or A-1:B-6"), "multipleWellAddrInput");
						}
					if (currentArray.hasOwnProperty('multipleWellAddrInput')){
						this.setFieldValue("multipleWellAddrInput");
					}
				}	
			}
			
			
		}
	},
/*Function to update the whole plate or individual plates if the choice is multiple well in the updateSingleMultiple_() function*/	
	updateMultipleMultiple_ : function(containerMultiMulti){
		var choose = Number(containerMultiMulti);
		
		if (choose == 2){//If choice == individual multiple wells
			if ( this.getInput('multiwell') == null){//Check if the input already exists, for not create again
				this.appendDummyInput('multiwell')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("multiple well address")
					.appendField(new Blockly.FieldTextInput("e.g. A-1,C-3 or A-3,B-12 or A-1:B-6"), "multipleWellAddrInput");
			}
			var myId = this.id;//we get our id, to locate us in the global array.
			myId=myId.toString()
			var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			if(currentArray.hasOwnProperty("multipleWellAddrInput")){
				this.setFieldValue(currentArray["multipleWellAddrInput"],"multipleWellAddrInput");
			}
		}else {this.removeInput('multiwell');}//If the choice is whole well plate
	},
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/					
	/*This function remove all the inputs in the container block. It is used when detach the block from the functions, and in special moment*/
	resetInputs_ : function(){
		
		var inputExists = this.getInput('singleWell')
		if(inputExists){
			this.removeInput('singleWell');
		}
		if (this.getInput("multiplewells")!=null){
			this.updateNumberWells2_(0);
		}
		var inputExists = this.getInput('multiplewells')
		if(inputExists){
			this.removeInput('multiplewells');
		}
		var inputExists = this.getInput('volume')
		if(inputExists){
			this.removeInput('volume');
			this.removeInput('unit_volume');
		}
		if (this.getInput("valueagarose")!=null){
			this.updateNumberWells_(0);
		}
		var inputExists = this.getInput('valueagarose')
		if(inputExists){
			for(var i=0; i<2;i++){
				this.removeInput('valueagarose');
			}
		}
		
		var inputExists = this.getInput('optionsCTMode')
		if(inputExists){
			this.removeInput('optionsCTMode');
		}

		if (this.getInput('flowrate')) {
			this.removeInput('flowrate');
		}

		var inputExists = this.getInput('optionsCTMode2')
		if(inputExists){
			this.removeInput('optionsCTMode2');
		}
		if (this.getInput("steps")!=null){
			this.updateNumbersteps_(0);
		}
		var inputExists = this.getInput('steps')
		if(inputExists){
			this.removeInput('steps');
		}
		var inputExists = this.getInput('singleWell')
		if(inputExists){
				this.removeInput('singleWell');
		}
		var inputExists = this.getInput('multiwell')
		if(inputExists){
			this.removeInput('multiwell');
		}
		var inputExists = this.getInput('multipleswells')
		if(inputExists){
			this.removeInput('multipleswells');
		}
		var inputExists = this.getInput('singlemultiwells')
		if(inputExists){
			this.removeInput('singlemultiwells');
		}
		var inputExists = this.getInput('datareference')
		if(inputExists){
			this.removeInput('datareference');
		}
		
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we copy or save this block*/
	mutationToDom: function() {
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId];//Access to the local array.
		var container = document.createElement('mutation');//Creating a elemtn which name is "mutation" where save the parameters of the array
		for (var k in currentArray){//Loop to go over the array
			if (currentArray.hasOwnProperty(k)) {//Checking if the name contains data
				container.setAttribute(k,currentArray[k]);
				//alert (k + currentArray[k]);
									 //k==name ; currentArray[k]== value
			}
		}
		return container;//return the container to the xml document created ach time we copy or save the block.
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
		/*This function is called when we paste or load the block.*/
		domToMutation: function(xmlElement) {
			
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId];//Access to the local array.
		
		if(xmlElement.getAttribute('volume')!=null){
			currentArray['volume']=  xmlElement.getAttribute('volume');//It search the attribute in the xml document, and it assign in the local array.
			currentArray['unit_volume']=  xmlElement.getAttribute('unit_volume');
		}
		if(xmlElement.getAttribute('datareference')!=null){	
			currentArray['datareference']=  xmlElement.getAttribute('datareference');//The same explanation
		}
		if(xmlElement.getAttribute('singlemultiwells')!=null){
			currentArray['singlemultiwells']=  xmlElement.getAttribute('singlemultiwells');
		}
		if(xmlElement.getAttribute('singlewelladdrinput')!=null){
			currentArray['singlewelladdrinput']=  xmlElement.getAttribute('singlewelladdrinput');
		}
		if(xmlElement.getAttribute('multipleswells')!=null){
			currentArray['multipleswells']=  xmlElement.getAttribute('multipleswells');
		}
		if(xmlElement.getAttribute('multipleWellAddrInput')!=null){
			currentArray['multipleWellAddrInput']=  xmlElement.getAttribute('multipleWellAddrInput');
		}
		if(xmlElement.getAttribute('flowrate')!=null){
			currentArray['flowrate']=  xmlElement.getAttribute('flowrate');
		}
		if(xmlElement.getAttribute('continuousmixing')!=null){
			currentArray['continuousmixing']=  xmlElement.getAttribute('continuousmixing');
		}
		if(xmlElement.getAttribute('valueagarose')!=null){
			currentArray['gelcomposition']=  xmlElement.getAttribute('gelcomposition');
		}
		if(xmlElement.getAttribute('valueagarose')!=null){
			currentArray['valueagarose']=  xmlElement.getAttribute('valueagarose');
			for(var i=0;i<xmlElement.getAttribute('valueagarose');i++){//It is onlyt saved the number of multiplewells, if we want save the remaining values, loop searching multiplewelladdress+i. Problem: if you choose one time X wells, they always appear.
				currentArray["gelwelladdress"+i]=  xmlElement.getAttribute("gelwelladdress"+i);
				currentArray['volumegel'+i]=  xmlElement.getAttribute('volumegel'+i);
				currentArray['unit_volume_gel'+i]=  xmlElement.getAttribute('unit_volume_gel'+i);
			}
		}
		if(xmlElement.getAttribute('multiplewells')!=null){
			currentArray['multiplewells']=  xmlElement.getAttribute('multiplewells');
			for(var i=0;i<xmlElement.getAttribute('multiplewells');i++){//It is onlyt saved the number of multiplewells, if we want save the remaining values, loop searching multiplewelladdress+i. Problem: if you choose one time X wells, they always appear.
				currentArray["multiplewelladdress"+i]=  xmlElement.getAttribute("multiplewelladdress"+i);
				currentArray['volume'+i]=  xmlElement.getAttribute('volume'+i);
				currentArray['unit_volume'+i]=  xmlElement.getAttribute('unit_volume'+i);
			}
		}
		if(xmlElement.getAttribute('steps')!=null){
			currentArray['steps']=  xmlElement.getAttribute('steps');
			for(var i=0;i<xmlElement.getAttribute('steps');i++){
				currentArray["temperature"+i]=  xmlElement.getAttribute("temperature"+i);
				currentArray['duration'+i]=  xmlElement.getAttribute('duration'+i);
			}
		}
	},
	
};

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/***************************************************************************************************************************************************************/
/* Block Name.js																																			   */
/* Developer: Jes�s Irimia																																	   */
/* Function: It allow join some container block in line, to add in a input of a function block							                                       */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/

Blockly.Blocks['containerList'] = {
	init: function() {
		
		/*Usual initialization of a common block*/
		this.setInputsInline(true);
		this.setColour(210);
		this.setTooltip('');
		this.quantity=2;	
		this.previousAmount=2;
		this.setOutput(true, "containerCheck");
		
		/*Dropdown menu to choose the number of block that we want atach to some function*/		
		var dropdownQuantity = new Blockly.FieldDropdown([["2", "2"], ["3", "3"], ["4", "4"],["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"], ["12", "12"]],function(optionQ) {
			var contListOptionValueLocal = optionQ;		
			var variables = this.sourceBlock_.updateNumberType_(contListOptionValueLocal);
		});
		this.appendDummyInput("contListOption")
			.appendField("CONTAINER LIST")
			.appendField(dropdownQuantity, 'contListOptionValue');
		/*Input for atach JUST a container. Just one for default*/	
		this.appendValueInput('contListOptionValueNum1')
			.setCheck("containerCheck")
		this.appendValueInput('contListOptionValueNum2')
			.setCheck("containerCheck")	
		
	},
	
/*Function to updatethe number of blocks we are able to atach in the list of blocks*/
/*It works just removing the needed blocks, not removing all and regenerating, because this would detach automatically the container blocks in the list*/	
	updateNumberType_ : function(contListOptionValueLocal){
		this.quantity=Number(contListOptionValueLocal);
		
		if(this.quantity<this.previousAmount){/*if actual choice is less than previous choice, then REMOVE*/
			for (i=0;i<(this.previousAmount-this.quantity);i++){
					var chain = 'contListOptionValueNum'+(this.previousAmount-i); //Variable created to access the input and be able to remove it.
					this.removeInput(chain);
				}
		}else if(this.quantity>this.previousAmount){/*if actual choice is more than previous choice, then CREATE*/
			for (i = 0; i < (this.quantity-this.previousAmount); i++){
				var chain='contListOptionValueNum'+(this.previousAmount+1+i);
				this.appendValueInput(chain)
					.setCheck("containerCheck")
			}
			
		}	
		this.previousAmount=this.quantity;// This variable is to store the CURRENT value, and use it in the next call of the function. 
	},
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This is a particular function of JS*/
	/*each change appeared in the workspace/context call to this function*/
	/*we are using it to set the shape, display parameters and similar matter*/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	onchange: function() {	
		
		var currentBlock //The block we are working with
		for(var i=1;i<this.getFieldValue('contListOptionValue')+1;i++){/*Iterate over all inputs in the list*/
			var chain='contListOptionValueNum'+i//Name of the current block
			currentBlock = this.getInputTargetBlock(chain);//Current block got with chain
			if(currentBlock!=null){
				if( currentBlock.getInput('contListOption')){//If it is  a list 
				/*if ( currentBlock.getFieldValue('container_type_global')==201)*/
					this.detach_(currentBlock);
				}
			}
		}
		
		/*Detach the second and following blocks if they have not the same type of the first block*/
		/*MAYBE  THIS FUNCTION IS USELESS*//*
		block1 = this.getInputTargetBlock('contListOptionValueNum1') 
		if(block1!=null){
			bType = block1.getFieldValue('container_type_global')
			for (var i=2;(i<this.quantity+1);i++){
				var chain = 'contListOptionValueNum'+i
				blockCurrent = this.getInputTargetBlock(chain)
				if(blockCurrent!=null){
					bCType= blockCurrent.getFieldValue('container_type_global')
					if(bType<200 && bCType>200){
						this.detach_(blockCurrent);
				    }else if(bType>300 && bCType<300){
						this.detach_(blockCurrent);
				    }
				}
			}
			
		}*/
		
	},
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*How it own name say this function is used to detach a block from his parent	*/
	detach_ : function(blockDetach){
		blockDetach.setParent(null);//Remove the parent of its own parameters
		var dx = Blockly.SNAP_RADIUS * (blockDetach.RTL ? -1 : 1);//calculate the movement of the block in x axis
	    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
	    blockDetach.moveBy(dx, dy); //Move the block with the measures gotten.
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function is called when we copy or save this block*/
	mutationToDom: function() {
		var container = document.createElement('mutation');//Creating a element which name is "mutation" where save the parameters of the array
		container.setAttribute("contListOptionValue",this.getFieldValue("contListOptionValue"));
		return container;//return the container to the xml document created ach time we copy or save the block.
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we paste or load the block.*/
	domToMutation: function(xmlElement) {
		if(xmlElement.getAttribute('contListOptionValue')!=null){
			this.setFieldValue(xmlElement.getAttribute('contListOptionValue'),"contListOptionValue");
			this.updateNumberType_(xmlElement.getAttribute('contListOptionValue'));
		}
	}
};
