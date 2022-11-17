import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getOrganisationProductsAction,
  orderActions, placeOrderAction
} from '@/store/actions/orderActions';
import {
  selectDescription, selectIsProductsLoading,
  selectMatter, selectOrderId,
  selectProducts,
  selectProductsPrice,
  selectTotalItemsAmount
} from '@/store/selectors/orderSelectors';

import PageTitle from '@/components/PageTitle';
import Input from '@/components/Input';
import SearchInputs from '@/components/AddOrder/RegionsServices';
import OrderItem from '@/components/AddOrder/OrderItem';
import Footer from '@/components/AddOrder/Footer';

import useToggle from '@/hooks/useToggle';
import getRegionsData from '@/utils/getRegionsData';
import parseCSV from '@/utils/parseCSV';

const mockedData = getRegionsData();

const AddOrder = () => {
  const locationState = useLocation().state;

  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [isOrderLoading, toggleIsOrderLoading] = useToggle();
  const navigate = useNavigate();

  const matter = useSelector(selectMatter);
  const description = useSelector(selectDescription);
  const products = useSelector(selectProducts);
  const productsPrice = useSelector(selectProductsPrice);
  const totalItemsAmount = useSelector(selectTotalItemsAmount);
  const isProductsLoading = useSelector(selectIsProductsLoading);
  const orderId = useSelector(selectOrderId);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getOrganisationProductsAction());

    return () => {
      window.history.replaceState({}, '');
    };
  }, []);

  useEffect(() => {
    if (orderId) navigate(`/orders/${orderId}`);
  }, [orderId]);

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

  useEffect(() => () => {
    dispatch(orderActions.setMatter(''));
    dispatch(orderActions.setDescription(''));
    dispatch(orderActions.cleanCurrentOrder());
  }, []);

  const selectItem = (productIndex: number, i: number) => {
    const copiedState = JSON.parse(JSON.stringify(products));
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

    await dispatch(placeOrderAction(region, service));
    setTimeout(() => {
      toggleIsOrderLoading(false);
    }, 300);
  };

  const regionProducts = useMemo(() => {
    return products?.filter((el) => new RegExp(`${mockedData[selectedRegion].region}`).test(el.collection)).map((el, i) => (
      <OrderItem
        key={el.searchType}
        name={el.searchType}
        index={i}
        price={el.priceInclGST}
        inputs={[{ placeholder: el.input1 }, { placeholder: el.input2 || '' }]}
      />
    ))
  }, [products, selectedRegion]);

  const isMatterError = !matter;
  const isDescriptionError = !description;

  return (
    <AddOrderPage>
      <PageHeader>
        <StyledLink to="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <path d="M9.57 5.92999L3.5 12L9.57 18.07" stroke="#111827" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.5 12H3.67" stroke="#111827" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
          <PageTitle>
            Property Information
          </PageTitle>
        </StyledLink>
        <Matter>
          <MatterInputs>
            <Input
              label="Matter / File Reference"
              labelMarginBottom={25}
              placeholder="Enter matter here"
              value={matter}
              onChange={(evt) => dispatch(orderActions.setMatter(evt.target.value))}
            />
            <Input
              label="Description"
              labelMarginBottom={25}
              placeholder="Enter description here"
              value={description}
              onChange={(evt) => dispatch(orderActions.setDescription(evt.target.value))}
            />
          </MatterInputs>
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
        </Matter>
      </PageHeader>
      <Content>
        <TitleSection>
          <SubTitle fontSize={18}>Title Search</SubTitle>
          <SubTitle style={{ color: 'rgba(26, 28, 30, 0.5)' }}>Search by:</SubTitle>
          <Tips style={{ marginBottom: '24px' }}>
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
            regionName={mockedData[selectedRegion].region}
            selectedService={selectedService}
          />
          <Titles>
            Titles that you add will appear here.
          </Titles>
        </TitleSection>
        <OrderItemsSection>
          <SubTitle>Searches</SubTitle>
          <Description>
            Expand a product and select the references you want to purchase within it.
          </Description>
          {/*mockedProducts?.length ? (
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
          ) : isProductsLoading ? <Loader/> : ''*/}
          <ul>
            {regionProducts}
          </ul>
        </OrderItemsSection>
      </Content>
      <Footer
        isError={isMatterError || isDescriptionError}
        isLoading={isOrderLoading}
        placeOrder={placeOrder}
      />
    </AddOrderPage>
  );
};

const AddOrderPage = styled.section`
  padding: 32px 32px 134px;
  position: relative;
  
  * {
    letter-spacing: -0.03em;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  padding: 32px 0;
  border-radius: 12px;
  background-color: #fff;

  h1 {
    margin-bottom: 0;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  grid-gap: 24px;
  padding: 0 32px 32px;
  border-bottom: 1px solid rgba(35, 35, 35, 0.16);
`;

const Matter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
  padding: 32px 120px 32px 32px;

  input {
    margin: 0;
  }
`;

const MatterInputs = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
`;

const Content = styled.div`
  padding: 32px;
  border-radius: 12px;
  background-color: #fff;
  overflow-x: hidden;
`;

const SubTitle = styled.p<{ fontSize?: number }>`
  margin-bottom: 25px;
  font-size: ${({ fontSize = 16 }) => fontSize}px;
  color: var(--primary-dark-color);
  font-weight: 500;
`;

const Tips = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
`;

const Tip = styled.span<{ isSelected: boolean, width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  width: ${({ width }) => width ? `${width}px}` : 'auto'};
  height: 38px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ isSelected }) => isSelected ? 'var(--primary-green-color)' : 'rgba(0, 0, 0, .5)'};
  border: 1px solid ${({ isSelected }) => isSelected ? 'var(--primary-green-color)' : 'rgba(35, 35, 35, 0.16)'};
  border-radius: 4px;
  background-color: ${({ isSelected }) => isSelected ? 'var(--primary-green-background-color)' : 'unset'};
  cursor: pointer;
  
  :hover {
    border: 1px solid var(--primary-green-color);
  }
`;

const TitleSection = styled.div`
  border-bottom: 1px solid #E8E8E8;
`;

const Titles = styled.div`
  margin-bottom: 32px;
  padding: 1rem;
  border-radius: .5rem;
  color: #00000099;
  text-align: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .3);
`;

const OrderItemsSection = styled.div`
  padding-top: 32px;
`;

const Description = styled.p`
  margin-bottom: 12px;
  font-size: 12px;
  color: rgba(0, 0, 0, .5);
`;

export default AddOrder;
