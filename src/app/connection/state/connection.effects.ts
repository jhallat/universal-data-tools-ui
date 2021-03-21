import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {failedApi, successApi} from 'src/app/shared';
import {ConnectionDefinition, ConnectionToken, ConnectionType} from '../connection';
import {ConnectionService} from '../connection.service';
import * as ConnectionActions from './connection.actions';


@Injectable()
export class ConnectionEffects {

  constructor(private action$: Actions,
              private connectionService: ConnectionService) {
  }

  loadConnectionTypes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.loadConnectionTypes),
      mergeMap((action) => this.connectionService.getConnectionTypes().pipe(
        map(data => ConnectionActions.loadConnectionTypesSuccess({connectionTypes: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  loadConnections$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.loadConnectionTypes),
      mergeMap((action) => this.connectionService.getConnections().pipe(
        map(data => ConnectionActions.loadConnectionsSuccess( { connectionDefinitions: data} )),
        catchError(error => failedApi(error))
      ))
    );
  });

  addConnection$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.addConnection),
      concatMap((action) => this.connectionService.addConnection(action.connection).pipe(
        map(data => ConnectionActions.addConnectionSuccess({connection: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  connect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.connect),
      switchMap((action) => this.connectionService.connect(action.connectionId).pipe(
        map(data => ConnectionActions.connectSuccess({connectionToken: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  disconnect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.disconnect),
      map((action) => {
        this.connectionService.disconnect();
        return ConnectionActions.disconnectSuccess();
      })
    );
  });

  successApi$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ConnectionActions.addConnectionSuccess,
        ConnectionActions.connectSuccess,
        ConnectionActions.loadConnectionsSuccess,
        ConnectionActions.loadConnectionTypesSuccess),
      concatMap(() => successApi())
    );
  });
}
