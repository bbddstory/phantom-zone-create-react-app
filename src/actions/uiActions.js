// Action types
export const LOCALE = 'LOCALE';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const TOGGLE_PAGES = 'TOGGLE_PAGES';
export const TOGGLE_EDIT_DETAILS = 'TOGGLE_EDIT_DETAILS';

// Action creators
export function switchLocaleAct(locale) {
  return {
    type: LOCALE,
    locale
  }
}

export function toggleEditDetailsAct(status, newRec) {
  return {
    type: TOGGLE_EDIT_DETAILS,
    status,
    newRec
  }
}

export function togglePagesAct(status) {
  return {
    type: TOGGLE_PAGES,
    status
  }
}