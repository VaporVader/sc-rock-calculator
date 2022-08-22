class Popup 
{
    parentElement = null;

    /**
     * Current popup element.
     */
    element = null;

    id          = null;
    title       = null; 
    text        = null; 
    buttons     = []; 
    closeable   = false;

    /**
     * @param {String} id
     */
    constructor( id ) 
    {
        this.id             = id;
        this.parentElement  = document.querySelector( 'body' );
    }

    /**
     * Append and show the current popup element.
     */
    show() 
    {
        this.element = this._create( this.id, this.title, this.text, this.buttons );

        popupOpen = true;

        this.parentElement.append( this.element );
    }
    /**
     * Append and show the current popup element.
     */
    close() 
    {
        if ( this.element === null )
        {
            return;
        }

        this.element.remove();

        popupOpen = false;
    }

    /**
     * Create the container element with overlay and popup.
     * @param {String} id
     * @param {String} title
     * @param {String} text
     * @param {Array} buttons
     * @returns
     * @private
     */
    _create( id, title, text, buttons ) 
    {
        let containerElement        = this._createContainerElement( id) ;
        let popupElement            = this._createPopupElement();
        let headlineElement         = this._createHeadlineElement( title );
        let contentElement          = this._createContentElement( text );
        let buttonContainerElement  = this._createButtonsContainer( buttons );

        popupElement.append( headlineElement );
        popupElement.append( contentElement );
        popupElement.append( buttonContainerElement );

        containerElement.append( popupElement );

        return containerElement;
    }

    /**
     * Create and return the container element.
     * @param {String} id
     * @returns {Object}
     * @private
     */
    _createContainerElement( id )
    {
        let containerElement = document.createElement( 'div' );

        containerElement.setAttribute( 'id', id );
        containerElement.setAttribute( 'class', 'popup-container' );

        return containerElement;
    }
    /**
     * Create and return the popup element.
     * @returns {Object}
     * @private
     */
    _createPopupElement() 
    {
        // create new popup element.
        let popupElement = document.createElement( 'div' );

        popupElement.setAttribute( 'class', 'popup-element' );

        return popupElement;
    }

    /**
     * Create and return the headline element.
     * @param {String} title
     * @returns {Object}
     * @private
     */
    _createHeadlineElement( title ) {
        let headlineElement = document.createElement( 'div' );

        headlineElement.setAttribute( 'class', 'popup-headline' );

        // headline text
        let headlineTextElement = document.createElement( 'div' );

        headlineTextElement.setAttribute( 'class', 'popup-headline-text' );
        headlineTextElement.textContent = title;

        headlineElement.append( headlineTextElement );

        // close button
        if ( this.closeable ) 
        {
            let headlineCloseElement = document.createElement( 'div' );

            headlineCloseElement.setAttribute( 'class', 'popup-headline-close' );

            let closeIcon = document.createElement('i');

            closeIcon.setAttribute( 'class', 'fa fa-times-circle' );
            closeIcon.setAttribute( 'aria-hidden', 'true' );

            headlineCloseElement.append( closeIcon );

            headlineElement.append( headlineCloseElement );

            let self = this;

            headlineCloseElement.addEventListener( 'click', function()
            {
                self.close();
            });
        }

        return headlineElement;
    }

    /**
     * Create and return the content element.
     * @param {String} text
     * @returns {Object}
     * @private
     */
    _createContentElement( text ) 
    {
        let contentElement = document.createElement( 'div' );

        contentElement.setAttribute( 'class', 'popup-content' );
        contentElement.innerHTML = text;

        return contentElement;
    }

    /**
     * Create and return the buttons container element with the given buttons.
     * @param {Array} buttons 
     * @returns 
     */
    _createButtonsContainer( buttons )
    {
        if( buttons.length === 0 )
        {
            return;
        }

        let buttonsContainerElement = document.createElement( 'div' );

        buttonsContainerElement.setAttribute( 'class', 'popup-buttons' );

        buttons.forEach( button =>
        {
            let buttonElement = document.createElement( 'div' );

            buttonElement.setAttribute( 'class', 'popup-button' );
            buttonElement.textContent = button.buttonText;

            if( button.alignment !== undefined && button.alignment !== null  )
            {
                switch( button.alignment )
                {
                    case 'left':
                        buttonElement.classList.add( 'left' );

                        break;

                    case 'right':
                        buttonElement.classList.add( 'right' );

                        break;    
                }
            }

            buttonsContainerElement.append( buttonElement );

            buttonElement.addEventListener( 'click', function()
            {
                button.callback();
            });
        });

        return buttonsContainerElement;
    }
}