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
        let rockTypeTemplate = document.querySelector( this.rockTypeTemplateSelector );
        let rockTypeContentEntryTemplate = document.querySelector( this.rockTypeContentEntryTemplateSelector );

        // creat new info entry from template
        let newRockTypeInfoElement = rockTypeTemplate.content.cloneNode( true );

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
            let newRockTypeContentElement   = rockTypeContentEntryTemplate.content.cloneNode( true );

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

        return newRockTypeInfoElement;
    }
}