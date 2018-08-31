import { LOCALE, TOGGLE_LOADER, TOGGLE_PAGES, TOGGLE_EDIT_DETAILS, SWITCH_VIEW } from '../actions/uiActions';

let init = {
  locale: 'en',
  showLoader: false,
  tglPages: false,
  loaderTxt: '',
  loading: true,
  editDetails: false,
  newRec: false,
  view: 'card'
}

export function uiReducer(state = init, action) {
  let ns = (Object).assign({}, state);

  switch (action.type) {
    case LOCALE:
      ns.locale = action.locale;

      return ns;
    case TOGGLE_LOADER:
      ns.showLoader = action.status;
      ns.loaderTxt = action.loaderTxt || 'Loading data...';
      ns.loading = action.hasOwnProperty('loading') ? action.loading : true;

      return ns;
    case TOGGLE_PAGES:
      ns.tglPages = action.status;

      return ns;
    case TOGGLE_EDIT_DETAILS:
      ns.editDetails = action.status;
      ns.newRec = action.newRec;
      
      return ns;
    case SWITCH_VIEW:
      if (ns.view === 'card') {
        ns.view = 'tile'
      } else {
        ns.view = 'card'
      }
      
      return ns;
    default:
      return state;
  }
}