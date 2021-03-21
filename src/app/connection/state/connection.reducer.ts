import { createReducer, on } from '@ngrx/store';
import {ConnectionDefinition, ConnectionToken, ConnectionType, EMPTY_CONNECTION_TOKEN, NO_CONNECION} from '../connection';
import * as ConnectionActions from './connection.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface ConnectionState {
    connectionTypes: ConnectionType[];
    currentConnectionLabel: string;
    connections: ConnectionDefinition[];
    connectionToken: ConnectionToken;
}

const initialState: ConnectionState = {
    connectionTypes: [],
    currentConnectionLabel: NO_CONNECION,
    connections: [],
    connectionToken: EMPTY_CONNECTION_TOKEN,
};

const getConnectionState = createFeatureSelector<ConnectionState>('connection');

export const getConnectionTypes = createSelector(
    getConnectionState,
    state => state.connectionTypes
);

export const getConnections = createSelector(
    getConnectionState,
    state => state.connections
);

export const getCurrentConnection = createSelector(
    getConnectionState,
    state => {
        return state.connectionTypes.find(item => item.label === state.currentConnectionLabel);
    }
);

export const getConnectionToken = createSelector(
    getConnectionState,
    state => state.connectionToken
);


export const connectionReducer = createReducer<ConnectionState>(
    initialState,
    on(ConnectionActions.loadConnectionTypesSuccess, (state, action): ConnectionState => {
        return {
            ...state,
            connectionTypes: action.connectionTypes
        };
    }),
    on(ConnectionActions.loadConnectionsSuccess, (state, action): ConnectionState => {
      console.log(action.connectionDefinitions);
      return {
            ...state,
            connections: action.connectionDefinitions,
        };
    }),
    on(ConnectionActions.addConnectionSuccess, (state, action): ConnectionState => {
        const connections = state.connections.map(item => item);
        connections.push(action.connection);
        return {
            ...state,
            connections,
        };
    }),
    on(ConnectionActions.connectSuccess, (state, action): ConnectionState => {
        console.log('Connection token: ' + JSON.stringify(action.connectionToken));
        return {
            ...state,
            connectionToken: action.connectionToken,
        };
    }),
    on(ConnectionActions.disconnectSuccess, (state, action): ConnectionState => {
        return {
            ...state,
            connectionToken: EMPTY_CONNECTION_TOKEN,
        };
    })
);
