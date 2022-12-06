import React, { useState } from 'react';
import styled from 'styled-components';

import Background from '@/components/Background';
import useToggle from '@/hooks/useToggle';
import DatepickerWithTime from '@/components/Datepicker/DatepickerWithTime';
import useModalWindow from '@/hooks/useModalWindow';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import CloseIcon from '@/assets/icons/CloseIcon';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { createNoticeAction, updateNoticeAction } from '@/store/actions/noticesActions';
import { userActions } from '@/store/actions/userActions';
import { PopupTypes } from '@/store/reducers/user';
import Loader from '@/components/Loader';
import { INotice } from '@/store/reducers/notices';
import { getCurrentTime } from '@/utils/times';

interface Props {
  close: Function,
  notice?: INotice
}

const NoticeModalWindow: React.FC<Props> = ({ close, notice }) => {
  const [subject, setSubject] = useInput(notice?.subject);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [message, setMessage] = useInput(notice?.message);
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const [isLoading, toggleIsLoading] = useToggle();

  const dispatch = useDispatch<any>();
  useModalWindow();

  const createNotice = async () => {
    if (subject && startDate && endDate && message) {
      try {
        toggleIsLoading(true);
        /*TODO: add manually selecting for isActive property*/
        if (notice?.id) {
          await dispatch(updateNoticeAction(notice.id, {
            subject,
            message,
            isActive: true
          }));
        } else {
          await dispatch(createNoticeAction({
            subject,
            startDate,
            endDate,
            message,
            isActive: true
          }));
        }
        toggleIsLoading(false);
        dispatch(userActions.setPopup({
          type: PopupTypes.SUCCESS,
          mainText: notice?.id ? 'Success update Notice' : 'Success add new Notice',
          additionalText: notice?.id ? 'Notice has been updated' : 'New notice has been added'
        }));
        close(false);
      } catch (e: any) {
        const message = notice?.id ? 'Failed to update notice' : 'Failed to add new notice';

        toggleIsLoading(false);
        dispatch(userActions.setPopup({
          type: PopupTypes.ERROR,
          mainText: 'Error',
          additionalText: `${message}. Error message: ${e.message}`
        }));
      }
    }
  };

  return (
    <Background close={() => close()}>
      <ModalWindow
        ref={(ref) => setModalRef(ref)}
        onClick={(evt) => evt.stopPropagation()}
      >
        <Header>
          <Title>
            {notice?.id ? 'Update Notice' : 'Add New Notice'}
          </Title>
          <CloseIcon onClick={() => close()} />
        </Header>
        <Input
          value={subject}
          onChange={setSubject}
          label="Subject"
          labelMarginBottom={12}
          placeholder="Maintenance"
          inputMarginBottom="0"
          inputFontSize="16px"
          style={{ height: '48px' }}
        />
        {modalRef ? (
          <>
            <DatepickerWithTime
              label="Start Time"
              setFunc={setStartDate}
              modalRef={modalRef}
              initialTime={notice?.startDate ? {
                ...getCurrentTime(notice.startDate),
                timestamp: notice.startDate
              } : undefined}
            />
            <DatepickerWithTime
              label="End Time"
              setFunc={setEndDate}
              modalRef={modalRef}
              initialTime={notice?.endDate ? {
                ...getCurrentTime(notice.endDate),
                timestamp: notice.endDate
              } : undefined}
              isEnd
            />
          </>
        ) : ''}
        <label>
          <Span>Message</Span>
          <Textarea
            value={message}
            placeholder="Input your message"
            onChange={setMessage}
          />
        </label>
        <Buttons>
          <StyledButton
            isCancel
            onClick={() => close()}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={createNotice}
            disabled={!subject || !startDate || !endDate || !message}
          >
            {isLoading
              ? <Loader size={24} thickness={2} color="#fff" />
              : notice?.id ? 'Save' : 'Send'}
          </StyledButton>
        </Buttons>
      </ModalWindow>
    </Background>
  );
};

const ModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  padding: 32px;
  width: 478px;
  border-radius: 16px;
  background-color: #fff;
  cursor: default;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 10px;
  
  svg {
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
`;

const Span = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  color: #6C7278;
  font-weight: 500;
`;

const Textarea = styled.textarea`
  padding: 16px 24px;
  width: 100%;
  min-height: 122px;
  border: 1px solid rgba(35,35,35,0.16);
  border-radius: 4px;
  resize: none;
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

export default NoticeModalWindow;
