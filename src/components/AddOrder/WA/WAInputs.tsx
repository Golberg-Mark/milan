import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import TitleInputs from '@/components/AddOrder/WA/TitleInputs';
import AddressInputs from '@/components/AddOrder/AddressInputs';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'WA')!;

interface Props {
  selectedService: number
}

const WaInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Title Reference': return <TitleInputs />;
      case 'Address': return <AddressInputs />;
      case 'Owner(Individual)': return <OwnerIndividualInputs />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs />;
      default: return <></>;
    }
  }
  return getContent();
};

export default WaInputs;
