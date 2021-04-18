import * as AppState from '../../state/app.state';
import {DatabaseDef, TableDef} from '../database';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as DatabaseActions from './database.actions';

export interface State extends AppState.State {
  database: DatabaseState;
}

export interface DatabaseState {
  databases: DatabaseDef[];
  selectedTable: TableDef | undefined;
}

const initialState: DatabaseState = {
  databases: [],
  selectedTable: undefined
};

const getDatabaseState = createFeatureSelector<DatabaseState>('database');

export const getDatabases = createSelector(
  getDatabaseState,
  state => state.databases
);

export const getSelectedTable = createSelector(
  getDatabaseState,
  state => state.selectedTable
);

export const databaseReducer = createReducer<DatabaseState>(
  initialState,
  on(DatabaseActions.loadDatabasesSuccess, (state, action): DatabaseState => {
    return {
      ...state,
      databases: action.databases
    };
  }),
  on(DatabaseActions.loadTableSuccess, (state, action): DatabaseState => {
    return {
      ...state,
      selectedTable: action.table
    };
  })
);
