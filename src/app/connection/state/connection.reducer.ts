import { createReducer, on } from "@ngrx/store";
import { ConnectionDefinition, ConnectionToken, ConnectionType } from "../connection";
import * as ConnectionActions from './connection.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface ConnectionState {
    connectionTypes: ConnectionType[];
    currentConnectionId: number;
    connections: ConnectionDefinition[];
    connectionToken: ConnectionToken;
    error: string;
}

const initialState: ConnectionState = {
    connectionTypes: [],
    currentConnectionId: 0,
    connections: [],
    connectionToken: {token: '', description: '', label: '', valid: false},
    error: ''
}

const getConnectionState = createFeatureSelector<ConnectionState>('connection');

export const getConnectionTypes = createSelector(
    getConnectionState,
    state => state.connectionTypes
)

export const getConnections = createSelector(
    getConnectionState,
    state => state.connections
)

export const getCurrentConnection = createSelector(
    getConnectionState,
    state => {
        return state.connectionTypes.find(item => item.id == state.currentConnectionId)
    }
)

export const getConnectionToken = createSelector(
    getConnectionState,
    state => state.connectionToken
)

export const connectionReducer = createReducer<ConnectionState>(
    initialState,
    on(ConnectionActions.loadConnectionTypesSuccess, (state, action): ConnectionState => {
        return {
            ...state,
            connectionTypes: action.connectionTypes
        }
    }),
    on(ConnectionActions.loadConnectionTypesFailure, (state, action): ConnectionState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ConnectionActions.loadConnectionsSuccess, (state, action): ConnectionState => {
        return {
            ...state,
            connections: action.connectionDefinitions
        }
    }),
    on(ConnectionActions.loadConnectionsFailure, (state, action): ConnectionState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ConnectionActions.addConnectionSuccess, (state, action): ConnectionState => {
        const connections = state.connections.map(item => item);
        connections.push(action.connection);
        return {
            ...state,
            connections: connections,
            error: ''
        }
    }),
    on(ConnectionActions.addConnectionFailure, (state, action): ConnectionState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ConnectionActions.connectSuccess, (state, action): ConnectionState => {
        return {
            ...state,
            connectionToken: action.connectionToken
        }
    }),
    on(ConnectionActions.connectFailure, (state, action): ConnectionState => {
        return {
            ...state,
            error: action.error
        }        
    })
)