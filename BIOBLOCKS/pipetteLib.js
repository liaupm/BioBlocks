/***************************************************************************************************************************************************************/
/* Name: pipetteLib.js																																		   */
/* Developer: Jes�s Irimia																																	   */
/* Function: it contains all the functions of a pipette function. It have two inputs for container block source and destination.                               */	
/*																			 																				   */
/*																																				               */
/***************************************************************************************************************************************************************/					
/********************************************************BLOCK PIPETTE******************************************************************************************/		
/***************************************************************************************************************************************************************/			
var pipetteObject = {};			

Blockly.Blocks['pipette'] = {
	init: function() {
		var pipetteArray={};
		pipetteArray['id']=this.id; 
		pipetteObject[this.id]=pipetteArray; //It adds the LOCAL array in the GLOBAL object with the key "id".
		
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		this.setTooltip('');
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("PIPETTE")
		
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("","pipettename");
		
		/*Dropdown menu to choose the behaviour of the pipette, and over all the particular displays in the container*/
		var dropdownType = new Blockly.FieldDropdown([["transfer", "1"], ["distribute", "2"], ["consolidate", "3"], ["continuous transfer", "4"]], function(option){
			var pipetteType = option //We create this variable to call directly to the function(It has the same value of pipetteTypeName but, it's used only in this moment, then it is removed
			this.sourceBlock_.updateType_(pipetteType,1); 
			
		});
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField(dropdownType, "pipetteTypeName");
		/*Basis of the pipette block -->> SOURCE and DESTINATION containers*/    
		this.appendValueInput("source")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Source");
		this.appendValueInput("destination")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Destination");
		/*Other inputs*/    
		this.appendDummyInput("timeOfOperation")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Time of operation")
		    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "timeOfOperation");
		this.appendDummyInput('settings')//The settings input is monitored from onchange() function
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Settings")
		    .appendField(new Blockly.FieldCheckbox("FALSE"), "setting_check_box");
		/*Variables to check the real changes in the blocks or in the context.*/    
		this.prevTypeSource=0; //initialization the type of the block in the source
		this.prevTypeDestination=0;   //initialization the type of the block in the destination
	},
	
/************************************************************************************************************************************************************/	
/*********************************************************FUNCTION UPDATETYPE_()*****************************************************************************/		
/*Function which works associated with the DD menu and it is activated when there is a change in the menu*/	
	updateType_ : function(pipetteType,resetSettings){
		
		/*Variables to check changes*/
		var pipetteTypeLocal = Number(pipetteType); //Transform the string variable to number
		var blockSource; //Local variable to assign the block connected to the source of the pipette
		var bSoType; //Type of the previous described block (SOURCE)
		var blockDestination; //Local variable to assign the block connected to the destination of the pipette
		var bDeType; //Type of the previous described block (Destination=
		
		switch(pipetteTypeLocal) {//JS function to structure better the if-else sentences
		
		/********************TRANSFER SOURCE*************************/
		    case 1: 
	            if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		        	blockSource = this.getInputTargetBlock('source') 
		        	var isList = blockSource.getInput('contListOption');//Check if it is a list
		        	if(isList){
			        	if(blockSource.getInput('contListOptionValueNum1')){ 
			        		blockSource = blockSource.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	/*SEARCH FOR EACH BLOCK IF THE LIST EXISTS!!!!!*/
		        	if(blockSource!=null){
			        	bSoType = blockSource.getFieldValue('container_type_global')
			        	if (bSoType > 200 ){	
			/***<!--**************TRANSFER_SOURCE_AGAROSE*****************-->***/		
							if ( bSoType < 300 ) {
								this.resetSourceInputs_();
								/*The next four sentences detach the blockSource*/
								blockSource.setParent(null);
								var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);
							    var dy = Blockly.SNAP_RADIUS * 2;
							    blockSource.moveBy(dx, dy);
							}
			/***<!--**************TRANSFER_SOURCE_MULTIWELLPLATE*********************-->***/
							else {this.resetSourceInputs_();}
		        	 	}
		     /***<!--**************TRANSFER_SOURCE_EPPENDORF*******************-->***/   	 
		        	 	else{this.resetSourceInputs_();	}  
		        	}
			    }else{//If if not exits block in the input
				    this.resetSourceInputs_();
				}
		/***<!--**********************************************************-->***/
		/***<!--**************TRANSFER_DESTINATION************************-->***/	    
		        if(this.getInputTargetBlock('destination')){ //Get the block in the DESTINATION input if exists   
			        
		        	blockDestination = this.getInputTargetBlock('destination')
		        	var isList = blockDestination.getInput('contListOption'); //Check if it is a list
		        	if(isList){
			        	if(blockDestination.getInput('contListOptionValueNum1')){
			        		blockDestination = blockDestination.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	if(blockDestination!=null){
		        	bDeType = blockDestination.getFieldValue('container_type_global')
			        	if (bDeType > 200 ){	
				        /***<!--****************TRANSFER_DESTINATION_AGAROSE*********************-->***/			
							/** IF TYPE IN RANGE = AGAROSE_GEL**/
							if ( bDeType < 300 ) {
								this.resetDestinationInputs_();
							}
						/***<!--*************TRANSFER_DESTINATION_MULTIWELLPLATE**************-->***/	
							/** IF TYPE IN RANGE = MULTI WELL PLATE**/
							else {
								this.resetDestinationInputs_();
							}
	        	 		}
	        	 /***<!--************TRANSFER_DESTINATION_EPPENDORF********************-->***/	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	else{
			        	 	this.resetDestinationInputs_();
		        			
			        	} 
		        	}    
			    }else {
				    this.resetDestinationInputs_();
			    }
		    
			    
		        break;
		    /***<!--***************DISTRIBUTE***********************-->***/
		    /***<!--**********************************************************-->***/
		    /***<!--***************DISTRIBUTE_SOURCE********************************-->***/
		       case 2:
		        	if(this.getInputTargetBlock('source') ){  //Get the block in the DESTINATION input if exists  
		        	blockSource = this.getInputTargetBlock('source') 
		        	var isList = blockSource.getInput('contListOption');  //Check if it is a list
		        	if(isList){
			        	if(blockSource.getInput('contListOptionValueNum1')){
			        		blockSource = blockSource.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	if(blockSource!=null){
			        	bSoType = blockSource.getFieldValue('container_type_global')
			        	if (bSoType > 200 ){	
			/***<!--***********DISTRIBUTE_SOURCE_AGAROSE*********************-->***/		
							/** IF TYPE IN RANGE = AGAROSE_GEL**/
							if ( bSoType < 300 ) {
								this.resetSourceInputs_();
								/*The next four sentences detach the blockSource*/
								blockSource.setParent(null);
								var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);
							    var dy = Blockly.SNAP_RADIUS * 2;
							    blockSource.moveBy(dx, dy);
							}
			/***<!--***************DISTRIBUTE_SOURCE_MULTIWELLPLATE*******************-->***/
							/** IF TYPE IN RANGE = MULTI WELL PLATE**/
							else {
								
							}
		        	 	}
		     /***<!--**************DISTRIBUTE_SOURCE_EPPENDORF*****************-->***/   	 	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	else{
		        			this.resetSourceInputs_();
			        	}  
		        	}
			    }else{
				    this.resetSourceInputs_();
			    }
		/***<!--**********************************************************-->***/
		/***<!--**********DISTRIBUTE_DESTINATION_***************-->***/
				if(this.getInputTargetBlock('destination')){ //Get the block in the DESTINATION input if exists   /
					var numberBlocks=1;
		        	blockDestination = this.getInputTargetBlock('destination')
		        	var isList = blockDestination.getInput('contListOption');  //Check if it is a list 
		        	if(isList){
			        	if(blockDestination.getInput('contListOptionValueNum1')){
			        		numberBlocks=this.countNumberBlocks_(blockDestination);
				        	blockDestination = blockDestination.getInputTargetBlock('contListOptionValueNum1');		
		        		}
		        	}
		        	if(blockDestination!=null){
			        	bDeType = blockDestination.getFieldValue('container_type_global')
			        	if (bDeType > 200 ){	
			/***<!--***********DISTRIBUTE_DESTINATION_AGAROSE********************-->***/		
							/** IF TYPE IN RANGE = AGAROSE_GEL**/
							if ( bDeType < 300 ) {
								this.resetDestinationInputs_();
							
							}
			/***<!--*********DISTRIBUTE_DESTINATION_MULTIWELLPLATE***********************-->***/
							/** IF TYPE IN RANGE = MULTI WELL PLATE**/
							else {
								this.resetDestinationInputs_();
								
							}
		        	 	}
		     /***<!--************DISTRIBUTE_DESTINATION_EPPENDORF*******************-->***/   	 	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	else{
			        	 	this.resetDestinationInputs_();
			        	 	
			        	} 
		        	} 
	        	}else{
		        	 this.resetDestinationInputs_();
			    }
		        break;
		    
		    
		    /***<!--***************CONSOLIDATE***********************-->***/
		    /***<!--**********************************************************-->***/
		    /***<!--***************CONSOLIDATE_SOURCE********************************-->***/
		    case 3:
	        	if(this.getInputTargetBlock('source') ){ 
		        	blockSource = this.getInputTargetBlock('source') 
		        	var numberBlocks=1;
		        	var isList = blockSource.getInput('contListOption');
		        	if(isList){
						/*If it is a list we first must check that none block is agarose when are connected*/
			        	numberBlocksInList = blockSource.getFieldValue('contListOptionValue');
						var substring='contListOptionValueNum'
						var j=0;
						for(var i = 0; i<numberBlocksInList; i++){ //iterate every blocks in the list to check if any is agarose.
				    		j++;
				    		var string = substring+j  //create the sring valueX which is the name of each input 
				    		if(blockSource.getInputTargetBlock(string)){
				        		actualBlock=blockSource.getInputTargetBlock(string);
				        		if ( actualBlock.getFieldValue('container_type_global')==201){ //If it is agarose
						        	/*The next four sentences detach the blockSource*/
					        		actualBlock.setParent(null);
									var dx = Blockly.SNAP_RADIUS * (actualBlock.RTL ? -1 : 1);
								    var dy = Blockly.SNAP_RADIUS * 2;
								    actualBlock.moveBy(dx, dy);
							    }
				    		}
						}
						/*Finish check and detach of the agarose block*/
			        	if(blockSource.getInput('contListOptionValueNum1')){
				        	numberBlocks=this.countNumberBlocks_(blockSource);
			        		blockSource = blockSource.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        		
		        	}
		        	if(blockSource!=null){
			        	bSoType = blockSource.getFieldValue('container_type_global')
			        	if (bSoType > 200 ){	
			/***<!--***********CONSOLIDATE_SOURCE_AGAROSE*********************-->***/		
							/** IF TYPE IN RANGE = AGAROSE_GEL**/
							if ( bSoType < 300 ) {
								this.resetSourceInputs_();
								/*The next four sentences detach the blockSource*/
								blockSource.setParent(null);
								var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);
							    var dy = Blockly.SNAP_RADIUS * 2;
							    blockSource.moveBy(dx, dy);
							}
			/***<!--***************CONSOLIDATE_SOURCE_MULTIWELLPLATE*******************-->***/
							/** IF TYPE IN RANGE = MULTI WELL PLATE**/
							else {
								
							}
		        	 	}
		     /***<!--**************CONSOLIDATE_SOURCE_EPPENDORF*****************-->***/   	 	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	else{
		        			this.resetSourceInputs_();
			        	 	
			        	}  
		        	}
			    }else{
				    this.resetSourceInputs_();
			    }
			    
			    /***<!--**********************************************************-->***/
				/***<!--**************CONSOLIDATE_DESTINATION************************-->***/	    
		        if(this.getInputTargetBlock('destination')){ 
			        
		        	blockDestination = this.getInputTargetBlock('destination')
		        	var isList = blockDestination.getInput('contListOption');
		        	if(isList){
			        	if(blockDestination.getInput('contListOptionValueNum1')){
			        		blockDestination = blockDestination.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	if(blockDestination!=null){
		        	bDeType = blockDestination.getFieldValue('container_type_global')
			        	if (bDeType > 200 ){	
				        /***<!--****************CONSOLIDATE_DESTINATION_AGAROSE*********************-->***/			
							/** IF TYPE IN RANGE = AGAROSE_GEL**/
							if ( bDeType < 300 ) {
								this.resetDestinationInputs_();
								/*The next four sentences detach the blockSource*/
								blockDestination.setParent(null);
								var dx = Blockly.SNAP_RADIUS * (blockDestination.RTL ? -1 : 1);
							    var dy = Blockly.SNAP_RADIUS * 2;
							    blockDestination.moveBy(dx, dy);
							}
						/***<!--*************CONSOLIDATE_DESTINATION_MULTIWELLPLATE**************-->***/	
							/** IF TYPE IN RANGE = MULTI WELL PLATE**/
							else {
								
							}
	        	 		}
	        	 /***<!--************CONSOLIDATE_DESTINATION_EPPENDORF********************-->***/	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	else{
			        	 	this.resetDestinationInputs_();
		        			
			        	} 
		        	}    
			    }else {
				    this.resetDestinationInputs_();
			    }	
	    
		        break;
		    /***<!--***************CONTINUOUS-TRANSFER***********************-->***/
		    /***<!--**********************************************************-->***/
		    /***<!--***************CONTINUOUS-TRANSFER_SOURCE********************************-->***/
		    case 4:
		    	if(this.getInput("pipetteTypeName0")==null){
		    		
		    		this.appendDummyInput("Duration_type")
					    .setAlign(Blockly.ALIGN_RIGHT)
					    .appendField("Duration")
					    .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "DURATION")
					    .appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "Unit_Time");
					
					this.appendDummyInput("pipetteTypeName0")
						.setAlign(Blockly.ALIGN_RIGHT)
					    .appendField(new Blockly.FieldDropdown([["one to one", "1"], ["one to many", "2"], ["many to one", "3"]]), "pipetteTypeName0");
				}    

	            if(this.getInputTargetBlock('source') ){ //Get the block in the DESTINATION input if exists  
		        	blockSource = this.getInputTargetBlock('source') 
		        	var isList = blockSource.getInput('contListOption');
		        	if(isList){    //Check if it is a list 
			        	/*If it is a list we first must check that none block is agarose or multi well when are connected*/
		        		numberBlocksInList = blockSource.getFieldValue('contListOptionValue');
						var substring='contListOptionValueNum'
						var j=0;
						for(var i = 0; i<numberBlocksInList; i++){
				    		j++;
				    		var string = substring+j
				    		if(blockSource.getInputTargetBlock(string)){
				        		actualBlock=blockSource.getInputTargetBlock(string);
				        		if ( actualBlock.getFieldValue('container_type_global')>200){
						        	/*The next four sentences detach the blockSource*/
					        		actualBlock.setParent(null);
									var dx = Blockly.SNAP_RADIUS * (actualBlock.RTL ? -1 : 1);
								    var dy = Blockly.SNAP_RADIUS * 2;
								    actualBlock.moveBy(dx, dy);
							    }
				    		}
						}
			        	if(blockSource.getInput('contListOptionValueNum1')){
			        		blockSource = blockSource.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	if(blockSource!=null){
			        	bSoType = blockSource.getFieldValue('container_type_global')
			        	if (bSoType > 200 ){	
			/***<!--**************CONTINUOUS-TRANSFER_SOURCE_AGAROSE   OR   MULTIWELL*****************-->***/		
							/** IF TYPE IN RANGE = AGAROSE_GEL   OR   MULTIWELL**/
								//this.resetSourceInputs_();
								blockSource.setParent(null);
								var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);
							    var dy = Blockly.SNAP_RADIUS * 2;
							    blockSource.moveBy(dx, dy);
							
		        	 	}
		     /***<!--**************CONTINUOUS-TRANSFER_SOURCE_EPPENDORF*******************-->***/   	 	
		        	 	/** IF TYPE IN RANGE = EPPENDORF**/
		        	 	
		        	 	else{
		        			//this.resetSourceInputs_();
			        	}  
		        	}
			    }else{
				    //this.resetSourceInputs_();
			    }  
			      
			    /***<!--**********************************************************-->***/
					/***<!--**************CONTINUOUS_TRANSFER_DESTINATION************************-->***/
			    if(this.getInputTargetBlock('destination')){ 
			        
		        	blockDestination = this.getInputTargetBlock('destination')
		        	var isList = blockDestination.getInput('contListOption');
		        	if(isList){
			        	/*If it is a list we first must check that none block is agarose or multi well when are connected*/
			        	numberBlocksInList = blockDestination.getFieldValue('contListOptionValue');
						var substring='contListOptionValueNum'
						var j=0;
						for(var i = 0; i<numberBlocksInList; i++){
				    		j++;
				    		var string = substring+j
				    		if(blockDestination.getInputTargetBlock(string)){
				        		actualBlock=blockDestination.getInputTargetBlock(string);
				        		if ( actualBlock.getFieldValue('container_type_global')>200){
						        	actualBlock.setParent(null);
									var dx = Blockly.SNAP_RADIUS * (actualBlock.RTL ? -1 : 1);
								    var dy = Blockly.SNAP_RADIUS * 2;
								    actualBlock.moveBy(dx, dy);
							    }
				    		}
						}
			        	if(blockDestination.getInput('contListOptionValueNum1')){
			        		blockDestination = blockDestination.getInputTargetBlock('contListOptionValueNum1');
		        		}
		        	}
		        	if(blockDestination!=null){
		        	bDeType = blockDestination.getFieldValue('container_type_global')
			        	if (bDeType > 200 ){
				        	//this.resetDestinationInputs_();
							blockDestination.setParent(null);
							var dx = Blockly.SNAP_RADIUS * (blockDestination.RTL ? -1 : 1);
						    var dy = Blockly.SNAP_RADIUS * 2;
						    blockDestination.moveBy(dx, dy);
					    }
				    }
			    }else{/**this.resetDestinationInputs_();**/}
		    
		 
		        break; 
		    default:
		        alert("There was a problem in the pipette");
		}
		if(resetSettings){
		    this.setFieldValue('FALSE','setting_check_box');
	    }
	
			
	},
			
/***<!--***************************************************************************************************************************************************	-->**/					
/***<!--***************************************************************************************************************************************************	-->**/	
	displaySettings_ : function(){ //Options are displayed by the onchange function when the check boz "Settings" is true.
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=pipetteObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(this.getFieldValue('pipetteTypeName')<4){/*If type of pipette is transfer, distribute or consolidate*/
			this.appendDummyInput("settings1")//Creating input with three lines
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("aspirationspeed ")
				.appendField(new Blockly.FieldTextInput("---"), "aspirationspeed")
				.appendField("dispense speed")
				.appendField(new Blockly.FieldTextInput("---"), "dispensespeed")
				.appendField("mix after/before")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "mixafterbefore");
			
				//If we had created previously the values and then remove the inputs, this allow remember the past values.
			if(currentArray.hasOwnProperty('aspirationspeed')){ //Check if it exists in the array
				this.setFieldValue(currentArray['aspirationspeed'],"aspirationspeed"); //Set the value in the corresponding field.
			}
			if(currentArray.hasOwnProperty('dispensespeed')){
				this.setFieldValue(currentArray['dispensespeed'],"dispensespeed");
			}
			if(currentArray.hasOwnProperty('mixafterbefore')){
				this.setFieldValue(currentArray['mixafterbefore'],"mixafterbefore");
			}	
		}else{/*If type is coninuous transfer*/
			this.appendDummyInput("settings2")//Creating input
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("mix after/before")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "mixafterbefore");
			//If we had created previously the values and then remove the inputs, this allow remember the past values.	
			if(currentArray.hasOwnProperty('mixafterbefore')){
				this.setFieldValue(currentArray['mixafterbefore'],"mixafterbefore");
			}	
		}
		
	},
/***<!--***************************************************************************************************************************************************	-->**/					
/***<!--***************************************************************************************************************************************************	-->**/	
	updateArrayObject_ : function(){
		
		if (this.getFieldValue("setting_check_box")=='TRUE' && this.getInput("settings1")){//Check if this input exists 
		
			var myId = this.id;//we get our id, to locate us in the global array.
			myId=myId.toString()
			var currentArray=pipetteObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			currentArray['aspirationspeed']=this.getFieldValue('aspirationspeed');//If the input exists set the current value of this input.
			currentArray['dispensespeed']=this.getFieldValue('dispensespeed');
			currentArray['mixafterbefore']=this.getFieldValue('mixafterbefore');
		}
		if (this.getFieldValue("setting_check_box")=='TRUE' && this.getInput("settings2")){//Check if this input exists 
		
		var myId = this.id;//we get our id, to locate us in the global array.
			myId=myId.toString()
			var currentArray=pipetteObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			currentArray['mixafterbefore']=this.getFieldValue('mixafterbefore');//If the input exists set the current value of this input.
			
		}
	},
	
/***<!--***************************************************************************************************************************************************	-->**/					
/***<!--***************************************************************************************************************************************************	-->**/	
	onchange: function() {
		
		this.updateArrayObject_();//Update the array 
		
		/***<!--**********UPDATE SETTINGS***************-->*****/
		var updateForList=0; //Boolean to check if the local context of the pipette require chnage it shape, detach, or some action.
		
		if( this.getFieldValue('setting_check_box')=='TRUE'){ //Check boz of settings is true
			if(this.getInput('settings1')==null  &&  this.getInput('settings2')==null){ //It doesn't already exists the input the create it.
				this.displaySettings_();
			}
		}else{	//If it's false, check that there is not the input, or remove it if it exists.				
			if(this.getInput('settings1')!=null){
				this.removeInput('settings1');
			}
			if(this.getInput('settings2')!=null){
				this.removeInput('settings2');
			}
		}
		
		/***<!--**********CHECK CHANGES IN SOURCE******-->*****/
		blockSource = this.getInputTargetBlock('source') //Get the block set in the source
    	if(blockSource!=null){
			var isList1 = blockSource.getInput('contListOption');
        	if(isList1){ //Check if it is a list
	        	if (this.getFieldValue('pipetteTypeName')==1 || this.getFieldValue('pipetteTypeName')==2 || (this.getFieldValue('pipetteTypeName')==4 && ((this.getFieldValue('pipetteTypeName0')==1 || this.getFieldValue('pipetteTypeName0')==2)))){
		        	//If it is transfer, distribute or continuous transfer (and one in source) detach the list.
		        	//The next four sentences are for removing the block source
		        	blockSource.setParent(null);
					var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);
				    var dy = Blockly.SNAP_RADIUS * 2;
				    blockSource.moveBy(dx, dy);
			    }else if(blockSource.getInput('contListOptionValueNum1')){ //if it is consolidate or continuos transfer (and option many)
		        	numberBlocksSource=this.countNumberBlocks_(blockSource); //Count the real number of blocks.
	        		blockSource = blockSource.getInputTargetBlock('contListOptionValueNum1');
        		}
        	}
        	if(blockSource!=null){
        		var typeSource = blockSource.getFieldValue('container_type_global');
    		}else{typeSource=0}
    	}else{typeSource=0;numberBlocksSource=0;}
    	
    	/***<!--**********CHECK CHANGES IN DESTINATION******-->*****/
		blockDestination = this.getInputTargetBlock('destination') //Get the block set in the destination
    	if (blockDestination!=null){
			var isList2 = blockDestination.getInput('contListOption');
        	if(isList2){//Check if it is a list
	        	if (this.getFieldValue('pipetteTypeName')==1 || this.getFieldValue('pipetteTypeName')==3 || (this.getFieldValue('pipetteTypeName')==4 && ((this.getFieldValue('pipetteTypeName0')==1 || this.getFieldValue('pipetteTypeName0')==3)))){
		        	//If it is transfer, consolidate or continuous transfer (and one in destination) detach the list.
		        	//The next four sentences are for removing the block source
		        	blockDestination.setParent(null);
					var dx = Blockly.SNAP_RADIUS * (blockDestination.RTL ? -1 : 1);
				    var dy = Blockly.SNAP_RADIUS * 2;
				    blockDestination.moveBy(dx, dy);
			    }else if(blockDestination.getInput('contListOptionValueNum1')){ //if it is distribute or continuos transfer (and option many)
		        	numberBlocksDestination=this.countNumberBlocks_(blockDestination);
	        		blockDestination = blockDestination.getInputTargetBlock('contListOptionValueNum1');
        		}
        	}
        	if(blockDestination!=null){
        		var typeDestination = blockDestination.getFieldValue('container_type_global');
    		}else{typeDestination=0}
		}else{typeDestination=0;numberBlocksDestination=0;}
		
		/***<!--**********UPDATING*********************-->*****/
        if(typeSource!=this.prevTypeSource || typeDestination!=this.prevTypeDestination || this.prevnumberBlocksSource!=numberBlocksSource || this.prevnumberBlocksDestination!=numberBlocksDestination ){			        	
			this.updateType_(this.getFieldValue('pipetteTypeName'),0);
		}
		this.prevTypeSource=typeSource;
		this.prevTypeDestination=typeDestination;
		this.prevnumberBlocksSource=numberBlocksSource;
		this.prevnumberBlocksDestination=numberBlocksDestination;
		
		
		if(blockSource != null && blockDestination!=null){
			this.setFieldValue(+blockSource.getFieldValue("containerName") +"-"+blockDestination.getFieldValue("containerName") ,"pipettename");
		}else if(blockSource != null){
			this.setFieldValue(blockSource.getFieldValue("containerName"),"pipettename" );	
		}else if(blockDestination != null){
			this.setFieldValue(blockDestination.getFieldValue("containerName") ,"pipettename");	
		}
			
		
	},

/***<!--******************************************************************************************************************************************************/		
/******************************************************************************************************************************************************-->****/			
	//function to remove some inputs which appears only with continuous transfer
	resetSourceInputs_ : function(){
		if(this.getInput('pipetteTypeName0')){//if it exists, remove it.
			this.removeInput('pipetteTypeName0');
		}
		if(this.getInput('Duration_type')){ //if it exists, remove it.
					this.removeInput('Duration_type');
		}
	},
/***<!--***************************************************************************************************************************************************	-->**/	
/***<!--***************************************************************************************************************************************************	-->**/	

	//function to remove some inputs which appears only with continuous transfer
	resetDestinationInputs_ : function(){
		if(this.getInput('pipetteTypeName0')){ //if it exists, remove it.
			this.removeInput('pipetteTypeName0');
		}
		if(this.getInput('Duration_type')){ //if it exists, remove it.
					this.removeInput('Duration_type');
		}
	},
/***<!--***************************************************************************************************************************************************	-->**/	
/***<!--***************************************************************************************************************************************************	-->**/					
	/*This function is used to count the number of containers in a list because sometimes there are not as many as should.*/
	countNumberBlocks_ : function(currentBlock){
		var numberBlocks=0; //Initialize the variable 
		numberBlocksInList = currentBlock.getFieldValue('contListOptionValue'); //Get the maximum number of blocks that it can be in the list.
		var substring='contListOptionValueNum'  //Creation of the substring which we add the number to get the complete string.
		var j=0;
		for(var i = 0; i<numberBlocksInList; i++){
    		j++;
    		var string = substring+j
    		if(currentBlock.getInputTargetBlock(string)){ //If it exists the block inside the input we increase numberBlocks. 
        		numberBlocks = numberBlocks+1;
    		}
		}
		return numberBlocks;
	},
	mutationToDom: function() {
		//var container = document.createElement('mutation');//Creating a elemtn which name is "mutation" where save the parameters of the array
		//container.setAttribute("contListOptionValue",this.getFieldValue("contListOptionValue"));
		//return container;//return the container to the xml document created ach time we copy or save the block.
		var toReturn=0;
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=pipetteObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		var container = document.createElement('mutation');//Creating a elemtn which name is "mutation" where save the parameters of the array
		
		if (this.getFieldValue("pipetteTypeName")==4){ //If type of pipette continuous transfer
			
			container.setAttribute("typepipette",this.getFieldValue("pipetteTypeName")); //Save the type because affect in the shape of the block (mutation)
			container.setAttribute("typecontinuoustransfer",this.getFieldValue("pipetteTypeName0")); //Save the type of conntiuous transfer (between one-to-one, one-to-many, and many-to-one
			toReturn=1;
		} 
		if(currentArray.hasOwnProperty('aspirationspeed')){ //If there is the variable in the array 
			container.setAttribute("aspirationspeed",currentArray['aspirationspeed']); //Set in the container the value.
			toReturn=1;
		}
		if(currentArray.hasOwnProperty('dispensespeed')){
			container.setAttribute("dispensespeed",currentArray['dispensespeed']);
			toReturn=1;
		}
		if(currentArray.hasOwnProperty('mixafterbefore')){
			container.setAttribute("mixafterbefore",currentArray['mixafterbefore']);
			toReturn=1;
		}
		if(currentArray.hasOwnProperty('timeofoperation')){
			container.setAttribute("timeofoperation",currentArray['timeofoperation']);
			toReturn=1;
		}
		if (toReturn==1){ //If there are no information in the array we don't save any information.
			return container;
		}
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we paste or load the block.*/
	domToMutation: function(xmlElement) {
		if(xmlElement.getAttribute('typepipette')!=null){ //Check if in the xml text was saved the info of pipette type continuous transfer
			this.setFieldValue(xmlElement.getAttribute('typepipette'),"pipetteTypeName"); //Set the field of continuous transfer
			this.updateType_(xmlElement.getAttribute('typepipette'));  //Update the shape of the block switch the continuous transfer behaviour
			this.setFieldValue(xmlElement.getAttribute('typecontinuoustransfer'),"pipetteTypeName0"); //Set the field o the kind of continuous transfer block
		}
		if(xmlElement.getAttribute('aspirationspeed')!=null){//If there are info from settings of the thre first types.
			var myId = this.id;//we get our id, to locate us in the global array.
			myId=myId.toString()
			var currentArray=pipetteObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			currentArray["aspirationspeed"]=xmlElement.getAttribute('aspirationspeed'); //Update the array.
			currentArray["dispensespeed"]=xmlElement.getAttribute('dispensespeed');
			currentArray["mixafterbefore"]=xmlElement.getAttribute('mixafterbefore');
		}
		if(xmlElement.getAttribute('mixafterbefore')!=null){
			currentArray["mixafterbefore"]=xmlElement.getAttribute('mixafterbefore');
		}
	},
	
	optionsDisplay_ : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( currentBlock.getInputTargetBlock('volume')!=null){ //If the option "volume" is displayed in this moment in the container block connected:
			var volumeBlock = currentBlock.getInputTargetBlock('volume');
			var volumeValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

			if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
				volumeValue = Blockly.JavaScript.valueToCode(currentBlock, 'volume', Blockly.JavaScript.ORDER_NONE);
			} else {
				volumeValue = volumeBlock.getFieldValue('VAR');
			}
			currentCode= currentCode + '                             ,"volume": "' + volumeValue + ":" + currentBlock.getFieldValue("unit_volume") +'"\n  '  // Write the next code added to the first code.
		}
		/*Special Sanger Sequencing */
		if( currentBlock.getFieldValue('datareference')!=null){
			currentCode= currentCode + '                             ,"datareference": " ' +currentBlock.getFieldValue("datareference") +'" \n  '
		}
		/*sanger sequencing and measurement with multiple well*/
		if( currentBlock.getFieldValue('singlewelladdrinput')!=null){
			currentCode= currentCode + '                             ,"single well": " ' +currentBlock.getFieldValue("singlewelladdrinput") +'" \n  '
		}
		if( currentBlock.getFieldValue('multipleWellAddrInput')!=null){
			currentCode= currentCode + '                             ,"individual multiple wells": " ' +currentBlock.getFieldValue("multipleWellAddrInput") +'" \n  '
		}
		
		if( currentBlock.getFieldValue('multiplewells')!=null){
			for (var i = 0; i < currentBlock.getFieldValue('multiplewells'); i++) {//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				var volumeBlock = currentBlock.getInputTargetBlock('volume' + i);
				var volumeValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

				if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
					volumeValue = Blockly.JavaScript.valueToCode(currentBlock, 'volume' + i, Blockly.JavaScript.ORDER_NONE);
				} else {
					volumeValue = volumeBlock.getFieldValue('VAR');
				}
				currentCode= currentCode + '                             ,"well address": " ' +currentBlock.getFieldValue("multiplewelladdress"+i) +'" \n  '
				currentCode = currentCode + '                             ,"volume" : " ' + volumeValue + ":" + currentBlock.getFieldValue("unit_volume" + i) + '" \n  '
			}
		}
		
		/*Special for Agarose*/
		if( currentBlock.getFieldValue('gelcomposition')!=null){
			currentCode= currentCode + '                             ,"matrix": " ' +currentBlock.getFieldValue("gelcomposition") +'" \n  '
		}
		if( currentBlock.getFieldValue('valueagarose')!=null){
			for( var i=0; i<currentBlock.getFieldValue('valueagarose');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				var volumeBlock = currentBlock.getInputTargetBlock('volumegel' + i);
				var volumeValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

				if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
					volumeValue = Blockly.JavaScript.valueToCode(currentBlock, 'volumegel' + i, Blockly.JavaScript.ORDER_NONE);
				} else {
					volumeValue = volumeBlock.getFieldValue('VAR');
				}
				currentCode= currentCode + '                             ,"gel well address": " ' +currentBlock.getFieldValue("gelwelladdress"+i) +'" \n  '
				currentCode= currentCode + '                             ,"volume": " ' + volumeValue + ":" +currentBlock.getFieldValue("unit_volume_gel"+i) +'" \n  '
			}
		}
		/*Special for eppendorf*/
		if (currentBlock.getInput('optionsCTMode') != null) {
			var flowBlock = currentBlock.getInputTargetBlock('flowrate');
			var flowValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

			if (flowBlock.getFieldValue('VAR') == null) { // block is a number
				flowValue = Blockly.JavaScript.valueToCode(currentBlock, 'flowrate', Blockly.JavaScript.ORDER_NONE);
			} else {
				flowValue = flowBlock.getFieldValue('VAR');
			}
			currentCode = currentCode + '                             ,"flow rate": " ' + flowValue + ":" + currentBlock.getFieldValue("flowrate_units_volume") + "/" + currentBlock.getFieldValue("flowrate_units_time") + '" \n  '
			currentCode = currentCode + '                             ,"continuous mixing": " ' + currentBlock.getFieldValue("continuousmixing") + '" \n  '
		}
		if( currentBlock.getInput('optionsCTMode2')!=null){
			currentCode= currentCode + '                             ,"continuous mixing": " ' +currentBlock.getFieldValue("continuousmixing") +'" \n  '
		}
		/*Special thermocycling*/
		if( currentBlock.getFieldValue('steps')!=null){
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode + '                             ,"temperature": " ' +currentBlock.getFieldValue("temperature"+i) +'" \n  '
				currentCode= currentCode + '                             ,"duration": " ' +currentBlock.getFieldValue("duration"+i) +'" \n  '
			}
		}
		
		return currentCode;
	},
	optionsDisplay_naturalLanguage : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( currentBlock.getInputTargetBlock('volume')!=null){ //If the option "volume" is displayed in this moment in the container block connected:
			var volumeBlock = currentBlock.getInputTargetBlock('volume');
			var volumeValue = "unknow";
			
			if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
				volumeValue = Blockly.JavaScript.valueToCode(currentBlock, 'volume', Blockly.JavaScript.ORDER_NONE);
			} else {
				volumeValue = volumeBlock.getFieldValue('VAR');
			}

			currentCode= currentCode + ' with ' + volumeValue +" " +currentBlock.getFieldValue("unit_volume") +"s ";  // Write the next code added to the first code.
		}
		/*Special Sanger Sequencing */
		if( currentBlock.getFieldValue('datareference')!=null){
			currentCode= currentCode + ' with datareference ' +currentBlock.getFieldValue("datareference") +' ';
		}
		/*sanger sequencing and measurement with multiple well*/
		if( currentBlock.getFieldValue('singlewelladdrinput')!=null){
			currentCode= currentCode + ' in a single well addressed in ' +currentBlock.getFieldValue("singlewelladdrinput") +' ';
		}
		if( currentBlock.getFieldValue('multipleWellAddrInput')!=null){
			currentCode= currentCode + ' in individual multiple wells addressed in ' +currentBlock.getFieldValue("multipleWellAddrInput") +' ';
		}
		
		if( currentBlock.getFieldValue('multiplewells')!=null){
			for( var i=0; i<currentBlock.getFieldValue('multiplewells');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode + ' well addressed in ' +currentBlock.getFieldValue("multiplewelladdress"+i) +' ';
				currentCode= currentCode + ' with ' +currentBlock.getFieldValue("volume"+i) +" " +currentBlock.getFieldValue("unit_volume"+i) +"s " +' ';
			}
		}
		
		/*Special for Agarose*/
		if( currentBlock.getFieldValue('gelcomposition')!=null){
			currentCode= currentCode + ' with matrix ' +currentBlock.getFieldValue("gelcomposition") +' ';
		}
		if( currentBlock.getFieldValue('valueagarose')!=null){
			for( var i=0; i<currentBlock.getFieldValue('valueagarose');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				var volumeBlock = currentBlock.getInputTargetBlock('volumegel' + i);
				var volumeValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

				if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
					volumeValue = Blockly.JavaScript.valueToCode(currentBlock, 'volumegel' + i, Blockly.JavaScript.ORDER_NONE);
				} else {
					volumeValue = volumeBlock.getFieldValue('VAR');
				}
				
				currentCode= currentCode + ' gel well addressed in ' +currentBlock.getFieldValue("gelwelladdress"+i) +' ';
				currentCode= currentCode + ' with ' + volumeValue +" " +currentBlock.getFieldValue("unit_volume_gel"+i) +"s " +' ';
				if (i+2 <= currentBlock.getFieldValue('valueagarose')){
					currentCode= currentCode + ', ';
				}
			}
		}
		/*Special for eppendorf*/
		if( currentBlock.getInput('optionsCTMode')!=null){
			var flowRate = "unknow";
			if (currentBlock.getInputTargetBlock("flowrate") != null) {
				var flowBlock = currentBlock.getInputTargetBlock("flowrate");
				if (flowBlock.getFieldValue('VAR') == null) { // block is a number
					flowRate = Blockly.JavaScript.valueToCode(currentBlock, 'flowrate', Blockly.JavaScript.ORDER_NONE);
				} else {
					flowRate = flowBlock.getFieldValue('VAR');
				}
			}
			currentCode= currentCode + ' with flow rate of ' + flowRate + ' ' + currentBlock.getFieldValue("flowrate_units_volume") + '/' + currentBlock.getFieldValue("flowrate_units_time");
			currentCode= currentCode + ' with continuous mixing": ' +currentBlock.getFieldValue("continuousmixing") +'" ';
		}
		if( currentBlock.getInput('optionsCTMode2')!=null){
			currentCode= currentCode + ' with continuous mixing: " ' +currentBlock.getFieldValue("continuousmixing") +'" ';
		}
		/*Special thermocycling*/
		if( currentBlock.getFieldValue('steps')!=null){
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode + ' with temperature": " ' +currentBlock.getFieldValue("temperature"+i) +' '
				currentCode= currentCode + ' with duration": " ' +currentBlock.getFieldValue("duration"+i) +' '
			}
		}
		
		return currentCode;
	}	

/***<!--*********************************************************************************************************************************************************	
/**************************************************************************************************************************************************************-->***/	
};

