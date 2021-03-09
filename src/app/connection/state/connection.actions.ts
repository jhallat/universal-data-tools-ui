import { createAction, props } from "@ngrx/store";
import { ConnectionDefinition, ConnectionToken, ConnectionType } from "../connection";

export const loadConnectionTypes = createAction(
    '[Connection] Load Types'
);

export const loadConnectionTypesSuccess = createAction(
    '[Connection] Load Types Success',
    props<{ connectionTypes: ConnectionType[] }>()
);

export const loadConnectionTypesFailure = createAction(
    '[Connection] Load Types Fail',
    props<{ error: string }>()
);

export const loadConnections = createAction(
    '[Connection] Load Connections'
);

export const loadConnectionsSuccess = createAction(
    '[Connection] Load Connections Success',
    props<{ connectionDefinitions: ConnectionDefinition[] }>()
);

export const loadConnectionsFailure = createAction(
    '[Connection] Load Connections Fail',
    props<{ error: string }>()
);

export const addConnection = createAction(
    '[Connection] Add Connection',
    props<{ connection: ConnectionDefinition }>()
);

export const addConnectionSuccess = createAction(
    '[Connection] Add Connection Success',
    props<{ connection: ConnectionDefinition }>()
);

export const addConnectionFailure = createAction(
    '[Connection] Add Connection Failure',
    props<{ error: string }>()
);

export const connect = createAction(
    '[Connection] Connect',
    props<{ connectionId: string }>()
);

export const connectSuccess = createAction(
    '[Connection] Connect Success',
    props<{ connectionToken: ConnectionToken }>()
);

export const connectFailure = createAction(
    '[Connection] Connect Failure',
    props<{ error: string }>()
);


