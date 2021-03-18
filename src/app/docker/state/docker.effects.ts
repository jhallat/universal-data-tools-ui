import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ServiceError } from "src/app/shared";
import { DockerContainer } from "../docker";
import { DockerService } from "../docker.service";
import * as DockerActions from "./docker.actions";

@Injectable()
export class DockerEffects {
    constructor(private action$: Actions,
        private dockerService: DockerService) {}

    loadDockerContainers$ = createEffect(() => {
        return this.action$.pipe(
            ofType(DockerActions.loadContainers),
            mergeMap((action) => this.dockerService.getContainers().pipe(
                map((data: DockerContainer[] | ServiceError) => {
                    if (data instanceof ServiceError) {
                        return DockerActions.loadContainersFailure( { error: data.localMessage });        
                    } else {
                        return DockerActions.loadContainersSuccess( { containers: data });
                    }
                })
            ))
        )
    });    

    startDockerContainer$ = createEffect(() => {
        return this.action$.pipe(
            ofType(DockerActions.startContainer),
            mergeMap((action) => this.dockerService.startContainer(action.containerId).pipe(
                map((data: DockerContainer | ServiceError) => {
                    if (data instanceof ServiceError) {
                        return DockerActions.startContainerFailure( { error: data.localMessage });        
                    } else {
                        return DockerActions.startContainerSuccess( { container: data });
                    }
                })
            ))
        )
    });  

    stopDockerContainer$ = createEffect(() => {
        return this.action$.pipe(
            ofType(DockerActions.stopContainer),
            mergeMap((action) => this.dockerService.stopContainer(action.containerId).pipe(
                map((data: DockerContainer | ServiceError) => {
                    if (data instanceof ServiceError) {
                        return DockerActions.stopContainerFailure( { error: data.localMessage });        
                    } else {
                        return DockerActions.stopContainerSuccess( { container: data });
                    }
                })
            ))
        )
    }); 
}