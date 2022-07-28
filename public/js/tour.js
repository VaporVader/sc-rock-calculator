let Tour = 
{
    isRunning: false,

    // Document body element.
    bodyElement: null,

    // when no element to attach the step, then insert step here.
    defaultInsertElement: null,

    // Array with tour step entries.
    steps: [],

    // Step at current tour instance.
    currentStep: 0,
    previousStep: -1,

    // Current used overlay instance.
    overlayElement: null,

    /**
     * Init function to set start values for the Tour instance.
     * @param {String} defaultInsertSelector
     */
    init: function( defaultInsertSelector )
    {
        this.bodyElement            = document.querySelector( 'body' );
        this.defaultInsertElement   = document.querySelector( defaultInsertSelector );

        // reset step values
        this.steps          = [];
        this.currentStep    = 0;
        this.previousStep   = -1;
    },

    /**
     * Add a new step to the tour.
     * @param {Object} step
     */
    addStep: function( step )
    {
        this.steps.push( step );
    },

    /**
     * Start the current tour.
     */
    start: function()
    {
        // no tour steps available, exit here.
        if( this.steps.length === 0 )
        {
            return;
        }

        this.isRunning = true;

        this.currentStep    = 0;
        this.previousStep   = -1;

        this._createOverlay();
        this.next();
    },

    /**
     * End current tour and hide all opened tour step entries.
     */
    end: function()
    {
        this._resetAllStepContainers();
        this._destroyOverlay();

        this.isRunning = false;

        this.onEnd();
    },

    /**
     * Show next tour step and hide other steps.
     */
    next: function()
    {
        this.previousStep = this.currentStep;

        this.currentStep++;

        this._resetAllStepContainers();

        this._showStep( this.currentStep );
    },

    /**
     * Show previous tour step and hide other steps.
     */
    back: function()
    {
        this.previousStep = this.currentStep;

        this.currentStep--;
 
        this._resetAllStepContainers();
 
        this._showStep( this.currentStep );
    },

    onEnd: function()
    {
        // Do things after tour end.
    },

    /**
     * Remove all created step containers and reset highlighted elements.
     */
    _resetAllStepContainers: function()
    {
        let allStepContainers = document.querySelectorAll( '.tour-step-container' );
        
        allStepContainers.forEach( ( stepContainer ) =>
        {
            stepContainer.remove();
        });

        let highlightedElements = document.querySelectorAll( '.tour-highlighted' );

        highlightedElements.forEach( ( highlightedElement ) =>
        {
            highlightedElement.classList.remove( 'tour-highlighted' );
        });
    },

    /**
     * Show a specific given step.
     * @param {Object} step
     * @private
     */
    _showStep: function( stepNumber )
    {
        let step = this.steps[ stepNumber - 1 ]; // array index is 0 based

        // when this step entry is not available, then end the tour.
        if( step === undefined || step === null )
        {
            this.end();

            return;
        }

        // add step text box with description
        this._createStepContainer( step );
    },

    /**
     * Create and show and new step container with description and buttons.
     * @param {Object} step 
     * @private
     */
     _createStepContainer: function( step )
    {
        let elementToHighlight          = document.querySelector( step.elementSelector );
        let parentPosition              = null;
        let elementToHighlightPosition  = null;
        let containerTopPosition        = null;
        let arrowLeftPosition           = null;

        // when we find the element to highlight
        if( elementToHighlight !== undefined && elementToHighlight !== null )
        {
            // when element to highlight is not visible, then skip this step.
            if( elementToHighlight.style.display === 'none' )
            {
                // check the direction to skip
                if( this.previousStep < this.currentStep )
                {
                    this.next();
                }
                else
                {
                    this.back();
                }

                return;
            }

            elementToHighlight.classList.add( 'tour-highlighted' );

            // get parent position
            parentPosition = elementToHighlight.parentNode.getBoundingClientRect();

            // get position and size data for element to add a description.
            elementToHighlightPosition = elementToHighlight.getBoundingClientRect();

            // calculate position for container
            containerTopPosition = parseInt( elementToHighlightPosition[ 'y' ] ) + parseInt( window.scrollY ) + parseInt( elementToHighlightPosition[ 'height' ] );
            
            // calculate position for arrow of container
            arrowLeftPosition = parseInt( elementToHighlightPosition[ 'x' ] ) - parseInt( parentPosition[ 'x' ] );
        }

        // create new container
        let containerElement = document.createElement( 'div' );

        containerElement.setAttribute( 'id', 'tour-step-' + this.currentStep );
        containerElement.setAttribute( 'class', 'tour-step-container' );

        // set position for container
        // when set, otherwise the default css value is used.
        if( containerTopPosition !== null )
        {
            containerElement.style[ 'top' ] = containerTopPosition + 'px';
        }

        // create arrow for container.
        // only when we get an arrow position.
        if( arrowLeftPosition !== null )
        {
            let arrowElement = this._createArrowElement( arrowLeftPosition );

            // add arrow to container
            containerElement.append( arrowElement );
        }

        // create headline element
        let headlineElement = this._createHeadlineElement( step );

        // add headline to container
        containerElement.append( headlineElement );

        // create description element
        let descriptionElement = this._createDescriptionElement( step );

        // add description to container
        containerElement.append( descriptionElement );

        // create buttons
        let buttons = this._createStepButtons();

        // add buttons to container
        containerElement.append( buttons );

        // add container element after element to highlight.
        // when element to highlight is not available, then append to default container.
        if( elementToHighlight !== undefined && elementToHighlight !== null )
        {
            elementToHighlight.parentNode.insertBefore( containerElement, elementToHighlight.nextSibling );
        }
        else
        {
            this.defaultInsertElement.append( containerElement );
        }

        containerElement.scrollIntoView({
            block: 'end'
        });
    },

    /**
     * Create and return the arrow element
     * @param {Integer} arrowLeftPosition 
     * @returns {Object}
     * @private
     */
    _createArrowElement: function( arrowLeftPosition )
    {
        // min left position is 10
        if( arrowLeftPosition < 10 )
        {
            arrowLeftPosition = 10;
        }

        // create arrow for container
        let arrowElement = document.createElement( 'div' );

        arrowElement.setAttribute( 'class', 'tour-step-arrow' );

        arrowElement.style[ 'left' ] = arrowLeftPosition + 'px';

        return arrowElement;
    },

    /**
     * Create and return the headline element
     * @param {Object} step
     * @returns {Object}
     * @private
     */
    _createHeadlineElement: function( step )
    {
        let headlineElement = document.createElement( 'div' );

        headlineElement.setAttribute( 'class', 'tour-step-headline' );

        // headline text
        let headlineTextElement = document.createElement( 'div' );

        headlineTextElement.setAttribute( 'class', 'tour-step-headline-text' );
        headlineTextElement.textContent = step.headline;

        headlineElement.append( headlineTextElement );

        // close button
        let headlineCloseElement = document.createElement( 'div' );

        headlineCloseElement.setAttribute( 'class', 'tour-step-headline-close' );
        headlineCloseElement.setAttribute( 'onclick', 'Tour.end();' );

        let closeIcon = document.createElement( 'i' );

        closeIcon.setAttribute( 'class', 'fa fa-times-circle' );
        closeIcon.setAttribute( 'aria-hidden', 'true' );

        headlineCloseElement.append( closeIcon );

        headlineElement.append( headlineCloseElement );

        return headlineElement;
    },

    /**
     * Create and return the description element
     * @param {Object} step
     * @returns {Object}
     * @private
     */
    _createDescriptionElement: function( step )
    {
        let descriptionElement = document.createElement( 'div' );

        descriptionElement.setAttribute( 'class', 'tour-step-description' );
        descriptionElement.innerHTML = step.description;
        
        return descriptionElement;
    },

    /**
     * Create and return the buttons for step element
     * @returns {Object}
     * @private
     */
    _createStepButtons: function()
    {
        // create container for buttons
        let buttonContainer = document.createElement( 'div' );

        buttonContainer.setAttribute( 'class', 'tour-step-buttons' );

        // create back button
        // only when this is not the first step
        if( this.currentStep > 1 )
        {
            let backButtonElement = document.createElement( 'div' );

            backButtonElement.setAttribute( 'class', 'tour-step-button back' );
            backButtonElement.setAttribute( 'onclick', 'Tour.back();' );
            backButtonElement.textContent = 'Back';

            // add previous button to container
            buttonContainer.append( backButtonElement );
        }

        // create next button.
        // only when this not the last step.
        if( this.currentStep !== this.steps.length )
        {
            let nextButtonElement = document.createElement( 'div' );

            nextButtonElement.setAttribute( 'class', 'tour-step-button next' );
            nextButtonElement.setAttribute( 'onclick', 'Tour.next();' );
            nextButtonElement.textContent = 'Next';

            // add next button to container
            buttonContainer.append( nextButtonElement );
        }

        // create end button.
        // only when this is the last step.
        if( this.currentStep === this.steps.length )
        {
            let endButtonElement = document.createElement( 'div' );

            endButtonElement.setAttribute( 'class', 'tour-step-button end' );
            endButtonElement.setAttribute( 'onclick', 'Tour.end();' );
            endButtonElement.textContent = 'Finish';

            // add end button to container
            buttonContainer.append( endButtonElement );
        }

        return buttonContainer;
    },

    /**
     * Create and show an overlay over the complete body.
     * @private
     */
    _createOverlay: function()
    {
        // create a new overlay element.
        let newOverlayElement = document.createElement( 'div' );

        newOverlayElement.setAttribute( 'id', 'tour-overlay' );

        this.bodyElement.append( newOverlayElement );

        this.overlayElement = newOverlayElement;
    },

    /**
     * Hide and destory the current tour overlay.
     * @private
     */
    _destroyOverlay: function()
    {
        if( this.overlayElement === null )
        {
            return;
        }

        this.overlayElement.remove();

        this.overlayElement = null;
    }
};