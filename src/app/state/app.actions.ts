import {createAction, props} from '@ngrx/store';
import {ErrorCode} from '../shared';

// TODO Possibly move to the shared folder ??
export const apiError = createAction(
  '[Application API] API Error',
  props<{ error: string, errorCode: ErrorCode }>()
);

export const clearError = createAction(
  '[Application API] Clear API Error',
);
