import { state } from "@angular/animations";
import { createReducer, on, createFeatureSelector, createSelector } from "@ngrx/store";
import { Table } from "../table";
import * as TableActions from './table.actions';

export interface TableState {
    tables: Table[];
    selectedTable: string;
    error: string;
}

const initialState: TableState = {
    selectedTable: '',
    error: '',
    tables:[]
}

const getTableState = createFeatureSelector<TableState>('tables');

export const getSelectedTable = createSelector(
    getTableState,
    state => state.selectedTable
)

export const getTables = createSelector(
    getTableState,
    state => state.tables
)

export const getError = createSelector(
    getTableState,
    state => state.error
)


export const tableReducer = createReducer<TableState>(
    initialState,
    on(TableActions.selectTable, (state, action): TableState => {
        return {
            ...state,
            selectedTable: action.tableName
        }
    }),
    on(TableActions.loadTablesSuccess, (state, action): TableState => {
        return {
            ...state,
            tables: action.tables
        }
    }),
    on(TableActions.loadTablesFailure, (state, action): TableState => {
        return {
            ...state,
            error: action.error
        }
    })
);