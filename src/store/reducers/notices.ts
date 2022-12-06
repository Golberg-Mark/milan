import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface ICreateNotice {
  subject: string,
  message: string,
  startDate: number,
  endDate: number,
  isActive: boolean
}

export interface IUpdateNotice {
  subject: string,
  message: string,
  isActive: boolean
}

export interface INotice extends ICreateNotice {
  id: number,
  createdAt: string
}

interface NoticesState {
  notices: INotice[] | null
}

const InitialState: NoticesState = {
  notices: null
};

export class NoticesReducer extends ImmerReducer<NoticesState> {
  public setNotices(value: INotice[] | null) {
    this.draftState.notices = value;
  }
}

export default createReducerFunction(NoticesReducer, InitialState);
