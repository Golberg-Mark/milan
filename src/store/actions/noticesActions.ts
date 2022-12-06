import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { ICreateNotice, IUpdateNotice, NoticesReducer } from '@/store/reducers/notices';

export const noticesActions = createActionCreators(NoticesReducer);

export type NoticesActions = ReturnType<typeof noticesActions.setNotices>
  | ReturnType<typeof noticesActions.setActiveNotices>;

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

export const getActiveNoticesAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const notices = await mainApi.getActiveNotices();

    dispatch(noticesActions.setActiveNotices(notices));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

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

export const updateNoticeAction = (id: number, body: IUpdateNotice): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const notices = getState().notices.notices!;
    const notice = await mainApiProtected.updateNotice(id, body);

    dispatch(noticesActions.setNotices(notices.map((el) => {
      return el.id === id ? notice : el;
    })));
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
