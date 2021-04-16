import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from 'src/app/connection/state';
//TODO replace with state from database reducer
import { State } from 'src/app/state/app.state';
import {NavigationNode} from "../../shared/navigation-tree/navigation-tree";

@Component({
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.scss']
})
export class DatabasePageComponent implements OnInit {

  title = '';
  dbNodes: NavigationNode[] = [];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getConnectionToken).subscribe({
      next: data => this.title = data.type
    });
    const tables: NavigationNode[] = [
      {name: 'table-one', data: {}, nodes: [], leaf: true},
      {name: 'table-two', data: {}, nodes: [], leaf: true},
      {name: 'table-three', data: {}, nodes: [], leaf: true},
    ];
    const views: NavigationNode[] = [
      {name: 'table-one', data: {}, nodes: [], leaf: true},
      {name: 'table-two', data: {}, nodes: [], leaf: true},
      {name: 'table-three', data: {}, nodes: [], leaf: true},
    ];
    const contents: NavigationNode[] = [
      {name: 'Tables', data: {}, nodes: tables, leaf: false},
      {name: 'Views', data: {}, nodes: views, leaf: false}
    ];
    const databases: NavigationNode[] = [
      {name: 'database-one', data: {}, nodes: contents, leaf: false}
    ];
    this.dbNodes = databases;
  }

}
