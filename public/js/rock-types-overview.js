let RockTypesOverview = 
{
    RockTypeService                 : null,
    rockTypes                       : null,
    searchInputElement              : null,
    renderAreaElement               : null,

    /**
     * Init the rock type overview page with all dependencies.
     * 
     * @param {object} rockTypes 
     * @param {object} RockTypeService 
     * @param {string} searchInputElementSelector 
     * @param {string} renderAreaElementSelector
     */
    init: function( rockTypes, RockTypeService )
    {
        this.rockTypes          = rockTypes;
        this.RockTypeService    = RockTypeService;
        this.searchInputElement = document.querySelector( '#rock-types-search-input' );
        this.renderAreaElement  = document.querySelector( '#rock-types-container' );

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
     * @param {object} rockTypeData 
     */
    _renderRockType: function( rockTypeData )
    {
        // get rock type info card
        let newRockTypeInfoElement = this.RockTypeService.getRockTypeInfoElement( rockTypeData );

        // append new info element
        this.renderAreaElement.append( newRockTypeInfoElement );
    }
}