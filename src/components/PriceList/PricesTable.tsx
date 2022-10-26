import React from 'react';
import styled from 'styled-components';

const mockedPrice = [
  {
    collection: 'QLD Property',
    supplier: 'QLD Natural Resources, Mines and Energy',
    searchType: 'BUP/GTP Search Statement',
    description: '',
    productCode: 'DNRBUGTP',
    exGST: '4.30',
    GST: '0.43',
    inclGST: '4.73'
  }
]

const PricesTable = () => {
  return (
    <TableWrapper>
      <Table>
        <THead>
          <tr>
            <th>
              Collection
            </th>
            <th>
              Supplier
            </th>
            <th>
              Search Type
            </th>
            <th>
              Description
            </th>
            <th>
              Product Code
            </th>
            <th>
              Price ex GST
            </th>
            <th>
              GST
            </th>
            <th>
              Price incl GST
            </th>
          </tr>
        </THead>
        <TBody>
          {mockedPrice.map((item, i) => (
            <TRow key={item.productCode}>
              <th>
                {item.collection}
              </th>
              <th>
                {item.supplier}
              </th>
              <td>
                {item.searchType}
              </td>
              <td>
                {item.description}
              </td>
              <td>
                {item.productCode}
              </td>
              <th>
                ${item.exGST}
              </th>
              <th>
                ${item.GST}
              </th>
              <th>
                ${item.inclGST}
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
  background-color: rgb(249, 250, 251);
  
  th {
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    border-top: 1px solid rgb(229, 231, 235);
    
    :first-child {
      border-left: 1px solid rgb(229, 231, 235);
      border-top-left-radius: 8px;
    }
    
    :last-child {
      border-right: 1px solid rgb(229, 231, 235);
      border-top-right-radius: 8px;
    }
  }
`;

const TBody = styled.tbody`
  th, td {
    padding: 12px 24px;
    height: 70px;
    line-height: 1.25rem;
    background-color: #fff;
  }
  
  th {
    font-size: 14px;
    text-align: left;
    border-top: 1px solid rgb(229, 231, 235);

    :first-child {
      display: flex;
      align-items: center;
      border-left: 1px solid rgb(229, 231, 235);
    }

    :last-child {
      border-right: 1px solid rgb(229, 231, 235);
    }
    
    svg {
      width: .875rem;
      height: .875rem;
    }
  }

  td {
    font-size: 14px;
    text-align: left;
    color: #6B7280;
    border-top: 1px solid rgb(229, 231, 235);
  }
`;

const TRow = styled.tr`
  :hover td, :hover th {
    background-color: rgba(229, 231, 235, .01);
  }
  
  :last-child {
    th, td {
      border-bottom: 1px solid rgb(229, 231, 235);
    }

    th:first-child {
      border-left: 1px solid rgb(229, 231, 235);
      border-bottom-left-radius: 8px;
    }

    th:last-child {
      border-right: 1px solid rgb(229, 231, 235);
      border-bottom-right-radius: 8px;
    }
  }
`;

export default PricesTable;
