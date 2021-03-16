import { createAction, props } from "@ngrx/store";
import { DockerContainer } from "../docker";

export const loadContainers = createAction(
    '[Container Page] Load Containers'
);

export const loadContainersSuccess = createAction(
    '[Container API] Load Containers Success',
    props<{containers: DockerContainer[]}>()
);

export const loadContainersFailure = createAction(
    '[Container API] Load Containers Failure',
    props<{ error: string}>()
);
