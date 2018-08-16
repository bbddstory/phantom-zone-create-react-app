import { GOTO_PAGE, SET_KEY, SYNC_CAT } from '../actions/dataActions';
import { SWITCH_CAT } from '../actions/categoriesActions';
import { SEARCH_RETURN } from '../actions/searchActions';
import { LOAD_HOME_LISTS, REMOVE_HOME_LIST_ITEM } from '../actions/homeActions';
import { LOAD_DETAILS, SAVE_COMMENT, DEL_COMMENT, SAVE_NEW, UPDATE_BUFFER_DETAILS } from '../actions/detailsActions';
import cats from '../util/cats';

let init = {
  key: '',
  buffer: {},
  search: {},
  // mainDetails: {},
  latest: {},
  watchLater: {},
  recomm: {},
  prevCat: cats.HOME,
  category: cats.HOME,
  itemCnt: 0, // Total number of records in designated category
  ipp: 20, // itemPerPage
  pageCnt: 1,
  currPage: 1,
  startAt: 0, // Start index of items on current page
  endAt: 11 // End index of items on current page
}

export function dataReducer(state = init, action) {
  let ns = (Object).assign({}, state);

  switch (action.type) {
    case LOAD_HOME_LISTS:
      ns.latest = action.data.data[0];
      ns.watchLater = action.data.data[1];
      ns.recomm = action.data.data[2];
      ns.prevCat = ns.category;

      return ns;
    case REMOVE_HOME_LIST_ITEM:
      delete ns[action.list][action.key];

      // let arr = [];

      // for (let i = 0; i < ns[action.list].length; i++) {
      //   if (ns[action.list][i].id !== action.key) {
      //     arr.push(ns[action.list][i])
      //   }
      // }
      // ns[action.list] = arr;

      return ns;
    case SWITCH_CAT:
      ns.category = action.cat;

      if (state.prevCat !== action.cat) { // Reset all pagination related values
        ns.itemCnt = 0;
        ns.pageCnt = 1;
        ns.currPage = 1;
        ns.startAt = 0;
        ns.endAt = 11;
      }

      return ns;
    case GOTO_PAGE:
      let bufferObj = {};

      for (let i = 0; i < action.buffer.length; i++) {
        bufferObj[action.buffer[i].id] = action.buffer[i]
      }
      ns.buffer = bufferObj;

      ns.itemCnt = action.itemCnt;
      ns.pageCnt = Math.ceil(action.itemCnt / init.ipp);
      ns.currPage = action.currPage;
      ns.startAt = action.startAt;
      ns.endAt = action.endAt;

      return ns;
    case SET_KEY:
      ns.key = action.key;

      return ns;
    case LOAD_DETAILS:
      ns[action.list + 'Details'] = action.details;

      return ns;
    case SYNC_CAT:
      ns.prevCat = ns.category;

      return ns;
    case SAVE_NEW:
      if (ns.category === action.arr[0]) {
        ns.buffer[action.arr[1]] = action.vc;
      }

      return ns;
    case UPDATE_BUFFER_DETAILS:
      if (action.isSearch) {
        ns.search[state.key] = action.vc
        if (ns.buffer[state.key]) {
          ns.buffer[state.key] = action.vc;
        }
      } else {
        ns.buffer[state.key] = action.vc;
      }

      return ns;
    case SAVE_COMMENT:
      let ck = Object.keys(action.values)[0];
      
      if (action.isSearch) {
        ns.search[state.key].comments[ck] = action.values[ck];
        if (ns.buffer[state.key]) {
          ns.buffer[state.key].comments[ck] = action.values[ck];
        }
      } else {
        ns.buffer[state.key].comments[ck] = action.values[ck];
      }

      return ns;
    case DEL_COMMENT:
      if (action.isSearch) {
        delete ns.search[state.key].comments[action.id];
        if (ns.buffer[state.key]) {
          delete ns.buffer[state.key].comments[action.id];
        }
      } else {
        delete ns.buffer[state.key].comments[action.id];
      }

      return ns;
    case SEARCH_RETURN:
      let searchObj = {};

      for (let i = 0; i < action.results.length; i++) {
        searchObj[action.results[i].id] = action.results[i]
      }
      ns.search = searchObj;

      return ns;
    default:
      return state;
  }
}