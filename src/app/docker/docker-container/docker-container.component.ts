import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {DockerContainer} from '../docker';
import {getContainers, State} from '../state/docker.reducer';
import * as DockerActions from '../state/docker.actions';
import {Menu, MenuBuilder} from '../../shared/page/menu';
import {Router} from '@angular/router';
import {getErrorCode} from '../../state/app.reducer';
import {ErrorCode} from '../../shared';

@Component({
  selector: 'app-docker-container',
  templateUrl: './docker-container.component.html',
  styleUrls: ['./docker-container.component.scss']
})
export class DockerContainerComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['containerId', 'image', 'command', 'created', 'status', 'ports', 'names', 'actions'];
  containers: DockerContainer[] = [];
  containers$!: Subscription;
  errorCode$!: Subscription;
  menus: Menu[] = [];

  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
    this.menus = new MenuBuilder().forMenu('Container')
      .addItem('Create New Container')
      .withAction(this.onCreateContainer)
      .create();
    this.store.dispatch(DockerActions.loadContainers());
    this.containers$ = this.store.select(getContainers).subscribe({
      next: data => {
        this.containers = data;
      }
    });
    this.errorCode$ = this.store.select(getErrorCode).subscribe({
      next: data => {
        console.log('Checking error code ' + data);
        if (data === ErrorCode.NO_CONNECTION) {
          this.router.navigate(['/error']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.containers$.unsubscribe();
    this.errorCode$.unsubscribe();
  }

  onStart(containerId: string): void {
    this.store.dispatch(DockerActions.startContainer({containerId}));
  }

  onStop(containerId: string): void {
    this.store.dispatch(DockerActions.stopContainer({containerId}));
  }

  isRunning(status: string): boolean {
    return status.startsWith('Up');
  }

  onCreateContainer(): void {
    console.log('onCreateContainer() called');
  }
}
