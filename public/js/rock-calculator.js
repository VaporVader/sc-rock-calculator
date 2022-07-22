let RockCalculator = 
{
    materialsRenderArea         : null,
    materialTemplate            : null,
    rockMassElement             : null,
    rockValueElement            : null,
    rockScuElement              : null,
    rockValueScuElement         : null,
    rockTypeElement             : null,
    addNewMaterialElement       : null,
    rockTypeOverviewRenderArea  : null,
    rockTypeTemplate            : null,
    rockTypeContentEntryTemplate: null,

    materials: null,
    rockTypes: null,

    selectableMaterials     : [],
    selectedRockTypePreset  : null,

    rockTypeInfoVisible: false,

    rockTypeImagePath: 'images/rock-types/',

    /**
     * Init function to set start values for Calculator.
     */
    init: function( materials, rockTypes )
    {
        this.materialsRenderArea            = document.querySelector( '#calculator-materials' );
        this.materialTemplate               = document.querySelector( '#rockContentTemplate' );
        this.rockMassElement                = document.querySelector( '#rockMass' );
        this.rockValueElement               = document.querySelector( '#rockValue' );
        this.rockScuElement                 = document.querySelector( '#rockSCU' );
        this.rockValueScuElement            = document.querySelector( '#rockValueSCU' );
        this.rockTypeElement                = document.querySelector( '#rockType' );
        this.addNewMaterialElement          = document.querySelector( '#calculator-add-material' );
        this.rockTypeOverviewRenderArea     = document.querySelector( '#calculator-rock-type-overview' );
        this.rockTypeTemplate               = document.querySelector( '#rockTypeTemplate' );
        this.rockTypeContentEntryTemplate   = document.querySelector( '#rockTypeContentEntryTemplate' );

        this.materials = materials;
        this.rockTypes = rockTypes;

        this._initRockTypeSelectionList();
        this._initMaterialSelectionList();
        this._initInputChangeHandler();
        this._setSelectableMaterials();

        // add first material, default = Inert
        this.addNewMaterial();
    },

    /**
     * Build up rock type select options, based on current available rock types.
     * @private
     */
    _initRockTypeSelectionList: function()
    {
        this.rockTypeElement.innerHTML = '';

        // default entry
        let rockTypeOption = document.createElement( 'option' );

        rockTypeOption.value        = '';
        rockTypeOption.textContent  = 'Unknown rock type';

        this.rockTypeElement.append( rockTypeOption );

        // rock type groups with entries
        for( let rockTypeGroupName in this.rockTypes )
        {
            let rockTypeGroup       = this.rockTypes[ rockTypeGroupName ];
            let rockTypeOptGroup    = document.createElement( 'optgroup' );

            rockTypeOptGroup.label = rockTypeGroupName;

            rockTypeGroup.forEach( ( rockType ) =>
            {
                let rockTypeOption = document.createElement( 'option' );

                rockTypeOption.value        = rockType.name;
                rockTypeOption.textContent  = rockType.name;

                rockTypeOptGroup.append( rockTypeOption );
            });

            this.rockTypeElement.append( rockTypeOptGroup );
        }
    },

    /**
     * Build up material select options, based on current available materials.
     * @private
     */
    _initMaterialSelectionList: function()
    {
        let materialSelectElement  = this.materialTemplate.content.querySelector( 'select[name="rockContent"]' );

        materialSelectElement.innerHTML = '';

        for( let materialName in this.materials )
        {
            let materialOption = document.createElement( 'option' );

            materialOption.value        = materialName;
            materialOption.textContent  = materialName;

            materialSelectElement.append( materialOption );
        }
    },

    /**
     * Init the change handler when user change any input or select.
     * @private
     */
    _initInputChangeHandler: function()
    {
        let calculatorInstance = this;

        document.addEventListener( 'change', ( event ) =>
        {
            if( event.target.matches( 'input, select' ) )
            {
                calculatorInstance.calculate();
                calculatorInstance._setSelectableMaterials();
            }

            if( event.target.matches( 'input[name="rockContentPercentage"]' ) )
            {
                calculatorInstance._checkMaterialsPercentage( event.target );
            }
        });

        document.addEventListener( 'keyup', ( event ) =>
        {
            if( event.target.matches( 'input, select' ) )
            {
                calculatorInstance.calculate();
                calculatorInstance._setSelectableMaterials();
            }

            if( event.target.matches( 'input[name="rockContentPercentage"]' ) )
            {
                calculatorInstance._checkMaterialsPercentage( event.target );
            }
        });
    },

    /**
     * Check that the sums of the material percentages not exceed 100%.
     * Also checks that an entered percentage cannot be negative.
     * @param {Object} changedPercentageElement
     * @private
     */
    _checkMaterialsPercentage: function( changedPercentageElement )
    {
        // check that entered percentage is not negative, then set to 0
        if( parseFloat( changedPercentageElement.value ) < 0 )
        {
            changedPercentageElement.value = 0;

            this.calculate();
        }

        let materialsPercentage = 0;
        let materialsPercentageElements = this.materialsRenderArea.querySelectorAll( 'div.material input[name="rockContentPercentage"]' );

        // get current materials percentage
        materialsPercentageElements.forEach( ( materialsPercentageElement ) =>
        {
            materialsPercentage += parseFloat( materialsPercentageElement.value );
        });

        // when exceeding, then limit changed percentage element to max value that not exceeds.
        if( materialsPercentage > 100 )
        {
            changedPercentageElement.value = changedPercentageElement.value - ( materialsPercentage - 100 );

            this.calculate();
        }
    },

    /**
     * Store current selected materials
     * and disable material options for every material select that are currently selected at other selects.
     * @private
     */
    _setSelectableMaterials: function()
    {
        let currentSelectedMaterials    = [];
        this.selectableMaterials        = [];

        for( let materialName in this.materials )
        {
            this.selectableMaterials.push( materialName );
        }

        let materialSelectElements = this.materialsRenderArea.querySelectorAll( 'div.material select[name="rockContent"]' );

        // get all selected materials as array
        materialSelectElements.forEach( ( materialSelectElement ) =>
        {
            currentSelectedMaterials.push( materialSelectElement.value );

            // remove selected materials from selectable list
            for( let i = 0; i < this.selectableMaterials.length; i++ )
            {
                let selectableMaterial = this.selectableMaterials[ i ];

                if( selectableMaterial === materialSelectElement.value )
                {
                    this.selectableMaterials.splice( i, 1 );
                }
            }
        });

        // disable options that are currently selected from other material selects
        materialSelectElements.forEach( ( materialSelectElement ) =>
        {
            let optionElements = materialSelectElement.querySelectorAll( 'option' );

            optionElements.forEach( ( optionElement ) => 
            {
                if( currentSelectedMaterials.includes( optionElement.value ) && optionElement.value !== materialSelectElement.value )
                {
                    optionElement.setAttribute( 'disabled', 'disabled' );
                }
                else
                {
                    optionElement.removeAttribute( 'disabled' );
                }
            });
        });

        // when no selectable materials left, then hide "add new material" button,
        // otherwise show it,
        // but only when no preset is loaded, then this button is always hidden.
        if( this.selectedRockTypePreset === null )
        {
            if( this.selectableMaterials.length === 0 )
            {
                this.addNewMaterialElement.style.display = 'none';
            }
            else
            {
                this.addNewMaterialElement.style.display = '';
            }
        }
    },

    /**
     * Get current selected rock type an load preset.
     */
    loadRockTypePreset: function()
    {
        let rockType        = this.rockTypeElement.value;
        let rockTypeData    = this.getRockTypeDataByName( rockType );

        this.materialsRenderArea.innerHTML = '';
        this.selectedRockTypePreset = null;

        this._setSelectableMaterials();

        // when rock type info is visible, then refresh this info
        if( this.rockTypeInfoVisible )
        {
            this.showSelectedRockTypeInfo();
        }

        // no rock type data found, then dont try to load a preset.
        // only show defaul with Inert as star material.
        if( rockTypeData === null )
        {
            this.addNewMaterialElement.style.display = '';
            this.addNewMaterial();

            return;
        }

        this.addNewMaterialElement.style.display = 'none';
        this.selectedRockTypePreset = rockType;

        // create preset from rock type content
        for( let materialName in rockTypeData.content )
        {
            this.addNewMaterial( materialName, false );
        }

        this.addNewMaterial( 'Inert', false );
    },

    /**
     * Get rock type data by given rock type name.
     * @param {String} rockTypeName
     * @returns {null|Object}
     */
    getRockTypeDataByName: function( rockTypeName )
    {
        let rockTypeData = null;

        // rock type groups with entries
        for( let rockTypeGroupName in this.rockTypes )
        {
            let rockTypeGroup = this.rockTypes[ rockTypeGroupName ];

            for( let rockTypeIndex in rockTypeGroup )
            {
                let rockType = rockTypeGroup[ rockTypeIndex ];

                if( rockType.name === rockTypeName )
                {
                    return rockType;
                }
            }
        }

        return rockTypeData;
    },

    /**
     * Close the info card for current selected rock type.
     */
    closeRockTypeInfo: function()
    {
        this.rockTypeOverviewRenderArea.style.display = 'none';

        // clear current content from render area
        this.rockTypeOverviewRenderArea.innerHTML = '';

        this.rockTypeInfoVisible = false;
    },

    /**
     * Show the info card for current selected rock type.
     */
    showSelectedRockTypeInfo: function()
    {
        let rockType        = this.rockTypeElement.value;
        let rockTypeData    = this.getRockTypeDataByName( rockType );

        // if no rock type data found, then nothing to show
        if( rockTypeData === null )
        {
            this.rockTypeOverviewRenderArea.style.display = 'none';
            this.rockTypeInfoVisible = false;

            return;
        }

        // creat new info entry from template
        let newRockTypeInfoElement = this.rockTypeTemplate.content.cloneNode( true );

        // add rock type data to info element
        let headlineElement         = newRockTypeInfoElement.querySelector( '.headline' );
        let rockTypeImageElement    = newRockTypeInfoElement.querySelector( '.rock-type-image img' );
        let rockTypeContentElement  = newRockTypeInfoElement.querySelector( '.rock-type-content' );

        headlineElement.textContent = rockTypeData.name;
        rockTypeImageElement.src    = this.rockTypeImagePath + rockTypeData.image;

        // add rock type content
        for( let materialName in rockTypeData.content )
        {
            let rockTypeMaterialData        = rockTypeData.content[ materialName ];
            let newRockTypeContentElement   = this.rockTypeContentEntryTemplate.content.cloneNode( true );

            // get basic material data
            let basicMaterialData   = this.materials[ materialName ];
            let materialPricePerSCU = Math.round( basicMaterialData.price.refined * 100 );

            // add material data
            let materialTextElement    = newRockTypeContentElement.querySelector( '.material-text' );
            let barFillElement         = newRockTypeContentElement.querySelector( '.bar .fill' );
            let barMinMaxTextElement   = newRockTypeContentElement.querySelector( '.bar .min-max-text' );

            materialTextElement.textContent = materialName + ': ' + materialPricePerSCU + ' aUEC / SCU';

            let barFillWidth = rockTypeMaterialData.max - rockTypeMaterialData.min;

            barFillElement.style[ 'margin-left' ]   = rockTypeMaterialData.min + '%';
            barFillElement.style[ 'width' ]         = barFillWidth + '%';

            let minMaxTextElementLeftPos = barFillWidth + rockTypeMaterialData.min + 2;

            barMinMaxTextElement.style[ 'left' ]    = minMaxTextElementLeftPos + '%';
            barMinMaxTextElement.textContent        = rockTypeMaterialData.min + ' - ' + rockTypeMaterialData.max + ' %';

            // append material data to rock type content element
            rockTypeContentElement.append( newRockTypeContentElement );
        }

        // clear current content from render area
        this.rockTypeOverviewRenderArea.innerHTML = '';

        // append new info element
        this.rockTypeOverviewRenderArea.append( newRockTypeInfoElement );

        // show render area for overview cards
        this.rockTypeOverviewRenderArea.style.display = '';

        this.rockTypeInfoVisible = true;
    },

    /**
     * Calculate the user inputs and show the values at the calculator.
     */
    calculate: function()
    {
        let rockMass        = this.rockMassElement.value;
        let rockValue       = 0;
        let rockScu         = this.convertKgToScu( rockMass );
        let rockValueScu    = 0;

        // selected materials
        let materialElements = document.querySelectorAll( '#calculator-materials div.material' );

        materialElements.forEach( ( materialElement ) => 
        {
            let material            = materialElement.querySelector( 'select[name="rockContent"]' ).value;
            let materialPercentage  = materialElement.querySelector( 'input[name="rockContentPercentage"]' ).value;

            let materialScuElement      = materialElement.querySelector( 'input[name="rockContentSCU"]' );
            let materialValueElement    = materialElement.querySelector( 'input[name="rockContentValue"]' );

            let materialKg    = rockMass * ( materialPercentage / 100 );
            let materialScu   = this.convertKgToScu( materialKg );
            let materialValue = this.convertScuToUnits( materialScu ) * this.materials[ material ].price.refined;   

            rockValue += materialValue;
            rockValueScu += materialScu;

            materialScuElement.value = this.round( materialScu );
            materialValueElement.value = Math.round( materialValue );
        });

        this.rockScuElement.value       = this.round( rockScu );
        this.rockValueScuElement.value  = this.round( rockValueScu );
        this.rockValueElement.value     = Math.round( rockValue );
    },

    /**
     * Adds a new material to current calculator.
     * @param {string} material
     * @param {boolean} changeable
     */
    addNewMaterial: function( material, changeable )
    {
        // when no selectable materials left, then exit.
        if( this.selectableMaterials.length === 0 )
        {
            return;
        }

        if( material === undefined )
        {
            material = this.selectableMaterials[ this.selectableMaterials.length - 1 ];

            // when material was not found, then exit.
            if( material === undefined )
            {
                return;
            }
        }

        if( changeable === undefined )
        {
            changeable = true;
        }

        let newMaterialElement  = this.materialTemplate.content.cloneNode( true );
        let rockContentSelect   = newMaterialElement.querySelector( 'select[name=rockContent]' );
        let rockContentOptions  = rockContentSelect.querySelectorAll( 'option' );

        rockContentSelect.value = material;

        // when select should not changeable
        // then disable it and show lock icon after material name
        if( changeable === false )
        {
            rockContentSelect.setAttribute( 'disabled', 'disabled' );

            rockContentOptions.forEach( ( option ) =>
            {
                if( option.textContent === material )
                {
                    option.innerHTML = option.textContent + ' &#xf023;';
                }
            });

            // hide delete element with delete button
            newMaterialElement.querySelector( 'div.material-delete-element' ).style.display = 'none';
        }

        this.materialsRenderArea.append( newMaterialElement );
        this.materialsRenderArea.style.display = '';

        this._setSelectableMaterials();
    },

    /**
     * Delete the given material element from current calculator.
     * And recaculate all.
     * @param {Object} materialElement 
     */
    deleteMaterial: function( materialElement )
    {
        materialElement.remove();

        this.calculate();

        this._setSelectableMaterials();
    },

    /**
     * Reset the complete calculator.
     * Removes all materials and reset rock basic values.
     */
    resetCalculator: function()
    {
        this.materialsRenderArea.innerHTML = '';
        this.materialsRenderArea.style.display = 'none';

        this.rockMassElement.value = '';
        this.rockValueElement.value = '';
        this.rockScuElement.value = '';
        this.rockValueScuElement.value = '';
        this.rockTypeElement.value = '';

        this.addNewMaterialElement.style.display = '';

        this._setSelectableMaterials();

        // add first material, default = Inert
        this.addNewMaterial();
    },

    /**
     * Convert kg to SCU.
     * @param {float} kg
     * @returns {float}
     */
    convertKgToScu: function( kg )
    {
        return kg / 50;
    },

    /**
     * Convert SCU to Units.
     * @param {float} scu
     * @returns {float}
     */
     convertScuToUnits: function( scu )
     {
         return scu * 100;
     },

    /**
     * Round float value to 2 point precision.
     * @param {float} value 
     */
    round: function( value )
    {
        return Math.round( value * 100 ) / 100;
    }
};