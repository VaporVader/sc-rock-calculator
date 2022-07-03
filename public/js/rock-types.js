let rockTypes = {
   Asteroids: [
      {
         name: 'C-Type',
         content: {
            'Aluminium': {
               min: 2.0,
               max: 30.0
            },
            'Laranite': {
               min: 2.0,
               max: 20.0
            },
            'Quantanium': {
               min: 1.0,
               max: 20.0
            }
         }
      },
      {
         name: 'E-Type',
         content: {
            'Borase': {
               min: 1.2,
               max: 20.0
            },
            'Corundum': {
               min: 3.0,
               max: 50.0
            },
            'Diamond': {
               min: 1.0,
               max: 30.0
            },
            'Gold': {
               min: 2.0,
               max: 20.0
            }
         }
      },
      {
         name: 'M-Type',
         content: {
            'Hephaestanite': {
               min: 1.1,
               max: 20.0
            },
            'Laranite': {
               min: 1.2,
               max: 30.0
            },
            'Tungsten': {
               min: 3.0,
               max: 45.0
            }
         }
      },
      {
         name: 'P-Type',
         content: {
            'Aluminium': {
               min: 3.0,
               max: 55.0
            },
            'Bexalite': {
               min: 1.1,
               max: 20.0
            },
            'Corundum': {
               min: 3.0,
               max: 50.0
            },
            'Diamond': {
               min: 1.15,
               max: 35.0
            },
            'Titanium': {
               min: 5.0,
               max: 30.0
            }
         }
      },
      {
         name: 'Q-Type',
         content: {
            'Beryl': {
               min: 1.5,
               max: 30.0
            },
            'Borase': {
               min: 1.12,
               max: 15.0
            },
            'Quantanium': {
               min: 2.1,
               max: 50.0
            },
            'Quartz': {
               min: 20.0,
               max: 40.0
            }
         }
      },
      {
         name: 'S-Type',
         content: {
            'Borase': {
               min: 1.0,
               max: 20.0
            },
            'Copper': {
               min: 2.0,
               max: 20.0
            },
            'Titanium': {
               min: 1.0,
               max: 30.0
            }
         }
      }
   ],
   Deposits: [
      {
         name: 'Atacamite Deposit',
         content: {
            'Agricium': {
               min: 1.0,
               max: 15.0
            },
            'Beryl': {
               min: 3.0,
               max: 40.0
            },
            'Diamond': {
               min: 2.0,
               max: 40.0
            },
            'Quartz': {
               min: 3.0,
               max: 50.0
            },
            'Taranite': {
               min: 1.16,
               max: 20.0
            }
         }
      },
      {
         name: 'Felsic Deposit',
         content: {
            'Agricium': {
               min: 1.0,
               max: 15.0
            },
            'Beryl': {
               min: 3.0,
               max: 40.0
            },
            'Diamond': {
               min: 2.0,
               max: 40.0
            },
            'Quartz': {
               min: 3.0,
               max: 50.0
            },
            'Taranite': {
               min: 1.16,
               max: 20.0
            }
         }
      },
      {
         name: 'Gneiss Deposit',
         content: {
            'Agricium': {
               min: 2.0,
               max: 30.0
            },
            'Aluminium': {
               min: 3.0,
               max: 65.0
            },
            'Beryl': {
               min: 2.0,
               max: 20.0
            },
            'Diamond': {
               min: 1.0,
               max: 20.0
            },
            'Taranite': {
               min: 1.0,
               max: 30.0
            },
            'Tungsten': {
               min: 2.0,
               max: 40.0
            }
         }
      },
      {
         name: 'Granite Deposit',
         content: {
            'Agricium': {
               min: 2.0,
               max: 30.0
            },
            'Copper': {
               min: 3.0,
               max: 35.0
            },
            'Corundum': {
               min: 3.0,
               max: 50.0
            },
            'Diamond': {
               min: 3.0,
               max: 30.0
            },
            'Laranite': {
               min: 2.0,
               max: 30.0
            },
            'Tungsten': {
               min: 3.0,
               max: 45.0
            }
         }
      },
      {
         name: 'Igneous Deposit',
         content: {
            'Copper': {
               min: 2.0,
               max: 35.0
            },
            'Gold': {
               min: 2.0,
               max: 35.0
            },
            'Taranite': {
               min: 3.0,
               max: 30.0
            },
            'Titanium': {
               min: 2.0,
               max: 35.0
            },
            'Tungsten': {
               min: 3.0,
               max: 40.0
            }
         }
      },
      {
         name: 'Obsidian Deposit',
         content: {
            'Beryl': {
               min: 2.0,
               max: 40.0
            },
            'Bexalite': {
               min: 3.0,
               max: 30.0
            },
            'Corundum': {
               min: 3.0,
               max: 50.0
            },
            'Diamond': {
               min: 2.0,
               max: 35.0
            },
            'Hephaestanite': {
               min: 3.0,
               max: 30.0
            }
         }
      },
      {
         name: 'Quantanium Deposit',
         content: {
            'Aluminium': {
               min: 3.0,
               max: 50.0
            },
            'Beryl': {
               min: 2.0,
               max: 40.0
            },
            'Borase': {
               min: 1.0,
               max: 15.0
            },
            'Quantanium': {
               min: 2.1,
               max: 50.0
            },
            'Quartz': {
               min: 20.0,
               max: 60.0
            }
         }
      },
      {
         name: 'Quartzite Deposit',
         content: {
            'Beryl': {
               min: 2.0,
               max: 40.0
            },
            'Copper': {
               min: 2.0,
               max: 30.0
            },
            'Diamond': {
               min: 2.0,
               max: 40.0
            },
            'Gold': {
               min: 2.0,
               max: 30.0
            },
            'Quartz': {
               min: 20.0,
               max: 65.0
            },
            'Taranite': {
               min: 1.0,
               max: 15.0
            }
         }
      },
      {
         name: 'Shale Deposit',
         content: {
            'Agricium': {
               min: 2.0,
               max: 30.0
            },
            'Aluminium': {
               min: 3.0,
               max: 50.0
            },
            'Gold': {
               min: 2.0,
               max: 35.0
            },
            'Laranite': {
               min: 2.0,
               max: 20.0
            },
            'Titanium': {
               min: 2.0,
               max: 35.0
            }
         }
      }
   ]
};