import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import VolumeFolioInputs from '@/components/AddOrder/VolumeFolioInputs';
import AddressInputs from '@/components/AddOrder/NT/AddressInputs';
import LotTownInputs from '@/components/AddOrder/NT/LotTownInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'NT')!;

interface Props {
  selectedService: number
}

const NtInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Volume/Folio': return <VolumeFolioInputs region="NT" />;
      case 'Address': return <AddressInputs />;
      case 'Lot/Town': return <LotTownInputs />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="NT" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="NT" />;
      default: return <></>;
    }
  }
  return getContent();
};

export default NtInputs;
