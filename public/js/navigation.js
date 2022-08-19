let Navigation = {
    /**
     * The element where to render the loaded page.
     */
    targetRenderElement: null,

    /**
     * Current selected page.
     */
    page: null,

    /**
     * Default page that should displayed.
     */
    defaultPage: '',

    /**
     * Define directory where to find the page templates.
     */
    pageDirectory: 'pages',

    /**
     * Define which pages can be load.
     */
    pages: {
        '' : {
            identifier  : 'rock-calculator',
            target      : 'rock-calculator/index.html'
        },
        'rock-types': {
            identifier  : 'rock-types',
            target      : 'rock-types/index.html'
        },
        'legal-info': {
            identifier  : 'legal-info',
            target      : 'legal-info/index.html'
        },
        'privacy-policy': {
            identifier  : 'privacy-policy',
            target      : 'privacy-policy/index.html'
        }
    },

    /**
     * Init the Navigation.
     * @param {String} targetRenderSelector 
     */
    init: function( targetRenderSelector )
    {
        this.targetRenderElement = document.querySelector( targetRenderSelector );
    },

    /**
     * Load a page, when no page is defined, the read from current url which page to load.
     * @param {String} page 
     * @returns {Promise}
     */
    loadPage: function( page, isPopped )
    {
        // remove current content from render area
        this.targetRenderElement.innerHTML = '';

        if( page === undefined || page === null )
        {
            page = this._currentPath();
        }

        if( isPopped === undefined || isPopped === null )
        {
            isPopped = false;
        }

        // when page is not allowed, set default page and reset current url.
        if( this.pages[ page ] === undefined )
        {
            page = this.defaultPage;

            window.history.replaceState({
                'page': page
            }, '', '/' );
        }

        // set histroy state when page has changed
        if( page !== this.page && isPopped === false )
        {
            window.history.pushState({
                'page': page
            }, '', '/' + page);
        }

        this.page = page;

        // set navigation entry as active
        this._setActiveNavigationEntry();

        // end current Tour
        if( Tour !== undefined && Tour !== null )
        {
            Tour.end();
        }

        // now load content and return a promise for outside usage.
        // Promise returns the page string the was loaded.
        return new Promise( ( resolve, reject ) =>
        {
            let fetchUrl = '/' + this.pageDirectory + '/' + this.pages[ this.page ].target;

            fetch( fetchUrl ).then( ( response ) =>
            {
                return response.text();
            })
            .then( ( html ) =>
            {
                this.targetRenderElement.innerHTML = html;

                resolve( this.pages[ this.page ] );
            })
            .catch( ( error ) =>
            {
                reject( error );
            });
        });
    },

    /**
     * Set navigation entry as active, corresponding to current path.
     * @private
     */
    _setActiveNavigationEntry: function()
    {
        let path                        = document.location.pathname;
        let sideNavigationLinkEntries   = document.querySelectorAll( '#side-navigation .navigation-entry a' );
        
        sideNavigationLinkEntries.forEach( ( link ) =>
        {
            link.classList.remove( 'active' );

            if( link.getAttribute( 'href' ) === path )
            {
                link.classList.add( 'active' );
            }
        });
    },

    /**
     * Read current path from url.
     * @private
     */
    _currentPath: function()
    {
        let path = document.location.pathname;

        // remove first "/"
        path = path.substring( 1 );

        // when last char is also "/", then remove it
        if( path.slice( -1 ) === '/' )
        {
            path = path.substring( 0, path.length - 1 );
        }

        return path;
    }
};