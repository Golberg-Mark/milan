import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import TitleInputs from '@/components/AddOrder/NSW/TitleInputs';
import AddressInputs from '@/components/AddOrder/AddressInputs';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'NSW')!;

interface Props {
  selectedService: number
}

const NswInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Title Reference': return <TitleInputs />;
      case 'Address': return <AddressInputs region='NSW' />;
      case 'Owner(Individual)': return <OwnerIndividualInputs />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs />;
      default: return <></>;
    }
  }
  return getContent();
};

export default NswInputs;
