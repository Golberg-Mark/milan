import React, { useState } from 'react';
import styled from 'styled-components';

import Background from '@/components/Background';
import PageTitle from '@/components/PageTitle';
import { HandleToggle } from '@/hooks/useToggle';
import Input from '@/components/Input';
import CloseIcon from '@/assets/icons/CloseIcon';
import useModalWindow from '@/hooks/useModalWindow';
import Select from '@/components/Select';
import useInput from '@/hooks/useInput';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganisationAction, organisationsActions } from '@/store/actions/organisationsActions';
import Loader from '@/components/Loader';
import { selectIsLoading } from '@/store/selectors/organisationsSelector';

interface Props {
  close: HandleToggle
}

const accountTypes = ['Type 1', 'Type 2'];
const billingMethods = ['Method 1', 'Method 2'];
const businessTypes = ['Business Type 1', 'Business Type 2'];
const billingCycles = ['Cycle 1', 'Cycle 2'];
const states = ['WA', 'QLD', 'NSW', 'VIC', 'SA', 'ACT', 'NT', 'TAS'];

const CreateOrganisation: React.FC<Props> = ({ close }) => {
  const [name, setName] = useInput();
  const [accountType, setAccountType] = useState(0);
  const [email, setEmail] = useInput();
  const [phoneNumber, setPhoneNumber] = useInput();
  const [financeEmail, setFinanceEmail] = useInput();
  const [fax, setFax] = useInput();
  const [billingMethod, setBillingMethod] = useState(0);
  const [billingCycle, setBillingCycle] = useState(0);
  const [businessType, setBusinessType] = useState(0);
  const [unit, setUnit] = useInput();
  const [number, setNumber] = useInput();
  const [street, setStreet] = useInput();
  const [suburb, setSuburb] = useInput();
  const [state, setState] = useState(0);
  const [postcode, setPostcode] = useInput();

  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch<any>();

  useModalWindow();

  const create = async () => {
    if (name) {
      try {
        dispatch(organisationsActions.setIsLoading(true));
        await dispatch(createOrganisationAction({
          name
        }));
        close(false);
      } catch {
        dispatch(organisationsActions.setIsLoading(false));
      }
    }
  };

  return (
    <Background close={close}>
      <ModalWindow onClick={(evt) => evt.stopPropagation()}>
        <Header>
          <PageTitle marginBottom="0">
            Add New Organisation
          </PageTitle>
          <StyledCloseIcon handler={close} />
        </Header>
        <InputsContainer>
          <MainInputs>
            <Input
              label="Organisation Name"
              labelMarginBottom={12}
              placeholder="Name"
              value={name}
              onChange={setName}
              inputMarginBottom="0"
            />
            <Label>
              <span>Account Type</span>
              <Select
                selectedItem={accountType}
                setSelectedItem={setAccountType}
                items={accountTypes}
              />
            </Label>
            <Input
              label="Email"
              labelMarginBottom={12}
              placeholder="Email"
              value={email}
              onChange={setEmail}
              inputMarginBottom="0"
            />
            <Input
              label="Phone Number"
              labelMarginBottom={12}
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputMarginBottom="0"
            />
            <Input
              label="Finance Email"
              labelMarginBottom={12}
              placeholder="Email"
              value={financeEmail}
              onChange={setFinanceEmail}
              inputMarginBottom="0"
            />
            <Input
              label="Fax"
              labelMarginBottom={12}
              placeholder="Fax"
              value={fax}
              onChange={setFax}
              inputMarginBottom="0"
            />
            <Label>
              <span>Billing Method</span>
              <Select
                selectedItem={billingMethod}
                setSelectedItem={setBillingMethod}
                items={billingMethods}
              />
            </Label>
            <Label>
              <span>Billing Cycle</span>
              <Select
                selectedItem={billingCycle}
                setSelectedItem={setBillingCycle}
                items={billingCycles}
              />
            </Label>
            <Label>
              <span>Type Of Business</span>
              <Select
                selectedItem={businessType}
                setSelectedItem={setBusinessType}
                items={businessTypes}
              />
            </Label>
          </MainInputs>
          <SubTitle>
            Address
          </SubTitle>
          <AddressInputs>
            <Input
              label="Flat/unit"
              labelMarginBottom={12}
              placeholder="Flat/unit"
              value={unit}
              onChange={setUnit}
              inputMarginBottom="0"
            />
            <Input
              label="Number"
              labelMarginBottom={12}
              placeholder="Number"
              value={number}
              onChange={setNumber}
              inputMarginBottom="0"
            />
            <Input
              label="Street"
              labelMarginBottom={12}
              placeholder="Street"
              value={street}
              onChange={setStreet}
              inputMarginBottom="0"
            />
            <Input
              label="Suburb"
              labelMarginBottom={12}
              placeholder="Suburb"
              value={suburb}
              onChange={setSuburb}
              inputMarginBottom="0"
            />
            <Label>
              <span>State</span>
              <Select
                selectedItem={state}
                setSelectedItem={setState}
                items={states}
                openToTop
              />
            </Label>
            <Input
              label="Postcode"
              labelMarginBottom={12}
              placeholder="Postcode"
              value={postcode}
              onChange={setPostcode}
              inputMarginBottom="0"
            />
          </AddressInputs>
        </InputsContainer>
        <Buttons>
          <Button
            onClick={close}
            isCancel
          >
            Cancel
          </Button>
          <Button
            onClick={create}
          >
            {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Create'}
          </Button>
        </Buttons>
      </ModalWindow>
    </Background>
  );
};

const ModalWindow = styled.div`
  display: grid;
  grid-template-rows: auto minmax(50px, 1fr) auto;
  padding: 32px;
  width: 100%;
  max-width: 660px;
  max-height: 90vh;
  min-height: 600px;
  border-radius: 16px;
  background-color: #fff;
  cursor: default;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 10px;
  margin-bottom: 32px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const InputsContainer = styled.div`
  margin-bottom: 32px;
  overflow-y: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  
  ::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;

const MainInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-end: 2;
  grid-gap: 32px 18px;
  margin-bottom: 32px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  span {
    color: #6C7278;
    font-weight: 500;
    white-space: nowrap;
  }
  
  :last-child {
    grid-column: span 2;
  }
`;

const SubTitle = styled.h4`
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 500;
`;

const AddressInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px 18px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 16px;
`;

export default CreateOrganisation;
