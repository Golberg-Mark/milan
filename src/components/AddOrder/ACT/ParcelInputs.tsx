import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/AddOrder/Select';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

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
        <Select
          selectedItem={district}
          setSelectedItem={setDistrict}
          items={districts}
        />
      </Label>
      <Input
        value={section}
        onChange={setSection}
        placeholder="Section, e.g 156"
        style={{ marginBottom: 0 }}
        required
      />
      <Input
        value={block}
        onChange={setBlock}
        placeholder="Block, e.g 16"
        style={{ marginBottom: 0 }}
        required
      />
      <Input
        value={unit}
        onChange={setUnit}
        placeholder="Unit, e.g 2"
        style={{ marginBottom: 0 }}
      />
      <ServiceButton text="Browse" price="2.70" align="flex-start" onClick={search} />
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

export default ParcelInputs;
