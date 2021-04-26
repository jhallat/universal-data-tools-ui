import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import {DockerContainer, DockerImage} from '../docker';
import * as DockerActions from './docker.actions';

export interface State extends AppState.State {
    docker: DockerState;
}

export interface DockerState {
    containers: DockerContainer[];
    images: DockerImage[];
}

const initialState: DockerState = {
    containers: [],
    images: []
};

const getDockerState = createFeatureSelector<DockerState>('docker');

export const getContainers = createSelector(
    getDockerState,
    state => state.containers
);

export const getImages = createSelector(
  getDockerState,
  state => state.images
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
    on(DockerActions.createContainerSuccess, (state, action): DockerState => {
      const addedContainers = [];
      state.containers.forEach(val => addedContainers.push(Object.assign({}, val)));
      addedContainers.push(action.container);
      return {
        ...state,
        containers: addedContainers
      };
    }),
    on(DockerActions.deleteContainerSuccess, (state, action): DockerState => {
      const updatedContainers: DockerContainer[] = [];
      state.containers.forEach(val => {
        if (val.containerId !== action.containerId) {
          updatedContainers.push(val);
        }
      });
      return {
        ...state,
        containers: updatedContainers
      };
    }),
    on(DockerActions.loadImagesSuccess, (state, action): DockerState => {
      console.log(action.images);
      return {
        ...state,
        images: action.images
      };
    })
);
