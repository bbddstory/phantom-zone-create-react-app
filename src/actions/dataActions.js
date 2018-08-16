import axios from 'axios';

import { NODE_URL } from '../util/utils';
import { TOGGLE_LOADER } from './uiActions';

// Action types
export const GOTO_PAGE = 'GOTO_PAGE';
export const SET_KEY = 'SET_KEY';
export const SYNC_CAT = 'SYNC_CAT';

// Action creators
export function setKeyAct(key) {
  return {
    type: SET_KEY,
    key
  }
}

export function syncCatAct() {
  return {
    type: SYNC_CAT
  }
}

export function loadDataAct(category, currPage, startAt, endAt) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true });

    axios.post(NODE_URL() + '/videos/load_cat', {
      token: getState().loginReducer.token,
      ipp: getState().dataReducer.ipp,
      category, currPage
    }).then(res => {
      if (res.status === 200) {
        let itemCnt = res.data.cnt;
        dispatch({ type: GOTO_PAGE, buffer: res.data.data, itemCnt, currPage, startAt, endAt });
        dispatch({ type: TOGGLE_LOADER, status: false });
      }
    }).catch(err => console.log(err));
  }
}