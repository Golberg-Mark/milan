import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getOrderItemsAction,
  initializeOrderAction,
  editOrderAction,
  orderActions, placeOrderAction
} from '@/store/actions/orderActions';
import {
  selectOrderId,
  selectProducts,
  selectProductsPrice,
  selectTotalItemsAmount
} from '@/store/selectors/orderSelectors';

import PageTitle from '@/components/PageTitle';
import Input from '@/components/Input';
import SearchInputs from '@/components/AddOrder/SearchInputs';
import OrderItem from '@/components/AddOrder/OrderItem';
import Loader from '@/components/Loader';
import Footer from '@/components/AddOrder/Footer';

import useInput from '@/hooks/useInput';
import useToggle from '@/hooks/useToggle';
import getRegionsData from '@/utils/getRegionsData';

const mockedData = getRegionsData();

const AddOrder = () => {
  const locationState = useLocation().state;

  const [matter, setMatter] = useInput();
  const [description, setDescription] = useInput();
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [isProductsLoading, toggleIsProductsLoading] = useToggle();
  const [isOrderLoading, toggleIsOrderLoading] = useToggle();
  const navigate = useNavigate();

  const mockedProducts = useSelector(selectProducts);
  const productsPrice = useSelector(selectProductsPrice);
  const totalItemsAmount = useSelector(selectTotalItemsAmount);
  const orderId = useSelector(selectOrderId);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (locationState && locationState.region && locationState.service) {
      const { region, service } = locationState;
      const regionIndex = mockedData.findIndex((el) => el.region === region);
      setSelectedRegion(regionIndex);
      setSelectedService(mockedData[regionIndex].services.findIndex((el) => el.name === service));
    }
  }, [locationState]);

  useEffect(() => {
    dispatch(orderActions.cleanCurrentOrder());
  }, [selectedRegion]);

  const search = async () => {
    const region = mockedData[selectedRegion];
    const service = mockedData[selectedRegion].services[selectedService];

    dispatch(orderActions.setProducts(null));
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
      dispatch(editOrderAction(
        matter,
        description,
        region.region,
        service.name,
        service.products![0].price
      ));
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

    dispatch(orderActions.setProductsPrice(newPrice));
    dispatch(orderActions.setTotalItemsAmount(newTotalItemsAmount));
    dispatch(orderActions.setProducts(copiedState));
  };

  const placeOrder = async () => {
    if (isMatterError || isDescriptionError) return;
    toggleIsOrderLoading(true);

    const region = mockedData[selectedRegion].region;
    const service = mockedData[selectedRegion].services[selectedService].name;

    await dispatch(placeOrderAction(matter, description, region, service));
    setTimeout(() => {
      toggleIsOrderLoading(false);
      navigate('/');
    }, 300);
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
        isError={isMatterError || isDescriptionError}
        isLoading={isOrderLoading}
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
