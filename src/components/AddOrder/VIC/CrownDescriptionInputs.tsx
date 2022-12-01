import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/Select';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

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
          <Select
            selectedItem={selectedSomething}
            setSelectedItem={setSelectedSomething}
            items={something}
          />
        </Label>
        <Input
          value={crownDescription}
          onChange={setCrownDescription}
          placeholder="Crown Description, e.g Allotments 12A Section B Parish of Hotham"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={allotments}
          onChange={setAllotments}
          placeholder="Allotments, e.g 123"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={portion}
          onChange={setPortion}
          placeholder="Portion, e.g 49"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={block}
          onChange={setBlock}
          placeholder="Block, e.g 1"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={section}
          onChange={setSection}
          placeholder="Section, e.g A"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={subdivision}
          onChange={setSubdivision}
          placeholder="Subdivision, e.g Subdivision"
          style={{ marginBottom: 0 }}
        />
        <Label>
          <Select
            selectedItem={parishTownship}
            setSelectedItem={setParishTownship}
            items={townships}
          />
        </Label>
      </Inputs>
      <ServiceButton text="Browse" price="1.56" onClick={search} />
    </CrownDescription>
  );
};

const CrownDescription = styled.div`
  margin-bottom: 1.25rem;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: .75rem;
  margin-bottom: 1rem;
  
  @media (min-width: 990px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
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

export default CrownDescriptionInputs;
