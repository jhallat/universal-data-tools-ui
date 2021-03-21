import * as AppActions from '../state/app.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

export enum ErrorCode {
  NONE,
  UNASSIGNED,
  NO_CONNECTION
}

export const failedApi = (err: HttpErrorResponse) => {
  let errorCode = ErrorCode.UNASSIGNED;
  if (err.message.indexOf('401') > 1) {
    errorCode = ErrorCode.NO_CONNECTION;
  }
  return of(AppActions.apiError( { error: err.message, errorCode }));
};

export const successApi = () => {
  return of(AppActions.clearError());
};
