let rockTypes = {
   Asteroids: [
      {
         name: 'C-Type Asteroid',
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
         },
         image: 'asteroid-ctype.png'
      },
      {
         name: 'E-Type Asteroid',
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
         },
         image: 'asteroid-etype.png'
      },
      {
         name: 'M-Type Asteroid',
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
         },
         image: 'asteroid-mtype.png'
      },
      {
         name: 'P-Type Asteroid',
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
         },
         image: 'asteroid-ptype.png'
      },
      {
         name: 'Q-Type Asteroid',
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
         },
         image: 'asteroid-qtype.png'
      },
      {
         name: 'S-Type Asteroid',
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
         },
         image: 'asteroid-stype.png'
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
         },
         image: 'atacamite.png'
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
         },
         image: 'felsic.png'
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
         },
         image: 'gneiss.png'
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
         },
         image: 'granite.png'
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
         },
         image: 'igneous.png'
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
         },
         image: 'obsidian.png'
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
         },
         image: 'quantanium.png'
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
         },
         image: 'quartzite.png'
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
         },
         image: 'shale.png'
      }
   ]
};