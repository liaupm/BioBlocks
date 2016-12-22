Blockly.Blocks['turbidostat'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Turbidostat");
        this.appendValueInput("media")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Media");
        this.appendValueInput("cellCulture")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Cell culture");
        this.appendValueInput("waste")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Waste");
        this.appendValueInput("flowrate")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(["Number", "Variable"])
            .appendField("Flow rate")
            .appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "flowrate_units_volume")
            .appendField("/")
            .appendField(new Blockly.FieldDropdown([["Hours", "hours"], ["Minutes", "minutes"], ["Seconds", "seconds"]]), "flowrate_units_time");

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Time of operation")
            .appendField(new Blockly.FieldTextInput("0"), "timeOfOperation");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Duration")
            .appendField(new Blockly.FieldTextInput("0"), "duration")
            .appendField(new Blockly.FieldDropdown([["Hours", "hours"], ["Minutes", "minutes"], ["Seconds", "seconds"], ["Milliseconds", "milliseconds"]]), "Unit_Time");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Frequency")
            .appendField(new Blockly.FieldTextInput("0"), "FREQUENCYOFMEASUREMENT");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Wavelength")
            .appendField(new Blockly.FieldTextInput("0"), "wavelengthnum");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Mantain OD")
            .appendField(new Blockly.FieldDropdown([["Algorithm 1", "algorithm1"], ["Algorithm 2", "algorithm2"], ["Algorithm 3", "algorithm3"]]), "update_algorithm");
		this.appendValueInput("threshold")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(["Number", "Variable"])
            .appendField("Threshold");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },

    optionsDisplay_: function (code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 

    },

    optionsDisplay_naturalLanguage: function (code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 

    }
};