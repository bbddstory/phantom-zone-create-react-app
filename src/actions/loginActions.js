import axios from 'axios';

import { TOGGLE_LOADER } from './uiActions';
// import { loadLatestAct } from './dataActions';
import { NODE_URL } from '../util/utils';

// Action types
export const LOGIN = 'LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_FRIENDS = 'SET_FRIENDS';

// Action creators
export function registerAct(form) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true, loaderTxt: 'Registering...' });

    axios.post(NODE_URL() + '/users/register', form).then(res => {
      if (res.status === 201) {
        dispatch({
          type: SET_TOKEN,
          token: res.data.token,
          email: form.email,
          user: form.firstName
        });
        dispatch({ type: TOGGLE_LOADER, status: false });

        window.location.hash = '#/main/home'
      }
    }).catch(err => console.log(err));
  }
}

export function loginAct(form) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true, loaderTxt: 'Signing in...' });

    axios.post(NODE_URL() + '/users/login', form).then(res => {
      if (res.status === 200) {
        dispatch({
          type: SET_TOKEN,
          token: res.data.token,
          email: form.email,
          user: res.data.user,
          friends: res.data.friends
        });
        dispatch({ type: TOGGLE_LOADER, status: false });

        document.cookie = "token=" + res.data.token;
        document.cookie = "email=" + form.email;
        document.cookie = "user=" + res.data.user;

        window.location.hash = '#/main/home'
      }
    }).catch(err => console.log(err));
  }
}

export function setTokenAct(token, email, user) {
  return (dispatch, getState) => {
    dispatch({ type: SET_TOKEN, token: token, email: email, user: user });
  }
}

export function friendsAct(token, email) {
  return (dispatch, getState) => {
    axios.post(NODE_URL() + '/users/friends', { token: token, email: email }).then(res => {
      if (res.status === 200) {
        dispatch({ type: SET_FRIENDS, friends: res.data.friends });
      }
    }).catch(err => console.log(err));
  }
}