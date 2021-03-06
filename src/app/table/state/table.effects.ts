import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TableService } from '../table.service';
import * as TableActions from './table.actions';

@Injectable()
export class TableEffects {

    constructor(private actions$: Actions,
        private tableService: TableService) { }


    loadTables$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TableActions.loadTables),
            mergeMap(() => this.tableService.getTables().pipe(
                map(tables => TableActions.loadTablesSuccess({ tables })),
                catchError(error => of(TableActions.loadTablesFailure({ error })))
            ))
        )
    })
}