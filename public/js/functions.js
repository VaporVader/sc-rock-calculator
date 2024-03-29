/**
 * Check if user has already force reloaded the new version.
 */
function checkNewVersion()
{
    fetch( '/data/app.json', {
        cache: "no-store"
    })
    .then( ( response ) =>
    {
        return response.json();
    })
    .then( ( appData ) =>
    {
        if( window.localStorage.getItem( 'appVersion' ) === appData.version )
        {
            return;
        }

        // show new version available popup after 1 second.
        window.setTimeout( function()
        {
            let versionPopup = new Popup( 'popup-new-version-available' );

            versionPopup.closeable      = false;
            versionPopup.title          = 'New version available';
            versionPopup.text           = 'We got an update for you.<br />To make sure everything works smoothly, we need to reload everything once.<br /><br />Just press "Update" and it will start right away.<br /><br />When you want to check what\'s changed, then take a look at the "Changelog".';
            versionPopup.buttons        = [
                {
                    buttonText: 'Update',
                    alignment: 'right',
                    callback: function() 
                    {
                        window.localStorage.setItem( 'appVersion', appData.version )
                        versionPopup.close();
                        window.location.reload();
                    }
                }
            ];

            versionPopup.show();
        }, 1000 );
    });
}

/**
 * Show / hide the navigation sidebar.
 */
function toggleSidebar()
{
    let sidebarElement              = document.querySelector( '#side-navigation' );
    let topLeftButtons              = document.querySelector( '#top-left-buttons' );
    let body                        = document.querySelector( 'body' );
    let navigationOverlayElement    = null;

    sidebarElement.classList.toggle( 'open' );
    topLeftButtons.classList.toggle( 'sidebar-open' );
    body.classList.toggle( 'mobile-no-scroll' );

    // create navigation overlay when sidebar open
    if( sidebarElement.classList.contains( 'open' ) )
    {
        navigationOverlayElement = document.createElement( 'div' );

        navigationOverlayElement.setAttribute( 'id', 'navigation-overlay' );
        navigationOverlayElement.setAttribute( 'onclick', 'toggleSidebar();' );
        
        body.append( navigationOverlayElement );

        // timeout the mobile visible class so that transition can start.
        window.setTimeout( function()
        {
            navigationOverlayElement.classList.add( 'mobile-visible' );
        }, 1 );
    }
    // remove navigation overlay
    else
    {
        navigationOverlayElement = document.querySelector( '#navigation-overlay' );
        navigationOverlayElement.classList.remove( 'mobile-visible' );

        // timeout the remove function so that the transition can happen.
        window.setTimeout( function()
        {
            navigationOverlayElement.remove();
        }, 400 );
    }
}

/**
 * Loads a page over the Navigation object.
 * @param {String} page 
 */
 function loadPage( page, isPopped )
 {
    // close sidebar, when navigation overlay is visible (fixed).
    let navigationOverlayElement = document.querySelector( '#navigation-overlay' );
    
    if( 
        navigationOverlayElement !== undefined 
        && navigationOverlayElement !== null 
        && window.getComputedStyle( navigationOverlayElement ).position === 'fixed' 
    )
    {
        toggleSidebar();
    }

    Loader.show();

    if( page === undefined )
    {
        page = null;
    }
 
    Navigation.loadPage( page, isPopped ).then( ( loadedPage ) =>
    {
        let helpButtonElement = document.querySelector( '#top-help-button' );

        switch( loadedPage.identifier )
        {
            // rock calculator was loaded, then init the rock calculator.
            case 'rock-calculator':
                // load rock types and materials
                Promise.all([
                    fetch( '/data/rock-types.json' ),
                    fetch( '/data/materials.json' )
                // parse response    
                ]).then( ( responses ) =>
                {
                    // get JSON object from every fetch request
                    return Promise.all( responses.map( ( response ) =>
                    {
                        return response.json();
                    }));
                // handle parsed response, init rock calculator  
                }).then( ( data ) =>
                {
                    let rockTypes = data[ 0 ];
                    let materials = data[ 1 ];

                    RockTypeService.materials = materials;
                    RockTypeService.rockTypeTemplateSelector = '#rockTypeTemplate';
                    RockTypeService.rockTypeContentEntryTemplateSelector = '#rockTypeContentEntryTemplate';
                    RockTypeService.rockTypeImagePath = '/images/rock-types/';

                    RockCalculator.init( materials, rockTypes, RockTypeService );

                    // start tour after 3 second.
                    // but only when user has not seen it once.
                    if( parseInt( window.localStorage.getItem( 'tourVisited' ) ) !== 1 )
                    {
                        window.setTimeout( function()
                        {
                            initTour();
                        }, 3000 );
                    }
                });

                // show and set help link to Tour
                helpButtonElement.setAttribute( 'onclick', 'initTour();' );
                helpButtonElement.style.display = '';

                break;
            
            // rock types page was loaded, then request rock types and show them.   
            case 'rock-types':
                // load rock types and materials
                Promise.all([
                    fetch( '/data/rock-types.json' ),
                    fetch( '/data/materials.json' )
                // parse response    
                ]).then( ( responses ) =>
                {
                    // get JSON object from every fetch request
                    return Promise.all( responses.map( ( response ) =>
                    {
                        return response.json();
                    }));
                // handle parsed response, init rock types overview  
                }).then( ( data ) =>
                {
                    let rockTypes = data[ 0 ];
                    let materials = data[ 1 ];

                    RockTypeService.materials = materials;
                    RockTypeService.rockTypeTemplateSelector = '#rock-type-template';
                    RockTypeService.rockTypeContentEntryTemplateSelector = '#rock-type-content-entry-template';
                    RockTypeService.rockTypeImagePath = '/images/rock-types/';

                    RockTypesOverview.init( rockTypes, RockTypeService );
                });
                
                // hide help link
                helpButtonElement.style.display = 'none';

                break;

            // not specific requests    
            default:
                // hide help link
                helpButtonElement.style.display = 'none';
        }
 
        // hide loader
        // Use timeout to reduce flickering, so that loader has a chance to be shown.
        window.setTimeout( function()
        {
            Loader.hide();
        }, 1000 );
    });
 }
 
 /**
  * Show app install container.
  */
 function showAppInstall()
 {
    appInstallButton.style.display = '';
 }
 
 /**
  * Hide app install container.
  */
  function hideAppInstall()
  {
    appInstallButton.style.display = 'none';
  }
 
 /**
  * Calculate the user inputs and show the values at the calculator.
  */
 function calculate()
 {
    RockCalculator.calculate();
 }
 
 /**
  * Adds a new material to current RockCalculatorInstance.
  * @params {String} material
  */
 function addNewMaterial( material )
 {
    // exit when tour is running
    if( Tour.isRunning )
    {
        return;
    }

    RockCalculator.addNewMaterial( material, true, true );
 }
 
 /**
  * Adds a new material to current RockCalculatorInstance.
  */
 function resetCalculator()
 {
   RockCalculator.resetCalculator();
 }
 
 /**
  * Get current selected rock type an load preset.
  */
 function loadRockTypePreset()
 {
    RockCalculator.loadRockTypePreset();
 }
 
 /**
  * Delete material to that this delete button belongs.
  * @param {Object} deleteButtonElement 
  */
 function deleteMaterial( deleteButtonElement )
 {
    // exit when tour is running
    if( Tour.isRunning )
    {
        return;
    }

    let materialElement = deleteButtonElement.closest( 'div.material' );

    RockCalculator.deleteMaterial( materialElement );
 }
 
 /**
  * Show the info card for current selected rock type.
  */
 function showSelectedRockTypeInfo()
 {
    RockCalculator.showSelectedRockTypeInfo();

    // when tour is running then go to next step.
    if( Tour.isRunning )
    {
        Tour.next();
    }
 }
 
 /**
  * Close the info card for current selected rock type.
  */
 function closeRockTypeInfo()
 {
    RockCalculator.closeRockTypeInfo();

    // when tour is running then go to next step.
    if( Tour.isRunning )
    {
        Tour.next();
    }
 }
 
 /**
  * Create the tour for the Calculator.
  */
 function initTour()
 {
    if( popupOpen )
    {
        return;
    }

    // cancel previous tour
    Tour.end();

    // set tour as visited at local storage, so that the user only see this once automatically.
    window.localStorage.setItem( 'tourVisited', 1 );

    // reset calculator
    resetCalculator();

    Tour.init( '#calculator' );

    Tour.addStep({
        elementSelector : null,
        headline        : 'Welcome Citizen',
        description     : "Welcome to the Star Citizen Rock Mining Calcualator.<br />This calculator should help you to find worthy rocks to mine.<br /><br />If you want, I'll show you how it works. Just click on \"Next\" and the tutorial starts right away. If not, just close this window.<br /><br />You can always start this tutorial again later via the help button at the top right corner."
    });

    Tour.addStep({
        elementSelector : '#calculator-rock-type .grid-element:nth-of-type(1n)',
        headline        : 'Select rock type',
        description     : 'First select the type of rock you want to calculate. Then the calculator loads the corresponding materials.<br /><br />If you select "Unknown rock type", you can specify the material composition of the rock yourself.'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock-type .grid-element:nth-of-type(2n)',
        headline        : 'View rock type informations',
        description     : 'When you have selected a rock type, then you can look at the typically rock composition and other useful informations.<br /><br />This function does not work if you have selected "Unknown rock type".'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock-type-overview',
        headline        : 'Rock type information',
        description     : 'Here you can view the currently available information on the rock type, such as the material composition or an example image of the rock type.<br /><br />The known locations for each rock type are sorted by probability.'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock .grid-element:nth-of-type(1n)',
        headline        : 'Enter rock mass',
        description     : 'Now enter the rock mass in kilograms, so that the calculator can use this for further calculations.'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock .grid-element:nth-of-type(2n)',
        headline        : 'Rock SCU',
        description     : 'After entering a rock mass, the mass of the complete rock is displayed in SCU in this field.'
    });

    Tour.addStep({
        elementSelector : '.material .grid-element:nth-of-type(1n)',
        headline        : 'Select material',
        description     : 'When you selected a known rock type, then the pre-selection of the materials are not changeable.'
    });

    Tour.addStep({
        elementSelector : '.material .grid-element:nth-of-type(2n)',
        headline        : 'Set material percentage',
        description     : 'In order to get the values of the selected material, you need to enter the percentage of material for your rock.'
    });

    Tour.addStep({
        elementSelector : '.material .grid-element:nth-of-type(3n)',
        headline        : 'Material value',
        description     : 'After entering a material percentage and rock mass, the calculator will display the value for the selected material in this field.<br /><br />Currently this value is always based on the refined price.'
    });

    Tour.addStep({
        elementSelector : '.material .grid-element:nth-of-type(4n)',
        headline        : 'Material SCU',
        description     : 'This field displays the amount of material in SCU at the percentage previously entered.'
    });

    Tour.addStep({
        elementSelector : '#calculator-add-material',
        headline        : 'Add more materials',
        description     : 'When your rock type selection is "Unknow rock type", then you can add more materials to calculate.<br /><br />For the tutorial this function is disabled.'
    });

    Tour.addStep({
        elementSelector : '.material-delete-element',
        headline        : 'Delete a material',
        description     : 'Sometimes you want to completely delete a material entry. Then you can use this button to remove the material from the calculator.<br /><br />For the tutorial this function is disabled.'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock .grid-element:nth-of-type(3n)',
        headline        : 'Rock value',
        description     : 'The total value of the rock is displayed at this field. This value is based on all entered materials except "Inert" material.'
    });

    Tour.addStep({
        elementSelector : '#calculator-rock .grid-element:nth-of-type(4n)',
        headline        : 'Total material SCU',
        description     : 'The total SCU value of all entered materials except "Inert" material.'
    });

    Tour.addStep({
        elementSelector : '#calculator-calculate .grid-element:nth-of-type(1n)',
        headline        : 'Force recalculate',
        description     : 'All calculations are processed automatically after you entered or change something. But when you think that something went wrong, then you can force a recalculation over this button.'
    });

    Tour.addStep({
        elementSelector : '#calculator-calculate .grid-element:nth-of-type(2n)',
        headline        : 'Start a new rock input',
        description     : "If you want to enter a new rock, then you don't have to manually reset everything. With this button you reset the complete calculator mask."
    });

    Tour.start();
 }