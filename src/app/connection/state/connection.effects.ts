import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { ConnectionDefinition, ConnectionError, ConnectionToken, ConnectionType } from "../connection";
import { ConnectionService } from "../connection.service";
import * as ConnectionActions from "./connection.actions";

@Injectable()
export class ConnectionEffects {

    constructor(private action$: Actions,
        private connectionService: ConnectionService) {}

    loadConnectionTypes$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ConnectionActions.loadConnectionTypes),
            mergeMap((action) => this.connectionService.getConnectionTypes().pipe(
                map((data: ConnectionType[] | ConnectionError) => {
                    if (data instanceof ConnectionError) {
                        return ConnectionActions.loadConnectionTypesFailure( { error: data.localMessage });
                    } else {
                        return ConnectionActions.loadConnectionTypesSuccess( { connectionTypes: data} )
                    }
                })
            ))
        )
    });  
    
    loadConnections$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ConnectionActions.loadConnectionTypes),
            mergeMap((action) => this.connectionService.getConnections().pipe(
                map((data: ConnectionDefinition[] | ConnectionError) => {
                    if (data instanceof ConnectionError) {
                        return ConnectionActions.loadConnectionsFailure( { error: data.localMessage });
                    } else {
                        return ConnectionActions.loadConnectionsSuccess( { connectionDefinitions: data} )
                    }
                })
            ))
        )
    }); 
    
    addConnection$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ConnectionActions.addConnection),
            concatMap((action) => this.connectionService.addConnection(action.connection).pipe(
                map((data: ConnectionDefinition | ConnectionError) => {
                    if (data instanceof ConnectionError) {
                        return ConnectionActions.addConnectionFailure( { error: data.localMessage })
                    } else {
                        return ConnectionActions.addConnectionSuccess( { connection: data })
                    }
                })
            ))
        )
    });

    connect$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ConnectionActions.connect),
            switchMap((action) => this.connectionService.connect(action.connectionId).pipe(
                map((data: ConnectionToken | ConnectionError) => {
                    if (data instanceof ConnectionError) {
                        return ConnectionActions.connectFailure( { error: data.localMessage })
                    } else {
                        return ConnectionActions.connectSuccess( { connectionToken: data })
                    }
                })
            ))
        )
    })
}