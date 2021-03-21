import { createAction, props } from '@ngrx/store';
import { ConnectionDefinition, ConnectionToken, ConnectionType } from '../connection';
import {ErrorCode} from '../../shared';

export const loadConnectionTypes = createAction(
    '[Connection Page] Load Types'
);

export const loadConnectionTypesSuccess = createAction(
    '[Connection API] Load Types Success',
    props<{ connectionTypes: ConnectionType[] }>()
);


export const loadConnections = createAction(
    '[Connection Page] Load Connections'
);

export const loadConnectionsSuccess = createAction(
    '[Connection API] Load Connections Success',
    props<{ connectionDefinitions: ConnectionDefinition[] }>()
);

export const addConnection = createAction(
    '[Connection Page] Add Connection',
    props<{ connection: ConnectionDefinition }>()
);

export const addConnectionSuccess = createAction(
    '[Connection API] Add Connection Success',
    props<{ connection: ConnectionDefinition }>()
);

export const connect = createAction(
    '[Connection Page] Connect',
    props<{ connectionId: string }>()
);

export const connectSuccess = createAction(
    '[Connection API] Connect Success',
    props<{ connectionToken: ConnectionToken }>()
);

export const disconnect = createAction(
    '[Connection Page] Disconnect'
);

export const disconnectSuccess = createAction(
    '[Connection API] Disconnect Success'
);


