import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import VolumeFolioInputs from '@/components/AddOrder/SA/VolumeFolioInputs';
import AddressInputs from '@/components/AddOrder/SA/AddressInputs';
import PlanParcelInputs from '@/components/AddOrder/SA/PlanParcelInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'SA')!;

interface Props {
  selectedService: number
}

const VicInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Volume/Folio': return <VolumeFolioInputs />;
      case 'Address': return <AddressInputs />;
      case 'Plan/Parcel': return <PlanParcelInputs />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="SA" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="SA" />;
      default: return <></>;
    }
  }
  return getContent();
};

export default VicInputs;
