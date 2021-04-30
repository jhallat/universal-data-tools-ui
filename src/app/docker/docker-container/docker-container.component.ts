import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {DockerContainer, DockerImage} from '../docker';
import {getContainers, getImages, State} from '../state/docker.reducer';
import * as DockerActions from '../state/docker.actions';

@Component({
  selector: 'app-docker-container',
  templateUrl: './docker-container.component.html',
  styleUrls: ['./docker-container.component.scss']
})
export class DockerContainerComponent implements OnInit, OnDestroy {

  displayedContainerColumns: string[] = ['containerId', 'image', 'command', 'created', 'status', 'ports', 'names', 'actions'];
  displayedImageColumns: string[] = ['id', 'tags'];
  containers: DockerContainer[] = [];
  images: DockerImage[] = [];
  containers$!: Subscription;
  images$!: Subscription;
  tabs = ['Containers', 'Images'];
  tab = 'Containers';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(DockerActions.loadContainers());
    this.store.dispatch(DockerActions.loadImages());
    this.containers$ = this.store.select(getContainers).subscribe({
      next: data => {
        this.containers = data;
      }
    });
    this.images$ = this.store.select(getImages).subscribe({
      next: data => {
        this.images = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.containers$.unsubscribe();
  }

  onSelectTab(tab: string): void {
    this.tab = tab;
  }

  onStart(containerId: string): void {
    this.store.dispatch(DockerActions.startContainer({containerId}));
  }

  onStop(containerId: string): void {
    this.store.dispatch(DockerActions.stopContainer({containerId}));
  }

  onDelete(containerId: string): void {
    this.store.dispatch(DockerActions.deleteContainer({containerId}));
  }

  isRunning(status: string): boolean {
    return status.startsWith('Up');
  }

}
