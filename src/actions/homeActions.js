import axios from 'axios';

import { NODE_URL } from '../util/utils';

// Action types
export const LOAD_HOME_LISTS = 'LOAD_HOME_LISTS';
export const REMOVE_HOME_LIST_ITEM = 'REMOVE_HOME_LIST_ITEM';
export const LOAD_LATEST = 'LOAD_LATEST';
export const LOAD_WATCH_LATER = 'LOAD_WATCH_LATER';
export const LOAD_RECOMM = 'LOAD_RECOMM';

// Action creators
export function loadHomeListsAct() {
  return (dispatch, getState) => {
    axios.post(NODE_URL() + '/home/lists', {
      token: getState().loginReducer.token,
      email: getState().loginReducer.email
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: LOAD_HOME_LISTS, data: res.data });
      }
    }).catch(err => console.log(err));

    // axios.post(NODE_URL() + '/home/latest', {
    //   token: getState().loginReducer.token
    // }).then(res => {
    //   if (res.status === 200) {
    //     dispatch({ type: LOAD_LATEST, data: res.data });
    //   }
    // }).catch(err => console.log(err));

    // axios.post(NODE_URL() + '/home/watch_later', {
    //   token: getState().loginReducer.token,
    //   email: getState().loginReducer.email
    // }).then(res => {
    //   if (res.status === 200) {
    //     dispatch({ type: LOAD_WATCH_LATER, data: res.data });
    //   }
    // }).catch(err => console.log(err));

    // axios.post(NODE_URL() + '/home/recomm', {
    //   token: getState().loginReducer.token,
    //   email: getState().loginReducer.email
    // }).then(res => {
    //   if (res.status === 200) {
    //     dispatch({ type: LOAD_RECOMM, data: res.data });
    //   }
    // }).catch(err => console.log(err));
  }
}

export function removeHomeListItemAct(list, key) {
  return (dispatch, getState) => {
    axios.post(NODE_URL() + '/home/del_item', {
      token: getState().loginReducer.token,
      email: getState().loginReducer.email,
      key: key,
      list: list
    }).then(res => {
      if (res.status === 200) {
        dispatch({ type: REMOVE_HOME_LIST_ITEM, key: key, list: list });
      }
    }).catch(err => {
      console.log(err);
    });
  }
}