import React from 'react';
import styled from 'styled-components';

import { Product } from '@/store/reducers/user';

interface Props {
  priceList: Product[]
}

const PricesTable: React.FC<Props> = ({ priceList }) => {
  return (
    <TableWrapper>
      <Table>
        <THead>
          <tr>
            <th>
              Supplier
            </th>
            <th>
              Product Code
            </th>
            <th>
              Service
            </th>
            <th>
              TOTAL (ex. GST)
            </th>
            <th>
              GST
            </th>
            <th>
              TOTAL (inc. GST)
            </th>
          </tr>
        </THead>
        <TBody>
          {priceList.map((item) => (
            <TRow key={item['productCode']}>
              <th>
                {item.supplier}
              </th>
              <th>
                {item.productCode}
              </th>
              <th>
                {item.searchType}
              </th>
              <th>
                ${item.priceExGST}
              </th>
              <th>
                ${item.GST}
              </th>
              <th>
                ${item.priceInclGST}
              </th>
            </TRow>
          ))}
        </TBody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
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
      padding-left: 18px;
      border-top-left-radius: 4px;
    }

    :last-child {
      border-top-right-radius: 4px;
    }
  }
`;

const TBody = styled.tbody`
  th {
    height: 64px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }
`;

const TRow = styled.tr`
  cursor: pointer;

  th {
    padding-right: 25px;
    max-width: 300px;
    background-color: #fff;
    white-space: normal;

    :first-child {
      padding-left: 18px;
    }
  }

  :hover th {
    background-color: #F9F9F9;
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

export default PricesTable;
