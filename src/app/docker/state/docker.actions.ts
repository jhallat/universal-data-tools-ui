import { createAction, props } from "@ngrx/store";
import { DockerContainer } from "../docker";

export const loadContainers = createAction(
    '[Container Page] Load Containers'
);

export const loadContainersSuccess = createAction(
    '[Container API] Load Containers Success',
    props<{ containers: DockerContainer[] }>()
);

export const loadContainersFailure = createAction(
    '[Container API] Load Containers Failure',
    props<{ error: string }>()
);

export const startContainer = createAction(
    '[Container Page] Start Container',
    props<{ containerId: string }>()
);

export const startContainerSuccess = createAction(
    '[Container API] Start Container Success',
    props<{ container: DockerContainer }>()
)

export const startContainerFailure = createAction(
    '[Container API] Start Container Failure',
    props<{ error: string }>()
)

export const stopContainer = createAction(
    '[Container Page] Stop Container',
    props<{ containerId: string }>()
);

export const stopContainerSuccess = createAction(
    '[Container API] Stop Container Success',
    props<{ container: DockerContainer }>()
)

export const stopContainerFailure = createAction(
    '[Container API] Stop Container Failure',
    props<{ error: string }>()
)
