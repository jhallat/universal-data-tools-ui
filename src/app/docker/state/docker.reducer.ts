import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { DockerContainer } from '../docker';
import * as DockerActions from "./docker.actions";

export interface State extends AppState.State {
    docker: DockerState;
}

export interface DockerState {
    containers: DockerContainer[];
    error: string;
}

const initialState: DockerState = {
    containers: [],
    error: ''
}

const getDockerState = createFeatureSelector<DockerState>('docker');

export const getContainers = createSelector(
    getDockerState,
    state => state.containers
)

export const getError = createSelector(
    getDockerState,
    state => state.error
)

export const dockerReducer = createReducer<DockerState>(
    initialState,
    on(DockerActions.loadContainersSuccess, (state, action): DockerState => {
        return {
            ...state,
            containers: action.containers
        }
    }),
    on(DockerActions.loadContainersFailure, (state, action): DockerState => {
        return {
            ...state,
            error: action.error
        }
    })    
)