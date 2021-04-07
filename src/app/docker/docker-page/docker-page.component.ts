import { Component, OnInit, OnDestroy } from '@angular/core';
import {Menu, MenuBuilder} from '../../shared/page/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {getErrorCode} from '../../state/app.reducer';
import {ErrorCode} from '../../shared';
import {Store} from '@ngrx/store';
import {State} from '../state/docker.reducer';
import {getConnectionToken} from '../../connection/state';

@Component({
  selector: 'app-docker-page',
  templateUrl: './docker-page.component.html',
  styleUrls: ['./docker-page.component.scss']
})
export class DockerPageComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];
  errorCode$!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.menus = new MenuBuilder().forMenu('Container')
      .addItem('Create New Container')
      .withAction(this.onCreateContainer)
      .create();
    // TODO Since this can happen on any page, find a central way to handle
    this.errorCode$ = this.store.select(getErrorCode).subscribe({
      next: data => {
        if (data === ErrorCode.NO_CONNECTION) {
          this.router.navigate(['/error']);
        }
      }
    });
    this.store.select(getConnectionToken).subscribe({
      next: token => {
        if (token?.token == null || token?.token?.length === 0) {
          this.router.navigate(['/error']);
        }
      }
    });
  }

  onCreateContainer = (): void => {
    this.router.navigate(['create-container'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.errorCode$.unsubscribe();
  }
}
