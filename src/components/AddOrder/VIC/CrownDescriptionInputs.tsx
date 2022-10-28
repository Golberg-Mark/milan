import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import Input from '@/components/AddOrder/Input';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/AddOrder/Select';

const something = ['Free Test', 'Structured'];
const townships = [
  'Acheron',
  'Addington',
  'Adzar',
  'Adjie',
  'Aire',
  'Albacutya',
  'Alberton East',
  'at Alberton Parish of Alberton East',
  'Alberton West',
  'Alexandra',
  'Allambee',
  'Allambee East',
  'Amherst',
  'Amphitheatre',
  'Anakie',
  'Angahook',
  'Angora',
  'Annuello',
  'Annya',
  'Arapiles'
];

const CrownDescriptionInputs: React.FC = () => {
  const [selectedSomething, setSelectedSomething] = useState(0);
  const [crownDescription, setCrownDescription] = useInput();
  const [allotments, setAllotments] = useInput();
  const [portion, setPortion] = useInput();
  const [block, setBlock] = useInput();
  const [section, setSection] = useInput();
  const [subdivision, setSubdivision] = useInput();
  const [parishTownship, setParishTownship] = useState(0);

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'Crown Description',
      '1.56'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'Crown Description',
        '1.56'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <CrownDescription>
      <Inputs>
        <Label>
          <span style={{ color: 'transparent' }}>Something</span>
          <Select
            selectedItem={selectedSomething}
            setSelectedItem={setSelectedSomething}
            items={something}
          />
        </Label>
        <Input
          name="Crown Description"
          type="text"
          value={crownDescription}
          onChange={setCrownDescription}
          placeholder="E.g Allotments 12A Section B Parish of Hotham"
        />
        <Input
          name="Allotments"
          type="text"
          value={allotments}
          onChange={setAllotments}
          placeholder="E.g 123"
        />
        <Input
          name="Portion"
          type="text"
          value={portion}
          onChange={setPortion}
          placeholder="E.g 49"
        />
        <Input
          name="Block"
          type="text"
          value={block}
          onChange={setBlock}
          placeholder="E.g 1"
        />
        <Input
          name="Section"
          type="text"
          value={section}
          onChange={setSection}
          placeholder="E.g A"
        />
        <Input
          name="Subdivision"
          type="text"
          value={subdivision}
          onChange={setSubdivision}
          placeholder="E.g Subdivision"
        />
        <Label>
          <span>Parish/Township</span>
          <Select
            selectedItem={parishTownship}
            setSelectedItem={setParishTownship}
            items={townships}
          />
        </Label>
      </Inputs>
      <ButtonWrapper>
        <Button onClick={search}>
          Browse
        </Button>
        <Price>$1.56</Price>
      </ButtonWrapper>
    </CrownDescription>
  );
};

const CrownDescription = styled.div`
  margin-bottom: 1.25rem;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: .75rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
  
  span {
    color: #6B7280;
    white-space: nowrap;
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

export default CrownDescriptionInputs;
