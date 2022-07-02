let RockCalculator = 
{
    materialRenderArea      : null,
    materialTemplate        : null,
    rockMassElement         : null,
    rockValueElement        : null,
    rockScuElement          : null,
    rockValueScuElement     : null,
    rockTypeElement         : null,
    addNewMaterialElement   : null,

    materials: null,
    rockTypes: null,

    /**
     * Init function to set start values for Calculator.
     */
    init: function( materials, rockTypes )
    {
        this.materialsRenderArea    = document.querySelector( '#calculator-materials' );
        this.materialTemplate       = document.querySelector( '#rockContentTemplate' );
        this.rockMassElement        = document.querySelector( '#rockMass' );
        this.rockValueElement       = document.querySelector( '#rockValue' );
        this.rockScuElement         = document.querySelector( '#rockSCU' );
        this.rockValueScuElement    = document.querySelector( '#rockValueSCU' );
        this.rockTypeElement        = document.querySelector( '#rockType' );
        this.addNewMaterialElement  = document.querySelector( '#calculator-add-material' );

        this.materials = materials;
        this.rockTypes = rockTypes;

        this._initRockTypeSelectionList();
        this._initMaterialSelectionList();
        this._initInputChangeHandler();

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
            }
        });

        document.addEventListener( 'keyup', ( event ) =>
        {
            if( event.target.matches( 'input, select' ) )
            {
                calculatorInstance.calculate();
            }
        });
    },

    /**
     * Get current selected rock type an load preset.
     */
    loadRockTypePreset: function()
    {
        let rockType        = this.rockTypeElement.value;
        let rockTypeData    = this.getRockTypeDataByName( rockType );

        this.materialsRenderArea.innerHTML = '';

        // no rock type data found, then dont try to load a preset.
        if( rockTypeData === null )
        {
            this.addNewMaterialElement.style.display = '';

            return;
        }

        this.addNewMaterialElement.style.display = 'none';

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
        if( material === undefined )
        {
            material = 'Inert';
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