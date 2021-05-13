import { createAction, props } from '@ngrx/store';
import {DatabaseDef, TableDef, CreateTableDef, DataTypeDef} from '../database';

export const loadDatabases = createAction(
  '[Database Page] Load Databases'
);

export const loadDatabasesSuccess = createAction(
  '[Database API] Load Databases Success',
  props<{ databases: DatabaseDef[]}>()
);

export const loadTable = createAction(
  '[Database Page] Load Table',
  props<{ database: string, schema: string, table: string }>()
);

export const loadTableSuccess = createAction(
  '[Database API] Load Table Success',
  props<{ table: TableDef}>()
);

export const loadDataTypes = createAction(
  '[Database Page] Load Data Types'
);

export const loadDataTypesSuccess = createAction(
  '[Database API] Load Data Types Success',
  props<{ dataTypes: DataTypeDef[]}>()
)

export const createTable = createAction(
  '[Database Page] Create Table',
  props<{table: CreateTableDef }>()
);

export const createTableSuccess = createAction(
  '[Database API] Create Table Success',
  props<{table: TableDef, database: string}>()
);
