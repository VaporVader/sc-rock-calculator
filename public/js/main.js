let popupOpen = false;
let appInstallButton = null;
let Loader = null;

// when document is ready
document.addEventListener( 'DOMContentLoaded', function()
{
    /**
     * Loader handling.
     */
    Loader = {
        element: document.querySelector( '#loader' ),

        show: function()
        {
            this.element.style.display = '';

            document.querySelectorAll( '.hide-when-loading' ).forEach( ( elementEntry ) =>
            {
                elementEntry.style.display = 'none';
            });
        },

        hide: function()
        {
            this.element.style.display = 'none';

            document.querySelectorAll( '.hide-when-loading' ).forEach( ( elementEntry ) =>
            {
                elementEntry.style.display = '';
            });
        }
    };
});

// when window is loaded
window.addEventListener( 'load', function()
{
    Navigation.init( '#content-container' );

    loadPage();

    // register service worker for PWA handling.
    if( 'serviceWorker' in navigator ) 
    {
        navigator.serviceWorker.register( '/service-worker.js' );
    }

    // init app install handling over button.
    appInstallButton = document.querySelector( '#top-install-button' );

    appInstallButton.addEventListener( 'click', async () => 
    {
        hideAppInstall();

        // show install prompt.
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;

        // We've used the prompt, and can't use it again, throw it away.
        installPrompt = null;
    });

    // start first check version after 1 second
    window.setTimeout( function()
    {
        checkNewVersion();
    }, 1000);

    // and now check version every 15 minutes
    let checkVersionTimerInMs = 15 * 60 * 1000;

    window.setInterval( function()
    {
        checkNewVersion();
    }, checkVersionTimerInMs );
});

// listen to click events.
document.addEventListener( 'click', ( event ) =>
{
    let eventTarget             = event.target;
    let eventTargetClosestLink  = event.target.closest( 'a' );

    if( eventTarget.matches( 'a' ) === false && eventTargetClosestLink !== undefined && eventTargetClosestLink !== null )
    {
        eventTarget = eventTargetClosestLink;
    }

    // when a link is clicked with the dynamic class, then load over Navigation.
    if( eventTarget.matches( 'a' ) && eventTarget.classList.contains( 'dynamic-loading' ) )
    {
        event.preventDefault();

        let linkTarget = eventTarget.getAttribute( 'href' ); 

        // remove first and last "/"
        if( linkTarget.slice( 0, 1 ) === '/' )
        {
            linkTarget = linkTarget.substring( 1 );
        }

        if( linkTarget.slice( -1 ) === '/' )
        {
            linkTarget = linkTarget.substring( 0, linkTarget.length - 1 );
        }

        loadPage( linkTarget );
    }
});

// when retrive a history state.
window.onpopstate = function( event )
{
    if( event.state !== undefined && event.state !== null )
    {
        if( event.state.page !== undefined && event.state.page !== null )
        {
            loadPage( event.state.page, true );
        }
    }
};

let installPrompt;

window.addEventListener( 'beforeinstallprompt', ( event ) => {
  // Prevent the mini-infobar from appearing on mobile
  // event.preventDefault();

  // Stash the event so it can be triggered later.
  installPrompt = event;

  // Update UI notify the user they can install the app
  showAppInstall();
});