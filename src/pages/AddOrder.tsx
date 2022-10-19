import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
import Input from '@/components/Input';
import SearchInputs, { Service } from '@/components/AddOrder/SearchInputs';
import OrderItem from '@/components/AddOrder/OrderItem';
import { useDispatch } from 'react-redux';
import { getOrderItemsAction } from '@/store/actions/userActions';
import Footer from '@/components/AddOrder/Footer';

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
        ]
      },
      {
        'name': 'Owner(Individual)',
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
        'input': [{ 'name': 'Company Name', 'example': 'Acme Corporation' }]
      }
    ]
  },
  {
    'region': 'QLD',
    'services': [
      {
        'name': 'Title Reference',
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
        'input': [
          {
            'name': 'Test Option',
            'items': ['Free', 'Structured'],
            'isRequired': true
          }
        ]
      }
    ]
  }
];

const mockedOrderItems = [
  {
    name: 'Title', price: '@ 2.18$', items: [
      { name: '4/2297', isChosen: true },
      { name: '3/1784', isChosen: true },
      { name: '9/1399', isChosen: true },
      { name: '11/2610', isChosen: true },
      { name: '3/2517', isChosen: true },
      { name: '10/2335', isChosen: true },
      { name: '8/1219', isChosen: true },
      { name: '3/898', isChosen: true },
      { name: '8/1931', isChosen: true },
      { name: '10/1474', isChosen: true },
      { name: '3/665', isChosen: true },
      { name: '12/417', isChosen: true },
      { name: '6/1114', isChosen: true },
      { name: '8/1293', isChosen: true },
      { name: '11/872', isChosen: true },
      { name: '3/422', isChosen: true },
      { name: '6/2389', isChosen: true },
      { name: '12/811', isChosen: true },
      { name: '11/633', isChosen: true },
      { name: '8/932', isChosen: true },
      { name: '10/928', isChosen: true },
      { name: '11/1841', isChosen: true },
      { name: '9/746', isChosen: true },
      { name: '7/1461', isChosen: true },
      { name: '10/1740', isChosen: true },
      { name: '9/673', isChosen: true },
      { name: '4/1022', isChosen: true },
      { name: '9/599', isChosen: true },
      { name: '11/1971', isChosen: true },
      { name: '6/2483', isChosen: true },
      { name: '7/1429', isChosen: true },
      { name: '3/1799', isChosen: true }
    ]
  },
  { name: 'Historical title', price: '@ 3.20$' },
  { name: 'Sub folio', price: '@ 1.73$' },
  { name: 'CT Enquiry', price: '@ 2.40$' },
  { name: 'Lots created', price: '@ 1.95$' },
  { name: 'Prior title', price: '@ 3.20$' },
  { name: 'CAC', price: '@ 1.26$' },
  { name: 'Proprietor', price: '@ 2.42$' },
  { name: 'Cancelled title', price: '@ 2.20$' }
];

const AddOrder = () => {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getOrderItemsAction());
  }, []);

  useEffect(() => {
    setSelectedService(0);
  }, [selectedRegion]);

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
            />
            <div>
              <SubTitle>Regions</SubTitle>
              <Tips>
                {mockedData.map((el, i) => (
                  <Tip
                    key={el.region}
                    isSelected={selectedRegion === i}
                    onClick={() => setSelectedRegion(i)}
                  >
                    {el.region}
                  </Tip>
                ))}
              </Tips>
            </div>
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
            <SearchInputs service={mockedData[selectedRegion].services[selectedService]}/>
            <Titles>
              Titles that you add will appear here.
            </Titles>
          </TitleSection>
          <OrderItemsSection>
            <Title>Order items</Title>
            <Description>
              Expand a product and select the references you want to purchase within it.
            </Description>
            <ul>
              {mockedOrderItems.map((item) => (
                <OrderItem
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  subItemsArray={item.items}
                />
              ))}
            </ul>
          </OrderItemsSection>
        </Content>
      </ContentWrapper>
      <Footer/>
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
