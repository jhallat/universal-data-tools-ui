import { Component, OnInit, OnDestroy } from '@angular/core';
import {Menu, MenuBuilder} from '../../shared/page/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
// TODO getErrorCode from Docker reducer !!!
import {getErrorCode, getError} from '../../state/app.reducer';
import {ErrorCode} from '../../shared';
import {Store} from '@ngrx/store';
import {State} from '../state/docker.reducer';


@Component({
  selector: 'app-docker-page',
  templateUrl: './docker-page.component.html',
  styleUrls: ['./docker-page.component.scss']
})
export class DockerPageComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];
  errorCode$!: Subscription;
  errorMessage$!: Subscription;
  errorMessage = '';

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.menus = new MenuBuilder().forMenu('Container')
      .addItem('Create New Container')
      .withAction(this.onCreateContainer)
      .forMenu('Image')
      .addItem('Pull Image')
      .withAction(this.onPullImage)
      .create();
    // TODO Since this can happen on any page, find a central way to handle
    this.errorCode$ = this.store.select(getErrorCode).subscribe({
      next: data => {
        if (data === ErrorCode.NO_CONNECTION) {
          this.router.navigate(['/error']);
        }
      }
    });
    this.errorMessage$ = this.store.select(getError).subscribe({
      next: data => {
        this.errorMessage = data;
      }
    });
  }

  onCreateContainer = (): void => {
    this.router.navigate(['create-container'], { relativeTo: this.route });
  }

  onPullImage = (): void => {
    this.router.navigate(['search-image'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.errorCode$.unsubscribe();
  }
}
