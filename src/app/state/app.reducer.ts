import {ErrorCode} from '../shared';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as ErrorActions from './app.actions';

export interface ErrorState {
  error: string;
  errorCode: ErrorCode;
}

const initialState: ErrorState = {
  error: '',
  errorCode: ErrorCode.NONE
};

const getErrorState = createFeatureSelector<ErrorState>('error');

export const getError = createSelector(
  getErrorState,
  state => state.error
);


export const getErrorCode = createSelector(
  getErrorState,
  state => state.errorCode
);

export const errorReducer = createReducer<ErrorState>(
  initialState,
  on(ErrorActions.apiError, (state, action): ErrorState => {
    return {
      ...state,
      error: action.error,
      errorCode: action.errorCode
    };
  }),
  on(ErrorActions.clearError, (state, action): ErrorState => {
    return {
      ...state,
      error: '',
      errorCode: ErrorCode.NONE
    };
  }),
);
