/**
 * Show / hide the navigation sidebar.
 */
function toggleSidebar()
{
    let sidebarElement      = document.querySelector( '#side-navigation' );
    let sidebarToggleButton = document.querySelector( '#top-sidebar-button' );
    let navigationOverlay   = document.querySelector( '#navigation-overlay' );
    let body                = document.querySelector( 'body' );

    sidebarElement.classList.toggle( 'open' );
    sidebarToggleButton.classList.toggle( 'sidebar-open' );
    navigationOverlay.classList.toggle( 'mobile-visible' );
    body.classList.toggle( 'mobile-no-scroll' );
}

/**
 * Loads a page over the Navigation object.
 * @param {String} page 
 */
 function loadPage( page, isPopped )
 {
     Loader.show();
 
     if( page === undefined )
     {
         page = null;
     }
 
     Navigation.loadPage( page, isPopped ).then( ( loadedPage ) =>
     {
         // when rock calculator was loaded, then init the rock calculator.
         if( loadedPage.identifier === 'rock-calculator' )
         {
             RockCalculator.init( materials, rockTypes );
 
             // start tour after 3 second.
             // but only when user has not seen it once.
             if( parseInt( window.localStorage.getItem( 'tourVisited' ) ) !== 1 )
             {
                 window.setTimeout( function()
                 {
                     initTour();
                 }, 3000 );
             }
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
     appInstallContainer.style.display = '';
 }
 
 /**
  * Hide app install container.
  */
  function hideAppInstall()
  {
     appInstallContainer.style.display = 'none';
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
     // set tour as visited at local storage, so that the user only see this once automatically.
     window.localStorage.setItem( 'tourVisited', 1 );
 
     // reset calculator
     resetCalculator();
 
     Tour.init( '#calculator' );
 
     Tour.addStep({
         elementSelector : null,
         headline        : 'Welcome Citizen',
         description     : "Welcome to the Star Citizen Rock Mining Calcualator.<br />This calculator should help you to find worthy rocks to mine.<br /><br />If you want, I'll show you how it works. Just click on \"Next\" and the tutorial starts right away. If not, just close this window.<br /><br />You can always start this tutorial again later via the link at the bottom of the calculator."
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
         description     : 'Here you can view the currently available information on the rock type, such as the material composition or an example image of the rock type.'
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