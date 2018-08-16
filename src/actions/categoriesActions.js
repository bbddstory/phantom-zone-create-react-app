// Action types
export const SWITCH_CAT = 'SWITCH_CAT';

// Action creators
export function switchCatAct(cat) {
  return {
    type: SWITCH_CAT,
    cat
  }
}