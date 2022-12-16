import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Background from '@/components/Background';
import useToggle, { HandleToggle } from '@/hooks/useToggle';
import PageTitle from '@/components/PageTitle';
import CloseIcon from '@/assets/icons/CloseIcon';
import useModalWindow from '@/hooks/useModalWindow';
import Select from '@/components/Select';
import {
  assignPriceListToOrganisationsAction,
  getAllPriceListsAction
} from '@/store/actions/priceListActions';
import Loader from '@/components/Loader';
import { selectPriceLists } from '@/store/selectors/priceListSelector';
import SingleDatepicker from '@/components/Datepicker/SingleDatepicker';
import Button from '@/components/Button';

interface Props {
  close: HandleToggle,
  orgIds: number[]
}

const AssignPriceList: React.FC<Props> = ({ close, orgIds }) => {
  const [priceList, setPriceList] = useState(0);
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const [date, setDate] = useState<number>();
  const [isInitialDate, toggleIsInitialDate] = useToggle(true);
  const [isLoading, toggleIsLoading] = useToggle();

  const priceLists = useSelector(selectPriceLists);
  const priceListsNames = priceLists?.map(el => el.name);

  const dispatch = useDispatch<any>();

  useModalWindow();

  useEffect(() => {
    dispatch(getAllPriceListsAction());
  }, []);

  const submit = async () => {
    if (date && priceLists) {
      try {
        toggleIsLoading(true);
        const preparedDate = isInitialDate ? Date.now() + 2 * 60000 : date;

        await dispatch(assignPriceListToOrganisationsAction(
          orgIds,
          priceLists[priceList].id,
          { effectiveFromDate: preparedDate }
        ));
        toggleIsLoading(false);
        close(false);
      } catch (e) {
        toggleIsLoading(false);
      }
    }
  };

  const setDateValue = (value: number, isInitial: boolean) => {
      setDate(value);
      toggleIsInitialDate(isInitial);
  };

  return (
    <Background close={close}>
      {priceListsNames ? (
        <Container
          ref={ref => setModalRef(ref)}
          onClick={(evt) => evt.stopPropagation()}
        >
          <Header>
            <PageTitle marginBottom="0">Assign Price List</PageTitle>
            <CloseIcon handler={close}/>
          </Header>
          {modalRef ? (
            <>
              <Label>
                <span>Assign Price List</span>
                <Select
                  selectedItem={priceList}
                  setSelectedItem={setPriceList}
                  items={priceListsNames}
                />
              </Label>
              <SingleDatepicker
                label="Effective From Date"
                setFunc={setDateValue}
                modalRef={modalRef}
              />
            </>
          ) : ''}
          <Buttons>
            <StyledButton
              isCancel
              onClick={close}
            >
              Cancel
            </StyledButton>
            <StyledButton
              onClick={submit}
            >
              {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Submit'}
            </StyledButton>
          </Buttons>
        </Container>
      ) : <Loader color="#fff" />}
    </Background>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  padding: 32px;
  width: 100%;
  max-width: 478px;
  border-radius: 16px;
  background-color: #fff;
  cursor: default;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 16px;
  
  svg {
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  span {
    font-weight: 500;
    color: #6B7280;
    white-space: nowrap;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 16px;
`;

const StyledButton = styled(Button)`
  height: 48px;
`;

export default AssignPriceList;
