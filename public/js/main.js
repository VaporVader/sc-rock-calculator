let appInstallContainer = null;

// when document is ready
document.addEventListener( 'DOMContentLoaded', function()
{
    RockCalculator.init( materials, rockTypes );
});

// when window is loaded
window.addEventListener( 'load', function()
{
    this.document.querySelector( '#calculator' ).style.display = '';

    // register service worker for PWA handling.
    if( 'serviceWorker' in navigator ) 
    {
        navigator.serviceWorker.register( '/service-worker.js' );
    }

    // init app install handling over button.
    appInstallContainer = document.querySelector( '#app-install-text' );

    appInstallContainer.querySelector( '.link' ).addEventListener( 'click', async () => {
        hideAppInstall();

        // show install prompt.
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;

        // We've used the prompt, and can't use it again, throw it away.
        installPrompt = null;
    });
});


let installPrompt;

window.addEventListener( 'beforeinstallprompt', ( event ) => {
  // Prevent the mini-infobar from appearing on mobile
  // event.preventDefault();

  // Stash the event so it can be triggered later.
  installPrompt = event;

  // Update UI notify the user they can install the app
  showAppInstall();
});

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
    RockCalculator.addNewMaterial( material );
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
    let materialElement = deleteButtonElement.closest( 'div.material' );

    RockCalculator.deleteMaterial( materialElement );
}

/**
 * Show the info card for current selected rock type.
 */
function showSelectedRockTypeInfo()
{
    RockCalculator.showSelectedRockTypeInfo();
}

/**
 * Close the info card for current selected rock type.
 */
 function closeRockTypeInfo()
 {
     RockCalculator.closeRockTypeInfo();
 }