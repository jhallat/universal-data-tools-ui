import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from './connection/state';
import { State } from './state/app.state';
import * as ConnectionActions from './connection/state/connection.actions';
import {Router} from '@angular/router';
import {StatusMessageService} from './status-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connection = '';

  constructor(private store: Store<State>,
              private router: Router,
              private statusMessageService: StatusMessageService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.store.select(getConnectionToken).subscribe({
      next: data => {
        if (data.valid) {
          this.connection = data.description;
        } else {
          this.connection = '';
        }
      }
    });
    this.statusMessageService.connect().subscribe({
        next: data => this.snackBar.open(data.message, data.subject)
      }
    );
  }

  disconnect(): void {
    this.store.dispatch(ConnectionActions.disconnect());
  }

  displayLogs(): void {
    this.router.navigate(['/logs']);
  }

}
