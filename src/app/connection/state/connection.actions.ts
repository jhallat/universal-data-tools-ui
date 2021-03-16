import { createAction, props } from "@ngrx/store";
import { ConnectionDefinition, ConnectionToken, ConnectionType } from "../connection";

export const loadConnectionTypes = createAction(
    '[Connection Page] Load Types'
);

export const loadConnectionTypesSuccess = createAction(
    '[Connection API] Load Types Success',
    props<{ connectionTypes: ConnectionType[] }>()
);

export const loadConnectionTypesFailure = createAction(
    '[Connection API] Load Types Fail',
    props<{ error: string }>()
);

export const loadConnections = createAction(
    '[Connection Page] Load Connections'
);

export const loadConnectionsSuccess = createAction(
    '[Connection API] Load Connections Success',
    props<{ connectionDefinitions: ConnectionDefinition[] }>()
);

export const loadConnectionsFailure = createAction(
    '[Connection API] Load Connections Fail',
    props<{ error: string }>()
);

export const addConnection = createAction(
    '[Connection Page] Add Connection',
    props<{ connection: ConnectionDefinition }>()
);

export const addConnectionSuccess = createAction(
    '[Connection API] Add Connection Success',
    props<{ connection: ConnectionDefinition }>()
);

export const addConnectionFailure = createAction(
    '[Connection API] Add Connection Failure',
    props<{ error: string }>()
);

export const connect = createAction(
    '[Connection Page] Connect',
    props<{ connectionId: string }>()
);

export const connectSuccess = createAction(
    '[Connection API] Connect Success',
    props<{ connectionToken: ConnectionToken }>()
);

export const connectFailure = createAction(
    '[Connection API] Connect Failure',
    props<{ error: string }>()
);


