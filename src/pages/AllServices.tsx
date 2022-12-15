import GroupedService from '@/components/AllServices/GroupedService';
import Regions from '@/components/AllServices/Regions';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { AppDispatch } from '@/store';
import { servicesActions } from '@/store/actions/servicesActions';
import { selectPinedServices, selectServices } from '@/store/selectors/servicesSelector';
import { ExistingRegions } from '@/utils/getRegionsData';
import { groupBy } from '@/utils/groupBy';
import LocalStorage from '@/utils/localStorage';
import CloseIcon from '@/assets/icons/CloseIcon';
import useModalWindow from '@/hooks/useModalWindow';

export type IPinedServices = {
  [region in ExistingRegions]: string[]
}

const AllServices: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const services = useSelector(selectServices);
  const pinedServices = useSelector(selectPinedServices);

  const [selectedRegion, setSelectedRegion] = useState(ExistingRegions.NSW);
 
  useModalWindow()

  const setAllPinedServices = (pinedServices: IPinedServices) => {
    LocalStorage.setPinedServices(pinedServices)
    dispatch(servicesActions.setPinedServices(pinedServices))
  }

  const groupedServicesByRegion = useMemo(() => 
    groupBy(services, ({ region }) => region)
  , [services])

  const regionServices = useMemo(() => 
  groupedServicesByRegion[selectedRegion] || []
  , [selectedRegion, groupedServicesByRegion])

  const groupedServicesBySupplier = useMemo(() => 
    Object.entries(groupBy(regionServices, ({ supplier }) => supplier))
  , [regionServices])

  const allRegions = useMemo(() => 
    Object.values(ExistingRegions)
  , [])

  const changeRegion = (region: ExistingRegions) => {
    setSelectedRegion(region)
  }

  const handleOnPinService = (serviceId: string, region: ExistingRegions, isActive: boolean) => {
    const servicesByRegion = pinedServices[region] || []

    if (isActive) {
      const filteredServices = servicesByRegion.filter((pinedId) => pinedId !== serviceId)
      setAllPinedServices({ ...pinedServices, [region]: filteredServices})
      return;
    }

    setAllPinedServices({ ...pinedServices, [region]: [...servicesByRegion, serviceId]})
  }

  const handleOnClickService = (serviceId: string, region: ExistingRegions) => {
    navigate(`/new-order/${region}/${serviceId}`)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    dispatch(servicesActions.setServicesModal(false))
  }
  
  return(
    <AllServicesStyled>
      <IconWrap onClick={handleCloseModal}>
        <CloseIcon />
      </IconWrap>
      <Regions 
        selectedRegion={selectedRegion} 
        setSelectedRegions={changeRegion} 
        allRegions={allRegions} 
      />
      <GroupedServicesWrap>
        {groupedServicesBySupplier.map(([name, services]) => 
          <GroupedService 
            key={name}
            services={services}
            name={name}
            onPin={handleOnPinService}
            serviceOnClick={handleOnClickService} 
            pinedServices={pinedServices[selectedRegion] || []} 
          />
        )}
      </GroupedServicesWrap>
    </AllServicesStyled>
  )
}

const IconWrap = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`

const GroupedServicesWrap = styled.div`
  display: flex;
  column-gap: 16px;
  row-gap: 24px;
  flex-wrap: wrap;
`

const AllServicesStyled = styled.div`
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 32px;
  z-index: 10000;
  background-color: #F1EFE9;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`

export default AllServices