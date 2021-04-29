import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from './connection/state';
import { State } from './state/app.state';
import * as ConnectionActions from './connection/state/connection.actions';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {RxStompService} from '@stomp/ng2-stompjs';
import {StatusMessage} from './status-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connection = '';

  constructor(private store: Store<State>,
              private router: Router,
              private rxStompService: RxStompService,
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
    this.rxStompService.watch('/topic/status').subscribe(
        message => {
            const statusMessage: StatusMessage = JSON.parse(message.body);
            console.log(statusMessage);
            this.snackBar.open(statusMessage.message, statusMessage.subject);
    });
  }

  disconnect(): void {
    this.store.dispatch(ConnectionActions.disconnect());
  }

  displayLogs(): void {
    this.router.navigate(['/logs']);
  }

}
