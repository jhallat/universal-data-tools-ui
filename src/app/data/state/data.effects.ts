import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { DataService } from "../data.service";
import * as DataActions from './data.actions';
import { Data, DataError } from "../data";

@Injectable()
export class DataEffects {

    constructor(private actions$: Actions,
        private dataService: DataService) {}

    loadData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DataActions.loadData),
            mergeMap((action) => this.dataService.getData(action.tableName).pipe(
                map((data:Data | DataError ) => {
                    if (data instanceof DataError) {
                        return DataActions.loadDataFailure({ error:data.localMessage });
                    } else {
                        return DataActions.loadDataSuccess({ data })                        
                    }
                }) 
            ))
        )
    })    

}