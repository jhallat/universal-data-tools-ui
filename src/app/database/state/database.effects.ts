import {Injectable} from '@angular/core';
import {DatabaseService} from '../database.service';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import * as DatabaseActions from './database.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {failedApi} from '../../shared';

@Injectable()
export class DatabaseEffects {
  constructor(private action$: Actions,
              private databaseService: DatabaseService) {
  }

  loadDatabases$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DatabaseActions.loadDatabases),
      mergeMap(() => this.databaseService.getDatabases().pipe(
        map(data => DatabaseActions.loadDatabasesSuccess({databases: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  loadDataTypes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DatabaseActions.loadDataTypes),
      mergeMap(() => this.databaseService.getDataTypes().pipe(
        map(data => DatabaseActions.loadDataTypesSuccess({ dataTypes: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  loadTable$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DatabaseActions.loadTable),
      mergeMap((action) => this.databaseService.getTable(action.database, action.schema, action.table).pipe(
        map(data => DatabaseActions.loadTableSuccess({table: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  createTable$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DatabaseActions.createTable),
      mergeMap((action) => this.databaseService.createTable(action.table).pipe(
        map(data => DatabaseActions.createTableSuccess({ table: data, database: action.table.database})),
        catchError( error => failedApi(error))
      ))
    );
  });
}
