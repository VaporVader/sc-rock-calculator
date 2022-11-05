let RockTypesOverview = 
{
    RockTypeService                 : null,
    rockTypes                       : null,
    searchInputElement              : null,
    strictSearchCheckElement        : null,
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
        this.rockTypes                  = rockTypes;
        this.RockTypeService            = RockTypeService;
        this.searchInputElement         = document.querySelector( '#rock-types-search-input' );
        this.strictSearchCheckElement   = document.querySelector( '#rock-types-strict-search' );
        this.renderAreaElement          = document.querySelector( '#rock-types-container' );

        this.render();
        this._initSearchHandler();
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
     * Search rock type by given search values and hide not matching rock types.
     * @param {array} searchValues 
     * @param {string} searchOperator AND / OR 
     */
    search: function( searchValues, searchOperator )
    {
        searchValues = this._clearSearchValues( searchValues );

        let rockTypeEntries = document.querySelectorAll( '.rock-type-entry' );
        let nothingFoundElement = document.querySelector( '#nothing-found' );
        let foundRockTypes = 0;

        rockTypeEntries.forEach( ( rockTypeEntry ) =>
        {
            let rockTypeSearchString = rockTypeEntry.dataset.search.toLowerCase();
            let searchResult = true;

            switch( searchOperator )
            {
                // every search value must match
                case 'AND':
                    if( searchValues.length > 0 )
                    {
                        searchResult = searchValues.every( ( searchValue ) =>
                        {
                            return rockTypeSearchString.includes( searchValue.toLowerCase() );
                        });
                    }

                    break;

                // one search value must match    
                case 'OR':
                    if( searchValues.length > 0 )
                    {
                        searchResult = searchValues.some( ( searchValue ) =>
                        {
                            return rockTypeSearchString.includes( searchValue.toLowerCase() );
                        });
                    }

                    break;    
            }

            if( searchResult )
            {
                rockTypeEntry.style.display = '';

                foundRockTypes++;
            }
            else
            {
                rockTypeEntry.style.display = 'none';
            }
        });

        if( foundRockTypes === 0 )
        {
            nothingFoundElement.style.display = '';
        }
        else
        {
            nothingFoundElement.style.display = 'none';
        }
    },

    /**
     * Remove empty search values.
     * @param {array} searchValues 
     * @returns array
     */
    _clearSearchValues: function( searchValues )
    {
        let clearedSearchValues = [];

        searchValues.forEach( ( searchValue ) =>
        {
            // ignore empty search phrases
            if( searchValue === '' )
            {
                return;
            }

            clearedSearchValues.push( searchValue );
        });

        return clearedSearchValues;
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
    },

    /**
     * Init the search handler for search input.
     */
    _initSearchHandler: function()
    {
        let self = this;

        // when user changed search input field
        [ 'keyup', 'change' ].forEach( ( event ) => 
        {
            this.searchInputElement.addEventListener( event, function()
            {
                self._fireSearchEvent();
            }, false);
        });

        // when user changed strict search mode
        this.strictSearchCheckElement.addEventListener( 'change', function()
        {
            self._fireSearchEvent();
        }, false );
    },

    /**
     * Read search input and search mode and fire search processing.
     */
    _fireSearchEvent()
    {
        let self = this;
        let timedSearchEvent = null;
        let searchValue = this.searchInputElement.value;
        let searchOperator = ( this.strictSearchCheckElement.checked ) ? 'AND' : 'OR';

        // split search input to multiple strings by comma
        let searchValues = searchValue.split( ',' );

        // remove whitespaces at start and end from searchValues
        searchValues = searchValues.map( ( searchValue ) =>
        {
            return searchValue.trim();
        });

        if( timedSearchEvent !== null )
        {
            clearTimeout( timedSearchEvent );
        }

        timedSearchEvent = window.setTimeout( function()
        {
            self.search( searchValues, searchOperator );
        }, 250 );
    }
}