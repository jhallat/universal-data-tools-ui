import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from './connection/state';
import { State } from './state/app.state';
import * as ConnectionActions from './connection/state/connection.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connection = ""

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.store.select(getConnectionToken).subscribe({
      next: data => {
        if (data.valid) {
          this.connection = data.description;
        } else {
          this.connection = '';
        }
      }
    })
  }

  disconnect(): void {
    this.store.dispatch(ConnectionActions.disconnect())
  }
}
