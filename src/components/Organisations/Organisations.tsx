import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { selectOrganisations } from '@/store/selectors/organisationsSelector';
import { getOrganisationsAction } from '@/store/actions/organisationsActions';
import Loader from '@/components/Loader';
import PageTitle from '@/components/PageTitle';
import AddIcon from '@/assets/icons/AddIcon';
import Checkbox from '@/components/Checkbox';
import convertTimestamp from '@/utils/convertTimestamp';
import Button from '@/components/Button';
import useToggle from '@/hooks/useToggle';

const Organisations = () => {
  const [isAllCheckboxSelected, toggleIsAllCheckboxSelected] = useToggle();
  const [selectedOrganisations, setSelectedOrganisations] = useState<number[]>([]);

  const organisations = useSelector(selectOrganisations);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!organisations) dispatch(getOrganisationsAction());
  }, []);

  const onCheckboxClick = (isChecked: boolean, id: number) => {
    setSelectedOrganisations(prevState => {
      if (!isChecked) return prevState.filter(el => el !== id);
      return [...prevState, id];
    });
    toggleIsAllCheckboxSelected(false);
  };

  return organisations ? (
    <>
      <PageHeader>
        <div>
          <PageTitle marginBottom="16px">
            Organisations
          </PageTitle>
          <p>Manage Organisations in this page</p>
        </div>
        <NewOrganisation>
          <AddIcon />
          New Organisation
        </NewOrganisation>
      </PageHeader>
      <Content>
        <TableWrapper>
          <Table>
            <THead>
              <tr>
                <th>
                  <Checkbox />
                </th>
                <th>
                  ORGANISATION
                </th>
                <th>
                  LAST ORDER
                </th>
                <th>
                  STATUS
                </th>
                <th>
                  PRICE LIST
                </th>
                <th>
                  NEW PRICE LIST
                </th>
                <th>
                  EFFECTIVE FROM DATE
                </th>
                <th>
                  PAYMENT TERMS
                </th>
                <th>
                  ACTIONS
                </th>
              </tr>
            </THead>
            <TBody>
              {organisations.map((org) => (
                <TRow
                  key={org.name}
                  isChecked={!!selectedOrganisations.find((el) => el === org.id)}
                  onClick={() => navigate(`/organisations/${org.id}`)}
                >
                  <th>
                    <Checkbox
                      type="checkbox"
                      checked={!!selectedOrganisations.find((el) => el === org.id)}
                      onChange={({ target }) => onCheckboxClick(target.checked, org.id)}
                    />
                  </th>
                  <th>
                    {org.name}
                  </th>
                  <th>
                    {org.lastOrderDate ? convertTimestamp(+org.lastOrderDate) : '-'}
                  </th>
                  <th>
                    <StatusCell isActive={org.isActive}>
                      {org.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </StatusCell>
                  </th>
                  <th>
                    {org.priceLists[0]?.name.split('.').slice(0, -1).join('.') || '-'}
                  </th>
                  <th>
                    {org.priceLists[1]?.name.split('.').slice(0, -1).join('.') || '-'}
                  </th>
                  <th>
                    {org.priceLists[1]?.effectiveFromDate || '-'}
                  </th>
                  <th>
                    {org.paymentTerms}
                  </th>
                  <th onClick={(evt) => evt.stopPropagation()}>
                    <Action>
                      <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2602 8.62627C13.2869 8.42627 13.3002 8.21961 13.3002 7.99961C13.3002 7.78628 13.2869 7.57294 13.2536 7.37294L14.6069 6.31961C14.7269 6.22628 14.7602 6.04628 14.6869 5.91294L13.4069 3.69961C13.3269 3.55294 13.1602 3.50628 13.0136 3.55294L11.4202 4.19294C11.0869 3.93961 10.7336 3.72628 10.3402 3.56628L10.1002 1.87294C10.0736 1.71294 9.94024 1.59961 9.78024 1.59961H7.22024C7.06024 1.59961 6.93357 1.71294 6.9069 1.87294L6.6669 3.56628C6.27357 3.72628 5.91357 3.94628 5.5869 4.19294L3.99357 3.55294C3.8469 3.49961 3.68024 3.55294 3.60024 3.69961L2.3269 5.91294C2.2469 6.05294 2.27357 6.22628 2.4069 6.31961L3.76024 7.37294C3.7269 7.57294 3.70024 7.79294 3.70024 7.99961C3.70024 8.20628 3.71357 8.42627 3.7469 8.62627L2.39357 9.67961C2.27357 9.77294 2.24024 9.95294 2.31357 10.0863L3.59357 12.2996C3.67357 12.4463 3.84024 12.4929 3.9869 12.4463L5.58024 11.8063C5.91357 12.0596 6.2669 12.2729 6.66024 12.4329L6.90024 14.1263C6.93357 14.2863 7.06024 14.3996 7.22024 14.3996H9.78024C9.94024 14.3996 10.0736 14.2863 10.0936 14.1263L10.3336 12.4329C10.7269 12.2729 11.0869 12.0596 11.4136 11.8063L13.0069 12.4463C13.1536 12.4996 13.3202 12.4463 13.4002 12.2996L14.6802 10.0863C14.7602 9.93961 14.7269 9.77294 14.6002 9.67961L13.2602 8.62627ZM8.50024 10.3996C7.18024 10.3996 6.10024 9.31961 6.10024 7.99961C6.10024 6.67961 7.18024 5.59961 8.50024 5.59961C9.82024 5.59961 10.9002 6.67961 10.9002 7.99961C10.9002 9.31961 9.82024 10.3996 8.50024 10.3996Z" fill="#1A1C1E"/>
                      </svg>
                    </Action>
                  </th>
                </TRow>
              ))}
            </TBody>
          </Table>
        </TableWrapper>
      </Content>
    </>
  ) : <Loader />;
};

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 32px 32px;
  border-bottom: 1px solid rgba(26, 28, 30, 0.16);

  p {
    color: rgba(17, 24, 39, 0.7);
  }
`;

const NewOrganisation = styled(Button)`
  grid-gap: 8px;
  height: 50px;
`;

const Content = styled.div`
  padding: 0 32px;
`;

const TableWrapper = styled.div`
  margin-bottom: 1rem;
  overflow-x: auto;
`;

const Table = styled.table`
  display: table;
  width: 100%;
  border-spacing: 0;
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;
  
  * {
    white-space: nowrap;
  }
`;

const THead = styled.thead`
  background-color: #F9F9F9;

  th {
    padding: 12px 35px 12px 0;
    font-size: 12px;
    font-weight: 400;
    color: rgba(17, 24, 39, 0.5);
    text-transform: uppercase;
    text-align: left;

    :first-child {
      padding: 12px;
      border-top-left-radius: 4px;
    }

    :last-child {
      border-top-right-radius: 4px;
    }
`;

const TBody = styled.tbody`
  th {
    padding: 14px 35px 14px 0;
    max-width: 200px;
    height: 64px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    white-space: normal;

    :first-child {
      padding-left: 12px;
    }
  }
`;

const TRow = styled.tr<{ isChecked: boolean }>`
  cursor: pointer;

  th {
    background-color: ${({ isChecked }) => isChecked ? '#E8F6FA' : '#fff'};
  }

  :hover th {
    background-color: ${({ isChecked }) => isChecked ? '#E8F6FA' : '#F9F9F9'};
  }

  :last-child {
    th:first-child {
      border-bottom-left-radius: 4px;
    }

    th:last-child {
      border-bottom-right-radius: 4px;
    }
  }
`;

const StatusCell = styled.span<{ isActive: boolean }>`
  display: block;
  padding: 4px 6px;
  width: fit-content;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  background-color: ${({ isActive }) => isActive ? 'var(--primary-green-background-color)' : 'var(--primary-red-background-color)'};
  color: ${({ isActive }) => isActive ? 'var(--primary-green-color)' : 'var(--primary-red-color)'};
`;

const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: #F1EFE9;
  
  :hover {
    background-color: #E1DFD9;
  }
`;

export default Organisations;
