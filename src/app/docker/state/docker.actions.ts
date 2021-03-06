import { createAction, props } from '@ngrx/store';
import {CreateContainerDef, DockerContainer, DockerImage} from '../docker';

export const loadContainers = createAction(
    '[Container Page] Load Containers'
);

export const loadContainersSuccess = createAction(
    '[Container API] Load Containers Success',
    props<{ containers: DockerContainer[] }>()
);

export const loadImages = createAction(
  '[Container Page] Load Images'
);

export const loadImagesSuccess = createAction(
  '[Container API] Load Images Success',
  props<{images: DockerImage[] }>()
);

export const startContainer = createAction(
    '[Container Page] Start Container',
    props<{ containerId: string }>()
);

export const statusContainerSuccess = createAction(
    '[Container API] Status Container Success',
    props<{ container: DockerContainer }>()
);

export const stopContainer = createAction(
    '[Container Page] Stop Container',
    props<{ containerId: string }>()
);

export const createContainer = createAction(
  '[Container Page] Create Container',
  props<{ definition: CreateContainerDef}>()
);

export const createContainerSuccess = createAction(
  '[Container API] Create Container Failure',
  props<{ container: DockerContainer }>()
);

export const deleteContainer = createAction(
  '[Container Page] Delete Container',
  props<{ containerId: string}>()
);

export const deleteContainerSuccess = createAction(
  '[Container API] Delete Container Success',
  props<{ containerId: string}>()
);
