import React from 'react';

import { existingRegions } from '@/utils/getRegionsData';
import WaInputs from '@/components/AddOrder/WA/WAInputs';
import QldInputs from '@/components/AddOrder/QLD/QLDInputs';
import NswInputs from '@/components/AddOrder/NSW/NSWInputs';
import VicInputs from '@/components/AddOrder/VIC/VICInputs';
import SAInputs from '@/components/AddOrder/SA/SAInputs';
import ActInputs from '@/components/AddOrder/ACT/ACTInputs';
import TasInputs from '@/components/AddOrder/TAS/TASInputs';
import NtInputs from '@/components/AddOrder/NT/NTInputs';

export interface Input {
  name?: string,
  example?: string,
  items?: string[],
  isRequired?: boolean
}

interface Product {
  productId: number,
  name: string,
  price: string
}

export interface Service {
  name: string,
  input: Input[],
  price: number,
  products?: Product[]
}

interface Props {
  regionName: existingRegions,
  selectedService: number
}

const RegionsServices: React.FC<Props> = ({ regionName, selectedService }) => {
  const getContent = () => {
    switch (regionName) {
      case 'ALL': return <WaInputs selectedService={selectedService} />;
      case 'WA': return <WaInputs selectedService={selectedService} />;
      case 'QLD': return <QldInputs selectedService={selectedService} />;
      case 'NSW': return <NswInputs selectedService={selectedService} />;
      case 'VIC': return <VicInputs selectedService={selectedService} />;
      case 'SA': return <SAInputs selectedService={selectedService} />;
      case 'ACT': return <ActInputs selectedService={selectedService} />;
      case 'NT': return <NtInputs selectedService={selectedService} />;
      case 'TAS': return <TasInputs selectedService={selectedService} />;
      default: return <></>;
    }
  }

  return getContent();
};

export default RegionsServices;
