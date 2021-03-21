import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { DockerContainer } from '../docker';
import * as DockerActions from './docker.actions';

export interface State extends AppState.State {
    docker: DockerState;
}

export interface DockerState {
    containers: DockerContainer[];
}

const initialState: DockerState = {
    containers: []
};

const getDockerState = createFeatureSelector<DockerState>('docker');

export const getContainers = createSelector(
    getDockerState,
    state => state.containers
);

export const dockerReducer = createReducer<DockerState>(
    initialState,
    on(DockerActions.loadContainersSuccess, (state, action): DockerState => {
        return {
            ...state,
            containers: action.containers
        };
    }),
    on(DockerActions.statusContainerSuccess, (state, action): DockerState => {
        const containerId = action.container.containerId;
        const updatedContainers = state.containers.map(
            item => item.containerId === containerId ? action.container : item);
        return {
            ...state,
            containers: updatedContainers
        };
    }),
);
