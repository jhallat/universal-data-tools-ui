import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DockerContainer } from '../docker';
import { getContainers, State } from '../state/docker.reducer';
import * as DockerActions from '../state/docker.actions';
import { DockerService } from '../docker.service';

@Component({
  selector: 'app-docker-container',
  templateUrl: './docker-container.component.html',
  styleUrls: ['./docker-container.component.scss']
})
export class DockerContainerComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['containerId', 'image', 'command', 'created', 'status', 'ports', 'names', 'actions'];
  containers: DockerContainer[] = [];
  containers$!: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(DockerActions.loadContainers());
    this.containers$ = this.store.select(getContainers).subscribe({
      next: data => {
        this.containers = data;
      }
    })
  }

  ngOnDestroy(): void {
    this.containers$.unsubscribe;
  }

  onStart(containerId: string) {
    this.store.dispatch(DockerActions.startContainer({containerId}));
  }

  onStop(containerId: string) {
    this.store.dispatch(DockerActions.stopContainer({containerId}));
  }

  isRunning(status: string): boolean {
    return status.startsWith("Up");
  }

}
