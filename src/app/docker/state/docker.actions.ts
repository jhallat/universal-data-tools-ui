import { createAction, props } from "@ngrx/store";
import { DockerContainer } from "../docker";
import {ErrorCode} from '../../shared';

export const loadContainers = createAction(
    '[Container Page] Load Containers'
);

export const loadContainersSuccess = createAction(
    '[Container API] Load Containers Success',
    props<{ containers: DockerContainer[] }>()
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


