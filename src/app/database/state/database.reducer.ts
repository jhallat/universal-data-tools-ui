import * as AppState from '../../state/app.state';
import {DatabaseDef, DataTypeDef, TableDef} from '../database';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as DatabaseActions from './database.actions';

export interface State extends AppState.State {
  database: DatabaseState;
}

export interface DatabaseState {
  databases: DatabaseDef[];
  dataTypes: DataTypeDef[];
  selectedTable: TableDef | undefined;
}

const initialState: DatabaseState = {
  databases: [],
  dataTypes: [],
  selectedTable: undefined
};

const getDatabaseState = createFeatureSelector<DatabaseState>('database');

export const getDatabases = createSelector(
  getDatabaseState,
  state => state.databases
);

export const getDatabaseNames = createSelector(
  getDatabaseState,
  state => state.databases.map(database => database.name)
);

export const getSelectedTable = createSelector(
  getDatabaseState,
  state => state.selectedTable
);

export const getDataTypes = createSelector(
  getDatabaseState,
  state => state.dataTypes
)

export const databaseReducer = createReducer<DatabaseState>(
  initialState,
  on(DatabaseActions.loadDatabasesSuccess, (state, action): DatabaseState => {
    return {
      ...state,
      databases: action.databases
    };
  }),
  on(DatabaseActions.loadDataTypesSuccess, (state, action): DatabaseState => {
    return {
      ...state,
      dataTypes: action.dataTypes
    };
  }),
  on(DatabaseActions.loadTableSuccess, (state, action): DatabaseState => {
    return {
      ...state,
      selectedTable: action.table
    };
  }),
  on(DatabaseActions.createTableSuccess, (state, action): DatabaseState => {
    const updatedDatabases = state.databases.map(database => {
      const updatedDatabase = Object.assign({}, database);
      if (database.name === action.database) {
        updatedDatabase.tables.push({ name: action.table.name, schema: action.table.schema});
      }
      return updatedDatabase;
    });
    return {
      ...state,
      selectedTable: action.table,
      databases: updatedDatabases
    };
  })
);
