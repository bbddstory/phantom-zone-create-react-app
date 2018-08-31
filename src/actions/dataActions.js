import axios from 'axios';

import { NODE_URL } from '../util/utils';
import { TOGGLE_LOADER, TOGGLE_PAGES } from './uiActions';

import { resetPages } from '../util/utils';

// Action types
export const GOTO_PAGE = 'GOTO_PAGE';
export const SYNC_CAT = 'SYNC_CAT';
export const SWITCH_CAT = 'SWITCH_CAT';

// Action creators
export function switchCatAct(cat) {
  return {
    type: SWITCH_CAT,
    cat
  }
}

export function syncCatAct() {
  return {
    type: SYNC_CAT
  }
}

export function loadPageAct(category, currPage, startAt, endAt) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true });

    axios.post(NODE_URL() + '/videos/load_cat', {
      token: getState().loginReducer.token,
      ipp: getState().dataReducer.pages.ipp,
      category, currPage
    }).then(res => {
      if (res.status === 200) {
        let itemCnt = res.data.cnt;
        dispatch({ type: GOTO_PAGE, buffer: res.data.data, itemCnt, currPage, startAt, endAt });
        dispatch({ type: TOGGLE_LOADER, status: false });
        // Pause for a moment, or the UI may NOT have finished rendering
        // setTimeout(() => {
          dispatch({ type: TOGGLE_PAGES, status: true });
          resetPages();
        // }, 200);
      }
    }).catch(err => console.log(err));
  }
}