import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineCloudDownload, IoDocumentTextOutline } from 'react-icons/all';

import { getOrderDetailsAction, userActions } from '@/store/actions/userActions';
import { selectOrderDetails } from '@/store/selectors/userSelectors';

import Loader from '@/components/Loader';
import PageTitle from '@/components/PageTitle';
import convertTimestamp from '@/utils/convertTimestamp';

const OrderDetails = () => {
  const order = useSelector(selectOrderDetails);

  const { id } = useParams();
  const dispatch = useDispatch<any>();

  useEffect(() => () => {
    dispatch(userActions.setOrderDetails(null));
  }, []);

  useEffect(() => {
    if (id) dispatch(getOrderDetailsAction(id));
  }, [id]);

  return order ? (
    <StyledOrderDetails>
      <PageTitle marginBottom="2rem">
        Order Details
      </PageTitle>
      <SubTitle>Details:</SubTitle>
      <Detail>
        <span>Matter: </span>
        {order.matter}
      </Detail>
      <Detail>
        <span>Description: </span>
        {order.description}
      </Detail>
      <Detail>
        <span>Status: </span>
        {order.status}
      </Detail>
      <Detail>
        <span>Service: </span>
        {order.service}
      </Detail>
      <Detail>
        <span>Created At: </span>
        {convertTimestamp(+order.createdAt)}
      </Detail>
      <Detail>
        <span>Completed At: </span>
        {convertTimestamp(+order.updatedAt)}
      </Detail>
      <Detail style={{ marginBottom: '2rem' }}>
        <span>Total Price: </span>
        {order.totalPrice}
      </Detail>
      <SubTitle>Your Products:</SubTitle>
      <ul>
        {order.orderItems.map(({ itemBody }, i) => (
          <Li key={i}>
            <span>{itemBody.name || itemBody.idNumber}</span>
            <DownloadSide>
              ${Number(itemBody.price).toFixed(2)}
              <IconWrapper>
                {itemBody.link ? (
                  <FileIcon />
                ) : ''}
              </IconWrapper>
              <IconWrapper>
                {itemBody.link ? (
                  <DownloadIcon />
                ) : ''}
              </IconWrapper>
            </DownloadSide>
          </Li>
        ))}
      </ul>
    </StyledOrderDetails>
  ) : <Loader />;
};

const StyledOrderDetails = styled.div`
  padding: 2.5rem 1.5rem;
`;

const SubTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`

const Detail = styled.p`
  margin-bottom: .25rem;
  color: rgba(0, 0, 0, .7);
  
  span {
    color: rgba(0, 0, 0, .8);
    font-weight: 600;
  }
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  
  :not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  
  span {
    font-weight: 600;
  }
`;

const DownloadSide = styled.div`
  display: flex;
  align-items: center;
  grid-gap: .5rem;
`;

const IconWrapper = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  
  svg {
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
  }
`;

const DownloadIcon = styled(AiOutlineCloudDownload)`
  :hover * {
    fill: var(--primary-blue-color);
  }
`;

const FileIcon = styled(IoDocumentTextOutline)`
  :hover * {
    stroke: var(--primary-blue-color);
  }
`;

export default OrderDetails;
