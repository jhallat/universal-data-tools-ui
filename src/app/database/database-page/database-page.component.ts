import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from 'src/app/connection/state';
//TODO replace with state from database reducer
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.scss']
})
export class DatabasePageComponent implements OnInit {

  title = '';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getConnectionToken).subscribe({
      next: data => this.title = data.type
    })
  }

}
