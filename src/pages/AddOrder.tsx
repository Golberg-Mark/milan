import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '@/components/PageTitle';
import Input from '@/components/Input';
import SearchInputs, { Service } from '@/components/AddOrder/SearchInputs';
import OrderItem from '@/components/AddOrder/OrderItem';
import {
  getOrderItemsAction,
  initializeOrderAction,
  editOrderAction,
  userActions
} from '@/store/actions/userActions';
import Footer from '@/components/AddOrder/Footer';
import {
  selectOrderId,
  selectProducts,
  selectProductsPrice,
  selectTotalItemsAmount
} from '@/store/selectors/userSelectors';
import useInput from '@/hooks/useInput';
import useToggle from '@/hooks/useToggle';
import Loader from '@/components/Loader';

interface Region {
  region: string,
  services: Service[]
}

const mockedData: Region[] = [
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

const AddOrder = () => {
  const [matter, setMatter] = useInput();
  const [description, setDescription] = useInput();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [isProductsLoading, toggleIsProductsLoading] = useToggle();

  const mockedProducts = useSelector(selectProducts);
  const productsPrice = useSelector(selectProductsPrice);
  const totalItemsAmount = useSelector(selectTotalItemsAmount);
  const orderId = useSelector(selectOrderId);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(userActions.setOrderId(null));
    dispatch(userActions.setProducts(null));
    dispatch(userActions.setTotalItemsAmount(0));
    dispatch(userActions.setTotalPrice(0));
    dispatch(userActions.setProductsPrice(0));
  }, [selectedService]);

  const search = async () => {
    const region = mockedData[selectedRegion];
    const service = mockedData[selectedRegion].services[selectedService];

    dispatch(userActions.setProducts(null));
    toggleIsProductsLoading(true);

    if (!orderId) {
      dispatch(initializeOrderAction(
        matter,
        description,
        region.region,
        service.name,
        service.products![0].price
      ));
    } else {
      if (!isMatterError || !isDescriptionError) {
        dispatch(editOrderAction(
          matter,
          description,
          region.region,
          service.name
        ));
      }
    }

    try {
      await dispatch(getOrderItemsAction(
        mockedData[selectedRegion].region,
        mockedData[selectedRegion].services[selectedService].name,
        mockedData[selectedRegion].services[selectedService].products![0].price
      ));
      toggleIsProductsLoading(false);
    } catch (e) { console.error(e) }
  };

  const selectItem = (productIndex: number, i: number) => {
    const copiedState = JSON.parse(JSON.stringify(mockedProducts));
    const isChosen = copiedState[productIndex].items[i].isChosen;
    copiedState[productIndex].items[i].isChosen = !isChosen;

    const newPrice = isChosen
      ? productsPrice - +copiedState[productIndex].price
      : productsPrice + +copiedState[productIndex].price;

    const newTotalItemsAmount = isChosen ? totalItemsAmount - 1 : totalItemsAmount + 1;

    dispatch(userActions.setProductsPrice(newPrice));
    dispatch(userActions.setTotalItemsAmount(newTotalItemsAmount));
    dispatch(userActions.setProducts(copiedState));
  };

  const placeOrder = () => {
    if (isMatterError || isDescriptionError) return;

    const region = mockedData[selectedRegion].region;
    const service = mockedData[selectedRegion].services[selectedService].name;

    dispatch(editOrderAction(matter, description, region, service));
  };

  const isMatterError = !matter;
  const isDescriptionError = !description;

  return (
    <AddOrderPage>
      <PageHeader>
        <StyledLink to="/">
          <BackIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="var(--primary-dark-color)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </BackIcon>
          Back to orders
        </StyledLink>
        <PageTitle>
          New Order
        </PageTitle>
      </PageHeader>
      <ContentWrapper>
        <Content>
          <Matter>
            <Input
              label="Matter / File Reference"
              placeholder="Enter matter here"
              value={matter}
              onChange={setMatter}
            />
            <div>
              <SubTitle>Regions</SubTitle>
              <Tips>
                {mockedData.map((el, i) => (
                  <Tip
                    key={el.region}
                    isSelected={selectedRegion === i}
                    onClick={() => {
                      setSelectedService(0)
                      setSelectedRegion(i)
                    }}
                  >
                    {el.region}
                  </Tip>
                ))}
              </Tips>
            </div>
            <Input
              label="Description"
              placeholder="Enter description here"
              value={description}
              onChange={setDescription}
            />
          </Matter>
          <TitleSection>
            <Title>Title Search</Title>
            <SubTitle>Search by</SubTitle>
            <Tips style={{ marginBottom: '1.25rem' }}>
              {mockedData[selectedRegion].services.map((el, i) => (
                <Tip
                  key={el.name}
                  isSelected={selectedService === i}
                  onClick={() => setSelectedService(i)}
                >
                  {el.name}
                </Tip>
              ))}
            </Tips>
            <SearchInputs
              search={search}
              service={mockedData[selectedRegion].services[selectedService]}
            />
            <Titles>
              Titles that you add will appear here.
            </Titles>
          </TitleSection>
          <OrderItemsSection>
            <Title>Order items</Title>
            <Description>
              Expand a product and select the references you want to purchase within it.
            </Description>
            {mockedProducts?.length ? (
              <ul>
                {mockedProducts.map((item, i) => (
                  <OrderItem
                    key={item.name}
                    name={item.name}
                    index={i}
                    price={item.price}
                    subItems={item.items}
                    setSubItems={selectItem}
                  />
                ))}
              </ul>
            ) : isProductsLoading ? <Loader/> : ''}
          </OrderItemsSection>
        </Content>
      </ContentWrapper>
      <Footer
        placeOrder={placeOrder}
      />
    </AddOrderPage>
  );
};

const AddOrderPage = styled.section`
  position: relative;
`;

const PageHeader = styled.div`
  padding: 1rem 2rem;
  background-color: rgba(17, 24, 39, .05);

  h1 {
    margin-bottom: 0;
  }
`;

const BackIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  grid-gap: 4px;
  margin-bottom: 14px;
  font-size: .9rem;
`;

const ContentWrapper = styled.div`
  padding: 2.5rem 2rem 8rem;
`;

const Content = styled.div`
  padding: 2rem 0 2rem;
  border: 1px solid rgb(229, 231, 235);
  border-radius: 8px;
  background-color: #fff;
  overflow-x: hidden;
`;

const Matter = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  grid-gap: 1.5rem;
  padding: 0 2.5rem 1.25rem;
  border-bottom: 1px solid rgb(229, 231, 235);

  input {
    margin: 0;
  }
`;

const Title = styled.h2`
  margin-bottom: .5rem;
  font-size: 1.125rem;
`;

const SubTitle = styled.p`
  margin-bottom: .5rem;
  color: #4B5563;
  font-weight: 500;
`;

const Tips = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 6px;
`;

const Tip = styled.span<{ isSelected: boolean }>`
  padding: .5rem 1rem;
  font-size: 14px;
  border: 1px solid ${({ isSelected }) => isSelected ? 'var(--primary-blue-color)' : 'rgba(156, 163, 175, .8)'};
  border-radius: 100px;
  color: ${({ isSelected }) => isSelected ? 'var(--primary-blue-color)' : '#6B7280'};
  background-color: ${({ isSelected }) => isSelected ? 'rgb(239, 246, 255)' : 'unset'};
  cursor: pointer;
`;

const TitleSection = styled.div`
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgb(229, 231, 235);
`;

const Titles = styled.div`
  padding: 1rem;
  border-radius: .5rem;
  color: #00000099;
  text-align: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .3);
`;

const OrderItemsSection = styled.div`
  padding: 1.5rem 2.5rem 0;
`;

const Description = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  color: rgba(0, 0, 0, .7);
`;

export default AddOrder;
