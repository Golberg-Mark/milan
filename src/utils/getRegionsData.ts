import { Service } from '@/components/AddOrder/SearchInputs';

export interface Region {
  region: string,
  services: Service[]
}

export default (): Region[] => {
  return [
    {
      'region': 'WA',
      'services': [
        {
          'name': 'Title Reference',
          'price': 0,
          'input': [
            {
              'name': 'Reference number',
              'example': 'E.g 183/10001, 6/22052, 48/SP633903',
              'isRequired': true
            }
          ],
          "products": [
            {
              "productId": 1,
              "name": "Title search",
              "price": "0"
            },
            {
              "productId": 2,
              "name": "Titles",
              "price": "2.70"
            },
            {
              "productId": 3,
              "name": "Sub Folio",
              "price":"eg 4.50"
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Street number',
              'example': 'E.g 16',
              'isRequired': false
            },
            {
              'name': 'Street name',
              'example': 'E.g Boredeaux street',
              'isRequired': true
            },
            {
              'name': 'Suburb',
              'example': 'E.g AVONDALE HEIGHTS',
              'isRequired': true
            }
          ],
          "products": [
            {
              "productId": 1,
              "name": "Address search",
              "price": "1.28"
            },
            {
              "productId": 2,
              "name": "Titles",
              "price": "2.70"
            },
            {
              "productId": 3,
              "name": "Sub Folio",
              "price":"eg 4.50"
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name',
              'example': 'E.g Jon',
              'isRequired': false
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'QLD',
      'services': [
        {
          'name': 'Title Reference',
          'price': 0,
          'input': [
            {
              'name': 'Reference number',
              'example': 'E.g 12067050',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Street number',
              'example': 'E.g 16',
              'isRequired': true
            },
            {
              'name': 'Street name',
              'example': 'E.g Boredeaux street',
              'isRequired': true
            },
            {
              'name': 'Suburb',
              'example': 'E.g AVONDALE HEIGHTS',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name(s)',
              'example': 'E.g Jon',
              'isRequired': false
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Previous Title Reference',
          'price': 2.90,
          'input': [
            {
              'name': 'Reference number',
              'example': 'E.g 12067050',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Lot/Plan',
          'price': 5.00,
          'input': [
            {
              'name': 'Lot/Plan Number',
              'example': 'E.g 8/RP601844',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'NSW',
      'services': [
        {
          'name': 'Title Reference',
          'price': 0,
          'input': [
            {
              'name': 'Reference number',
              'example': 'E.g 183/10001, 6/22052, 48/SP633903',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Street number',
              'example': 'E.g 16',
              'isRequired': true
            },
            {
              'name': 'Street name',
              'example': 'E.g Boredeaux street',
              'isRequired': true
            },
            {
              'name': 'Suburb',
              'example': 'E.g AVONDALE HEIGHTS',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name(s)',
              'example': 'E.g John Albert',
              'isRequired': false
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'VIC',
      'services': [
        {
          'name': 'Volume/Folio',
          'price': 1.00,
          'input': [
            {
              'name': 'Volume/Folio',
              'example': 'E.g 8555/407',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Unit Number',
              'example': 'E.g 1'
            },
            {
              'name': 'Street Number',
              'example': 'E.g 2'
            },
            {
              'name': 'Street Name',
              'example': 'E.g Logan',
              'isRequired': true
            },
            {
              'name': 'Locality',
              'items': ['Suburb', 'Postcode', 'Municipality'],
              'isRequired': true
            },
            //TODO: add locality
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name(s)',
              'example': 'E.g John Albert',
              'isRequired': false
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Lot/Plan or List',
          'price': 4.83,
          'input': [
            {
              'name': 'Company Name',
              'items': ['Lot/Plan', 'Lot List'],
              'isRequired': true
            }
          ]
        },
        //TODO: add lot/plan or list
        {
          'name': 'Crown Description',
          'price': 1.56,
          'input': [
            {
              'name': 'Crown Description',
              'example': 'Allotments 12A Section B Parish of Hotham',
              'isRequired': true
            },
            {
              'name': 'Allotments',
              'example': '123'
            },
            {
              'name': 'Portion',
              'example': '49'
            },
            {
              'name': 'Block',
              'example': '1'
            },
            {
              'name': 'Section',
              'example': 'A'
            },
            {
              'name': 'Subdivision',
              'example': 'Subdivision'
            },
            {
              'name': 'Parish/Township',
              'example': 'Albury-Wodonga',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Council Number',
          'price': 4.05,
          'input': [
            {
              'name': 'Council Number',
              'example': 'E.g 12345',
              'isRequired': true
            },
            {
              'name': 'Municipality',
              'example': 'Your Municipality',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'SPI',
          'price': 3.55,
          'input': [
            {
              'name': 'SPI',
              'example': 'E.g 12\\LP123456',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Application Index',
          'price': 5.90,
          'input': [
            {
              'name': 'Application Index',
              'example': 'E.g AP123456E',
              'isRequired': true
            }
          ]
        },
      ]
    },
    {
      'region': 'SA',
      'services': [
        {
          'name': 'Volume/Folio',
          'price': 1.00,
          'input': [
            {
              'name': 'Register',
              'items': ['CT', 'CL', 'CR'],
              'isRequired': true
            },
            {
              'name': 'Volume/Folio',
              'example': 'E.g 5359/705',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Level',
              'example': ''
            },
            {
              'name': 'Lot',
              'example': ''
            },
            {
              'name': 'Unit Number',
              'example': ''
            },
            {
              'name': 'Street Number',
              'example': ''
            },
            {
              'name': 'Street Name',
              'example': '',
              'isRequired': true
            },
            {
              'name': 'Suburb/Locality',
              'example': ''
            }
          ]
        },
        {
          'name': 'Plan/Parcel',
          'price': 2.77,
          'input': [
            {
              'name': 'Parcel',
              'example': '2'
            },
            {
              'name': 'Plan Type',
              'items': ['Community Plan', 'Deposited Plan', 'Filed Plan', 'Hundred Plan', 'Road Plan', 'Strata Plan', 'Township Plan'],
              'isRequired': true
            },
            {
              'name': 'Plan Number',
              'example': 'E.g 45754',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name',
              'example': 'E.g Jon',
              'isRequired': true
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'ACT',
      'services': [
        {
          'name': 'Volume/Folio',
          'price': 1.00,
          'input': [
            {
              'name': 'Volume/Folio',
              'example': 'E.g 2146/36',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Unit Number',
              'example': ''
            },
            {
              'name': 'Street Number',
              'example': '',
              'isRequired': true
            },
            {
              'name': 'Street Name',
              'example': '',
              'isRequired': true
            },
            {
              'name': 'Suburb/Locality',
              'example': '',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Parcel',
          'price': 2.70,
          'input': [
            {
              'name': 'Distinct',
              'items': [''],
              'isRequired': true
            },
            {
              'name': 'Section',
              'example': 'E.g 156',
              'isRequired': true
            },
            {
              'name': 'Block',
              'example': 'E.g 16',
              'isRequired': true
            },
            {
              'name': 'Unit',
              'example': 'E.g 2'
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name',
              'example': 'E.g Jon',
              'isRequired': true
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'NT',
      'services': [
        {
          'name': 'Volume/Folio',
          'price': 1.00,
          'input': [
            {
              'name': 'Volume/Folio',
              'example': 'E.g 2146/36',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Unit Number',
              'example': ''
            },
            {
              'name': 'Street Number',
              'example': ''
            },
            {
              'name': 'Street Name',
              'example': '',
              'isRequired': true
            },
            {
              'name': 'Suburb/Locality',
              'example': '',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Lot/Town',
          'price': 4.32,
          'input': [
            {
              'name': 'Lot',
              'example': 'E.g 200',
              'isRequired': true
            },
            {
              'name': 'Town',
              'example': 'E.g Town of Darwin',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name',
              'example': 'E.g Jon',
              'isRequired': true
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    },
    {
      'region': 'TAS',
      'services': [
        {
          'name': 'Volume/Folio',
          'price': 1.00,
          'input': [
            {
              'name': 'Volume/Folio',
              'example': 'E.g 2146/36',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Address',
          'price': 1.28,
          'input': [
            {
              'name': 'Unit Number',
              'example': ''
            },
            {
              'name': 'Street Number',
              'example': ''
            },
            {
              'name': 'Street Name',
              'example': '',
              'isRequired': true
            },
            {
              'name': 'Suburb/Locality',
              'example': '',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Individual)',
          'price': 2.41,
          'input': [
            {
              'name': 'First Name',
              'example': 'E.g Jon',
              'isRequired': true
            },
            {
              'name': 'Last Name',
              'example': 'E.g Smith',
              'isRequired': true
            }
          ]
        },
        {
          'name': 'Owner(Organisation)',
          'price': 3.36,
          'input': [
            {
              'name': 'Company Name',
              'example': 'Acme Corporation',
              'isRequired': true
            }
          ]
        }
      ]
    }
  ];
};
