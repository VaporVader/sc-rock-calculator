const RockTypeService = 
{
    materials                               : null,
    rockTypeTemplateSelector                : null,
    rockTypeContentEntryTemplateSelector    : null,
    rockTypeImagePath                       : null,

    /**
     * Get a rock type info element.
     * @param {Object} rockTypeData 
     * @param {String} rockTypeTemplateSelector 
     * @param {String} rockTypeContentEntryTemplateSelector 
     * @returns {Object}
     */
    getRockTypeInfoElement: function( rockTypeData )
    {
        let searchStrings = [];

        let rockTypeTemplate = document.querySelector( this.rockTypeTemplateSelector );
        let rockTypeContentEntryTemplate = document.querySelector( this.rockTypeContentEntryTemplateSelector );

        // creat new info entry from template
        let newRockTypeInfoElement = rockTypeTemplate.content.cloneNode( true );

        // add rock type data to info element
        let headlineElement         = newRockTypeInfoElement.querySelector( '.headline-text' );
        let rockTypeImageElement    = newRockTypeInfoElement.querySelector( '.rock-type-image img' );
        let rockTypeContentElement  = newRockTypeInfoElement.querySelector( '.rock-type-content' );

        headlineElement.textContent = rockTypeData.name;
        rockTypeImageElement.src    = this.rockTypeImagePath + rockTypeData.image;

        searchStrings.push( rockTypeData.name );

        // add rock type content, materials
        for( let materialName in rockTypeData.content )
        {
            let rockTypeMaterialData        = rockTypeData.content[ materialName ];
            let newRockTypeContentElement   = rockTypeContentEntryTemplate.content.cloneNode( true );

            // get basic material data
            let basicMaterialData   = this.materials[ materialName ];
            let materialPricePerSCU = Math.round( basicMaterialData.price.refined * 100 );

            // Add material name to searchable strings
            searchStrings.push( materialName );

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

        // add rock type locations
        let rockTypeLocationsElement = newRockTypeInfoElement.querySelector( '.rock-type-locations' );

        if( rockTypeData.locations !== undefined )
        {
            let locationsCount = 0;

            for( let systemName in rockTypeData.locations )
            {
                searchStrings.push( systemName );

                let locations = rockTypeData.locations[ systemName ];

                locations.forEach( ( location ) =>
                {
                    let locationTagElement = document.createElement( 'div' );

                    locationTagElement.classList.add( 'tag' );
                    locationTagElement.classList.add( 'location' );
                    locationTagElement.textContent = location;

                    rockTypeLocationsElement.append( locationTagElement );

                    // Add location name to searchable strings
                    searchStrings.push( location );

                    locationsCount++;
                });
            }

            if( locationsCount > 0 )
            {
                rockTypeLocationsElement.style.display = '';
            }
        }

        // add searchable strings for this rock type as dataset
        // to set dataset search we must get the outer parent as element, not as document fragment
        newRockTypeInfoElement.querySelector( '.headline' ).parentNode.dataset.search = searchStrings.join( ',' );

        return newRockTypeInfoElement;
    }
}