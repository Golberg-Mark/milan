import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import VolumeFolioInputs from '@/components/AddOrder/VolumeFolioInputs';
import AddressInputs from '@/components/AddOrder/VIC/AddressInputs';
import LotPlanOrListInputs from '@/components/AddOrder/VIC/LotPlanOrListInputs';
import CrownDescriptionInputs from '@/components/AddOrder/VIC/CrownDescriptionInputs';
import CouncilNumberInputs from '@/components/AddOrder/VIC/CouncilNumberInputs';
import SpiInputs from '@/components/AddOrder/VIC/SPIInputs';
import ApplicationIndexInputs from '@/components/AddOrder/VIC/ApplicationIndexInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'VIC')!;

interface Props {
  selectedService: number
}

const VicInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Volume/Folio': return <VolumeFolioInputs region="VIC" placeholder="8555/407" />;
      case 'Address': return <AddressInputs />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="VIC" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="VIC" />;
      case 'Lot/Plan or List': return <LotPlanOrListInputs />;
      case 'Crown Description': return <CrownDescriptionInputs />;
      case 'Council Number': return <CouncilNumberInputs />;
      case 'SPI': return <SpiInputs />;
      case 'Application Index': return <ApplicationIndexInputs />;
      default: return <></>;
    }
  }
  return getContent();
};

export default VicInputs;
