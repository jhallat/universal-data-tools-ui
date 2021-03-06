import { createAction, props } from "@ngrx/store";
import { Table } from "../table";

export const selectTable = createAction(
    '[Table] Select Table',
    props<{ tableName: string }>()
);

export const loadTables = createAction(
    '[Table] Load'
);

export const loadTablesSuccess = createAction(
    '[Table] Load Success',
    props<{ tables: Table[] }>()
);

export const loadTablesFailure = createAction(
    '[Table] Load Fail',
    props<{ error: string}>()
);