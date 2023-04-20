import { ReducerModel } from "./models";

export enum ACTION_NAMES {
  setNum = "setNum",
}

export const reducer: ReducerModel = (state, action) => {
  let stateUpdated = false;
  switch(action.name) {
  case ACTION_NAMES.setNum:
    if(action.payload !== state.number) {
      state.number = action.payload;
      stateUpdated = true;
    } 
    break;
  }
  if(stateUpdated) {
    state.lastChange = new Date().getTime();
  }
  return {state,
    stateUpdated};
};