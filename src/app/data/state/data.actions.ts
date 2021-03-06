import { createAction, props } from "@ngrx/store";
import { Data, DataError } from "../data";


export const loadData = createAction(
    '[Data] Load',
    props<{ tableName: string}>()
);

export const loadDataSuccess = createAction(
    '[Data] Load Success',
    props<{ data: Data }>()
);

export const loadDataFailure = createAction(
    '[Data] Load Fail',
    props<{ error: string}>()
);