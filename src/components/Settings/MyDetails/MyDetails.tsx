import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import EditableInput from '@/components/EditableInput';
import useToggle from '@/hooks/useToggle';
import useInput from '@/hooks/useInput';

const MyDetails = () => {
  const [name, setName] = useInput();
  const [surname, setSurname] = useInput();
  const [isEditMode, toggleIsEditMode] = useToggle();

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
        </Grid>
      </div>
      <Buttons>
        <Button onClick={toggleIsEditMode}>
          Edit Details
        </Button>
        <Button>Change Password</Button>
      </Buttons>
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
