import React from 'react';
import styled from 'styled-components';

import Select from '@/components/AddOrder/Select';

export interface Input {
  name?: string,
  example?: string,
  items?: string[],
  isRequired?: boolean
}

interface Product {
  productId: number,
  name: string,
  price: string
}

export interface Service {
  name: string,
  input: Input[],
  price: number,
  products?: Product[]
}

interface Props {
  service: Service
}

const SearchInputs: React.FC<Props> = ({ service:  { name, input, price } }) => {
  const getContent = () => {
    const mappedInput = input.map((el) => {
      if (el.items) {
        return (
          <Label key={el.name}>
            <span>{el.name}</span>
            <Select items={el.items} />
          </Label>
        );
      }

      return (
        <Label key={el.name}>
          <span>{el.name}</span>
          <input
            type="text"
            placeholder={el.example}
            required={el.isRequired}
          />
        </Label>
      );
    });

    const priceStr = price ? `$${price.toFixed(2)}` : 'Free';

    switch (name) {
      case 'Title Reference': case 'Previous Title Reference': {
        return (
          <TitleReference>
            {mappedInput}
            <ButtonWrapper style={{ marginLeft: '-4px' }}>
              <Button style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>
                Verify
              </Button>
              <Price>{priceStr}</Price>
            </ButtonWrapper>
          </TitleReference>
        );
      }
      case 'Address': {
        return (
          <Address>
            <AddressInputs>
              {mappedInput}
            </AddressInputs>
            <ButtonWrapper>
              <Price>{priceStr}</Price>
              <Button>Browse</Button>
            </ButtonWrapper>
          </Address>
        )
      }
      case 'Owner(Individual)': {
        return (
          <Owner>
            {mappedInput}
            <ButtonWrapper align="flex-start">
              <Button>Browse</Button>
              <Price>{priceStr}</Price>
            </ButtonWrapper>
          </Owner>
        );
      }
      case 'Owner(Organisation)': case 'Volume/Folio': case 'Lot/Plan': {
        return (
          <Owner>
            {mappedInput}
            <ButtonWrapper align="flex-start">
              <Button>Browse</Button>
              <Price>{priceStr}</Price>
            </ButtonWrapper>
          </Owner>
        );
      }
      default: return <></>;
    }
  }

  return getContent();
};

const TitleReference = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
  
  span {
    color: #6B7280;
  }
  
  input {
    padding: .5rem .75rem;
    width: 100%;
    height: 42px;
    border: 1px solid rgba(156, 163, 175, .6);
    border-radius: 5px;
    line-height: 1.5rem;
    background-color: rgba(17, 24, 39, .05);
    color: rgba(17, 24, 39, .6);
    
    ::placeholder {
      color: rgba(17, 24, 39, .35);
    }

    :focus {
      outline: 2px solid var(--primary-blue-color);
    }
  }
`;

const ButtonWrapper = styled.div<{ align?: string }>`
  display: flex;
  grid-gap: .75rem;
  justify-content: ${({ align }) => align ? align : 'flex-end'};
  align-items: center;
  align-self: flex-end;
`;

const Button = styled.button`
  padding: .625rem 2.25rem;
  height: 42px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  background-color: var(--primary-blue-color);
  
  :hover {
    background-color: rgba(36, 99, 235, .9);
  }
`;

const Price = styled.span`
  padding: .4rem .65rem;
  border: 1px solid rgba(30, 58, 138, .1);
  border-radius: 4px;
  font-size: 14px;
  color: #1E3E8A;
  background-color: #DBEAFE;
`;

const Address = styled.div`
  margin-bottom: 1.25rem;
`;

const AddressInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  margin-bottom: .75rem;
`;

const Owner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default SearchInputs;
