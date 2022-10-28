import React from 'react';

import getRegionsData from '@/utils/getRegionsData';
import TitleInputs from '@/components/AddOrder/QLD/TitleInputs';
import AddressInputs from '@/components/AddOrder/AddressInputs';
import OwnerIndividualInputs from '@/components/AddOrder/OwnerIndividualInputs';
import OwnerOrganisationInputs from '@/components/AddOrder/OwnerOrganisationInputs';
import PreviousTitleInputs from '@/components/AddOrder/QLD/PreviousTitleInputs';
import LotPlanInputs from '@/components/AddOrder/QLD/LotPlanInputs';

const currentRegion = getRegionsData().find((el) => el.region === 'QLD')!;

interface Props {
  selectedService: number
}

const QldInputs: React.FC<Props> = ({ selectedService }) => {
  const getContent = () => {
    switch (currentRegion.services[selectedService].name) {
      case 'Title Reference': return <TitleInputs />;
      case 'Address': return <AddressInputs region="QLD" />;
      case 'Owner(Individual)': return <OwnerIndividualInputs region="QLD" />;
      case 'Owner(Organisation)': return <OwnerOrganisationInputs region="QLD" />;
      case 'Previous Title Reference': return <PreviousTitleInputs />;
      case 'Lot/Plan': return <LotPlanInputs />;
      default: return <></>;
    }
  }
  return getContent();
};

export default QldInputs;
