import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Data } from "../data";
import * as DataActions from './data.actions';

export interface DataState {
    data: Data;
    error: string;
}

const initialState: DataState = {
    data: {
        headings: [],
        items: []
    },
    error: ''
}

const getDataState = createFeatureSelector<DataState>('data');

export const getData = createSelector(
    getDataState,
    state => state.data
)

export const dataReducer = createReducer<DataState>(
    initialState,
    on(DataActions.loadDataSuccess, (state, action): DataState => {
        return {
            ...state,
            data: action.data
        }
    }),
    on(DataActions.loadDataFailure, (state, action): DataState => {
        return {
            ...state,
            error: action.error
        }
    })

)