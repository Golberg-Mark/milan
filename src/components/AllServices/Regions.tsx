import { ExistingRegions } from '@/utils/getRegionsData'
import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  selectedRegion: ExistingRegions,
  setSelectedRegions: (region: ExistingRegions) => void
  allRegions: ExistingRegions[]
}

const Regions: React.FC<Props> = ({ 
  selectedRegion,
  setSelectedRegions,
  allRegions 
}) => {
  const handleOnClick = (region: ExistingRegions) => () => {
    setSelectedRegions(region)
  }

  return (
    <RegionsStyled>
      {allRegions.map(( region ) => 
        <Region 
          key={region}
          isActive={region === selectedRegion} 
          onClick={handleOnClick(region)}
        >
          {region}
        </Region>
      )}
    </RegionsStyled>
  )
}

const Region = styled.div<{ isActive: boolean }>`
  padding: 12px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.03em;
  border-radius: 4px;
  color: #ACB5BB;
  cursor: pointer;

  ${({ isActive }) => isActive && css`
    background-color: var(--primary-green-color);
    color: #FFFFFF;
  `}
`

const RegionsStyled = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 8px;
  width: fit-content;
`

export default Regions