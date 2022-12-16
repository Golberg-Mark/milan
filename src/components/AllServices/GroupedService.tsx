import React from 'react';
import styled from 'styled-components';
import { IService } from '@/store/reducers/services';
import Service from './Service';
import { ExistingRegions } from '@/utils/getRegionsData';

interface Props {
  services: IService[];
  name: string;
  onPin: (productId: string, region: ExistingRegions, isPined: boolean) => void
  serviceOnClick: (productId: string, region: ExistingRegions) => void
  pinedServices: string[]
}

const GroupedService: React.FC<Props> = ({ name, services, serviceOnClick, onPin, pinedServices }) => {
  return (
    <GroupedServiceStyled>
      <Title>{name}</Title>
      <Line />
      <Services>
        {services.map((service) =>
          <Service
            key={service.productId}
            service={service}
            isPined={pinedServices.some((pinedService) => pinedService === service.productId)}
            onPin={onPin}
            serviceOnClick={serviceOnClick}
          />
        )}
      </Services>
    </GroupedServiceStyled>
  )
}

const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.03em;
  color: var(--primary-dark-color);
  padding: 0px 16px;
`

const Line = styled.div`
  border-bottom: 2px solid #DCE4E8;
`

const Services = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const GroupedServiceStyled = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  background: #FFFFFF;
  border-radius: 8px;
  width: 360px;
  height: fit-content;
`

export default GroupedService
