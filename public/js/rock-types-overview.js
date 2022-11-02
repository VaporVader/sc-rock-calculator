let RockTypesOverview = 
{
    rockTypes                       : null,
    materials                       : null,
    searchInputElement              : null,
    renderAreaElement               : null,
    rockTypeTemplate                : null,
    rockTypeContentEntryTemplate    : null,
    rockTypeImagePath               : null,

    /**
     * Init the rock type overview page with all dependencies.
     * 
     * @param {object} rockTypes 
     * @param {object} materials 
     * @param {string} searchInputElementSelector 
     * @param {string} renderAreaElementSelector 
     * @param {string} rockTypeTemplateSelector 
     * @param {string} rockTypeContentEntryTemplateSelector 
     * @param {string} rockTypeImagePath 
     */
    init: function( 
        rockTypes, 
        materials, 
        searchInputElementSelector, 
        renderAreaElementSelector,
        rockTypeTemplateSelector,
        rockTypeContentEntryTemplateSelector,
        rockTypeImagePath
    )
    {
        this.rockTypes                      = rockTypes;
        this.materials                      = materials;
        this.searchInputElement             = document.querySelector( searchInputElementSelector );
        this.renderAreaElement              = document.querySelector( renderAreaElementSelector );
        this.rockTypeTemplate               = document.querySelector( rockTypeTemplateSelector );
        this.rockTypeContentEntryTemplate   = document.querySelector( rockTypeContentEntryTemplateSelector );
        this.rockTypeImagePath              = rockTypeImagePath

        this.render();
    },

    /**
     * Show all rock types and their info.
     */
    render: function()
    {
        // clear render area
        this.renderAreaElement.innerHTML = '';

        // get rock type groups (ex. Asteroids) with entries
        for( let rockTypeGroupName in this.rockTypes )
        {
            let rockTypeGroup = this.rockTypes[ rockTypeGroupName ];

            for( let rockTypeIndex in rockTypeGroup )
            {
                let rockTypeData = rockTypeGroup[ rockTypeIndex ];

                this._renderRockType( rockTypeData );
            }
        }
    },

    /**
     * Render a given rock type to page.
     * @param {object} rockType 
     */
    _renderRockType: function( rockTypeData )
    {
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

        // append new info element
        this.renderAreaElement.append( newRockTypeInfoElement );
    }
}