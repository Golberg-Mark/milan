import PinIcon from '@/assets/icons/PinIcon';
import { IService } from '@/store/reducers/services';
import { ExistingRegions } from '@/utils/getRegionsData';
import React from 'react'
import styled, { css } from 'styled-components';

interface Props {
  service: IService,
  isPined: boolean,
  onPin: (productId: string, region: ExistingRegions, isPined: boolean) => void
  serviceOnClick: (productId: string, region: ExistingRegions) => void
}

const Service: React.FC<Props> = ({ service, isPined, onPin, serviceOnClick }) => {
  const handlOnPin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onPin(service.productId, service.region, isPined)
  }

  const handleServiceOnClick = () => {
    serviceOnClick(service.productId, service.region)
  }

  return (
    <ServiceStyled isPined={isPined} onClick={handleServiceOnClick}>
      <Text>{service.searchType}</Text>
      <IconWrap onClick={handlOnPin}>
        <PinIcon color={isPined ? '#ffffff' : '#ACB5BB'} />
      </IconWrap>
    </ServiceStyled>
  )
}

const Text = styled.div`
  color: var(--primary-dark-color);
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.03em;
`

const IconWrap = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ServiceStyled = styled.div<{ isPined: boolean }>`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
  cursor: pointer;
  border-radius: 4px;

  ${({ isPined }) => isPined && css`
    background-color: var(--primary-green-color);

    ${Text} {
      color: #FFFFFF;
    }
  `}
`

export default Service;