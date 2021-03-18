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

//TOOD can some of theses actions/reducers be merged?
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
    }),
    on(DockerActions.startContainerSuccess, (state, action): DockerState => {
        const containerId = action.container.containerId;
        const updatedContainers = state.containers.map(
            item => item.containerId === containerId ? action.container : item)
        return {
            ...state,
            containers: updatedContainers
        }    
    }),
    on(DockerActions.startContainerFailure, (state, action): DockerState => {
        return {
            ...state,
            error: action.error
        }
    }),    
    on(DockerActions.stopContainerSuccess, (state, action): DockerState => {
        const containerId = action.container.containerId;
        const updatedContainers = state.containers.map(
            item => item.containerId === containerId ? action.container : item)
        return {
            ...state,
            containers: updatedContainers
        }    
    }),
    on(DockerActions.stopContainerFailure, (state, action): DockerState => {
        return {
            ...state,
            error: action.error
        }
    }),        
)