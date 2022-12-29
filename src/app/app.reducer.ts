
/*
export interface State {
  isLoading: boolean;
}

const initialState = {
  isLoading: false
}

export function appReducer(state = initialState, action){

  switch(action.type){
    case 'START_LOADING':
      return {
        isLoading: true
      };

    case 'STOP_LOADING':
      return {
        isLoading: false
      }

    default:
      return state;
  }

}
*/

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer'

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getisAuth = createSelector(getAuthState, fromAuth.getisAuthenticated)
