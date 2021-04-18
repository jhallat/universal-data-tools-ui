import { createAction, props } from '@ngrx/store';
import {DatabaseDef, TableDef} from '../database';

export const loadDatabases = createAction(
  '[Database Page] Load Databases'
);

export const loadDatabasesSuccess = createAction(
  '[Database API] Load Databases Success',
  props<{ databases: DatabaseDef[]}>()
);

export const loadTable = createAction(
  '[Database Page] Load Table',
  props<{ schema: string, table: string }>()
);

export const loadTableSuccess = createAction(
  '[Database API] Load Table Success',
  props<{ table: TableDef}>()
);
