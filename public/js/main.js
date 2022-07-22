// when document is ready
document.addEventListener( 'DOMContentLoaded', function()
{
    RockCalculator.init( materials, rockTypes );
});

// when window is loaded
window.addEventListener( 'load', function()
{
    this.document.querySelector( '#calculator' ).style.display = '';
});

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