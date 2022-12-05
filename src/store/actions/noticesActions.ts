import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { ICreateNotice, NoticesReducer } from '@/store/reducers/notices';

export const noticesActions = createActionCreators(NoticesReducer);

export type NoticesActions = ReturnType<typeof noticesActions.setNotices>;

export const createNoticeAction = (body: ICreateNotice): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const notices = getState().notices.notices || [];
    const notice = await mainApiProtected.createNotice(body);

    dispatch(noticesActions.setNotices([...notices, notice]));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getNoticesAction = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const notices = await mainApiProtected.getNotices();

    dispatch(noticesActions.setNotices(notices));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const deleteNoticeAction = (id: number): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const notices = getState().notices.notices || [];
    await mainApiProtected.deleteNotice(id);

    dispatch(noticesActions.setNotices(notices.filter((el) => el.id !== id)));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};
