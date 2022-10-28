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

const districts = [
  'Acton',
  'Ainslie',
  'Amaroo',
  'Aranda',
  'Banks',
  'Barton',
  'Beard',
  'Belconnen',
  'Bonner',
  'Bonython',
  'Braddon',
  'Bruce',
  'Calwell',
  'Campbell',
  'Canberra Airport',
  'Capital Hill',
  'Casey',
  'Chapman',
  'Charnwood',
  'Chifley',
  'Chisholm',
  'City',
  'Conder',
  'Cook',
  'Coombs',
  'Crace',
  'Curtin',
  'Deakin',
  'Denman Prospect',
  'Dickson',
  'Downer',
  'Duffy',
  'Dunlop',
  'Evatt',
  'Fadden',
  'Farrer',
  'Fisher',
  'Florey',
  'Flynn',
  'Forde',
  'Forrest',
  'Franklin',
  'Fraser',
  'Fyshwick',
  'Garran',
  'Gilmore',
  'Giralang',
  'Gordon',
  'Gowrie',
  'Greenway',
  'Griffith',
  'Gungahlin',
  'Hackett',
  'Hall',
  'Harrison',
  'Hawker',
  'Higgins',
  'Holder',
  'Holt',
  'Hughes',
  'Hume',
  'Isaacs',
  'Isabella Plains',
  'Jacka',
  'Kaleen',
  'Kambah',
  'Kingston',
  'Latham',
  'Lawson',
  'Lyneham',
  'Lyons',
  'Macarthur',
  'Macgregor',
  'Macnamara',
  'Macquarie',
  'Mawson',
  'McKellar',
  'Melba',
  'Mitchell',
  'Molonglo',
  'Monash',
  'Moncrieff',
  'Narrabundah',
  'Ngunnawal',
  'Nicholls',
  'Oaks Estate',
  'OConnor',
  'OMalley',
  'Oxley',
  'Page',
  'Palmerston',
  'Parkes',
  'Pearce',
  'Phillip',
  'Pialligo',
  'Red Hill',
  'Reid',
  'Richardson',
  'Rivett',
  'Russell',
  'Scullin',
  'Spence',
  'Stirling',
  'Strathnairn',
  'Symonston',
  'Taylor',
  'Tharwa',
  'Theodore',
  'Throsby',
  'Torrens',
  'Turner',
  'Uriarra Village',
  'Wanniassa',
  'Waramanga',
  'Watson',
  'Weetangera',
  'Weston',
  'Whitlam',
  'Wright',
  'Yarralumla'
];

const ParcelInputs: React.FC = () => {
  const [district, setDistrict] = useState(0);
  const [section, setSection] = useInput();
  const [block, setBlock] = useInput();
  const [unit, setUnit] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'ACT',
      'Parcel',
      '2.70'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'ACT',
        'Parcel',
        '2.70'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Parcel>
      <Label>
        <span>District</span>
        <Select
          selectedItem={district}
          setSelectedItem={setDistrict}
          items={districts}
        />
      </Label>
      <Input
        name="Section"
        value={section}
        onChange={setSection}
        placeholder="E.g 156"
        required
      />
      <Input
        name="Block"
        value={block}
        onChange={setBlock}
        placeholder="E.g 16"
        required
      />
      <Input
        name="Unit"
        value={unit}
        onChange={setUnit}
        placeholder="E.g 2"
      />
      <ButtonWrapper align="flex-start">
        <Button
          onClick={search}
        >
          Browse
        </Button>
        <Price>
          $2.70
        </Price>
      </ButtonWrapper>
    </Parcel>
  );
};

const Parcel = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
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

export default ParcelInputs;
