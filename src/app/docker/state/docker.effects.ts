import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {failedApi, successApi} from 'src/app/shared';
import {DockerService} from '../docker.service';
import * as DockerActions from './docker.actions';

@Injectable()
export class DockerEffects {
  constructor(private action$: Actions,
              private dockerService: DockerService) {
  }

  loadDockerContainers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.loadContainers),
      mergeMap((action) => this.dockerService.getContainers().pipe(
        map(data => DockerActions.loadContainersSuccess({containers: data})),
        catchError(error => failedApi(error))
      ))
    );
  });

  loadDockerImages$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.loadImages),
      mergeMap((action) => this.dockerService.getImages().pipe(
        map(data => DockerActions.loadImagesSuccess({images: data})),
        catchError(error => failedApi(error))
      ))
    );
  });


  startDockerContainer$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.startContainer),
      mergeMap((action) => this.dockerService.startContainer(action.containerId).pipe(
        map(data => DockerActions.statusContainerSuccess( { container: data})),
          catchError(error => failedApi(error))
        ))
      );
  });

  stopDockerContainer$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.stopContainer),
      mergeMap((action) => this.dockerService.stopContainer(action.containerId).pipe(
        map(data => DockerActions.statusContainerSuccess({container: data})),
          catchError(error => failedApi(error))
        ))
      );
  });

  deleteDockerContainer$ = createEffect( () => {
    return this.action$.pipe(
      ofType(DockerActions.deleteContainer),
      mergeMap((action) => this.dockerService.deleteContainer(action.containerId).pipe(
        map(data => DockerActions.deleteContainerSuccess({containerId: action.containerId})),
        catchError( error => failedApi(error))
      ))
    );
  });

  createDockerContainer$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.createContainer),
      mergeMap( (action) => this.dockerService.createContainer(action.definition).pipe(
        map( data => DockerActions.createContainerSuccess( {container: data})),
        catchError( error => failedApi(error))
      ))
    );
  });

  successApi$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DockerActions.loadContainersSuccess,
        DockerActions.statusContainerSuccess),
      concatMap(() => successApi())
    );
  });


}
