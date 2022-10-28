import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import VolumeFolioInputs from '@/components/AddOrder/VolumeFolioInputs';
import AddressInputs from '@/components/AddOrder/NT/AddressInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'TAS')!;

interface Props {
  selectedService: number
}

const TasInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Volume/Folio': return <VolumeFolioInputs region="TAS" />;
      case 'Address': return <AddressInputs region="TAS" />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="TAS" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="TAS" />;
      default: return <></>;
    }
  }
  return getContent();
};

export default TasInputs;
