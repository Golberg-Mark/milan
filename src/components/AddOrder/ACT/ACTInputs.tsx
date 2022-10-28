import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import VolumeFolioInputs from '@/components/AddOrder/VolumeFolioInputs';
import AddressInputs from '@/components/AddOrder/ACT/AddressInputs';
import ParcelInputs from '@/components/AddOrder/ACT/ParcelInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'ACT')!;

interface Props {
  selectedService: number
}

const ActInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Volume/Folio': return <VolumeFolioInputs region="ACT" />;
      case 'Address': return <AddressInputs />;
      case 'Parcel': return <ParcelInputs />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="ACT" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="ACT" />;
      default: return <></>;
    }
  }
  return getContent();
};

export default ActInputs;
