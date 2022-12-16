import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import EditableInput from '@/components/EditableInput';
import useToggle from '@/hooks/useToggle';
import useInput from '@/hooks/useInput';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/userSelectors';
import roleToText from '@/utils/roleToText';
import { ExistingRegions } from '@/utils/getRegionsData';

const regions = Object.values(ExistingRegions);

const MyDetails = () => {
  const [name, setName] = useInput();
  const [surname, setSurname] = useInput();
  const [email, setEmail] = useInput();
  const [phone, setPhone] = useInput();
  const [region, setRegion] = useState<number>();
  const [isEditMode, toggleIsEditMode] = useToggle();

  const user = useSelector(selectUser);

  useEffect(() => {
    setDefaultData();
  }, [user]);

  const setDefaultData = () => {
    if (user) {
      const regionIndex = regions.findIndex((el) => el.toLowerCase() === user.state.toLowerCase());

      setName(user.firstName || '');
      setSurname(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setRegion(regionIndex);
      toggleIsEditMode(false);
    }
  };

  const role = user ? roleToText(user.role) : '';

  return (
    <Page>
      <div>
        <H3>My Details</H3>
        <Grid>
          <EditableInput
            isEditMode={isEditMode}
            label="Name"
            value={name}
            setValue={setName}
            placeholder="John"
          />
          <EditableInput
            isEditMode={isEditMode}
            label="Surname"
            value={surname}
            setValue={setSurname}
            placeholder="Smith"
          />
          <EditableInput
            isEditMode={isEditMode}
            label="Email"
            value={email}
            setValue={setSurname}
            placeholder="john@gmail.com"
          />
          <EditableInput
            isEditMode={isEditMode}
            label="Phone"
            value={phone}
            setValue={setSurname}
            placeholder="123456789"
          />
          {region !== undefined ? (
            <EditableInput
              isEditMode={isEditMode}
              label="State"
              value={regions[region]}
              selector={{
                value: region,
                values: regions,
                setValue: setRegion
              }}
            />
          ) : ''}
          <EditableInput
            isEditMode={isEditMode}
            label="User Type"
            value={role}
            isLocked
          />
        </Grid>
      </div>
      {isEditMode ? (
        <Buttons>
          <Button
            isCancel
            onClick={setDefaultData}
          >
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button onClick={toggleIsEditMode}>
            Edit Details
          </Button>
          <Button>Change Password</Button>
        </Buttons>
      )}
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const H3 = styled.h3`
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 34px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 16px;
`;

export default MyDetails;
