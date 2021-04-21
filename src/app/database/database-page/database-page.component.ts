import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { getConnectionToken } from 'src/app/connection/state';
import {NavigationNode, NavigationTreeBuilder} from '../../shared/navigation-tree/navigation-tree';
import {getDatabases, State, getSelectedTable} from '../state/database.reducer';
import * as DatabaseActions from '../state/database.actions';
import {Subscription} from 'rxjs';
import {DatabaseDef} from '../database';
import {Menu, MenuBuilder} from '../../shared/page/menu';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.scss']
})
export class DatabasePageComponent implements OnInit, OnDestroy {

  title = '';
  menus: Menu[] = [];
  dbNodes: NavigationNode[] = [];
  databases$!: Subscription;
  tableSelected = false;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.menus = new MenuBuilder().forMenu('Table')
      .addItem('Create New Table')
      .withAction(this.onCreateTable)
      .create();
    this.store.dispatch(DatabaseActions.loadDatabases());
    this.store.select(getConnectionToken).subscribe({
      next: data => {
        console.log(`Connection Type = ${data.type}`);
        this.title = data.type;
      }
    });
    this.databases$ = this.store.select(getDatabases).subscribe({
      next: data => {
        this.buildNavigationTree(data);
      }
    });
    this.store.select(getSelectedTable).subscribe({
      next: data => {
        console.log(data);
        this.tableSelected = (data !== undefined);
      }
    });
  }

  private buildNavigationTree(databases: DatabaseDef[]): void {
    const builder = new NavigationTreeBuilder<{database: string, schema: string, type: string, name: string}>();
    for (const database of databases) {
      builder.forRoot(database.name)
             .addNode('Tables');
      for (const table of database.tables) {
        builder.addLeaf(table.name)
               .withData({database: database.name, schema: table.schema, type: 'table', name: table.name});
      }
      builder.addNode('Views');
      for (const view of database.views) {
        builder.addLeaf(view.name)
          .withData({database: database.name, schema: view.schema, type: 'view', name: view.name});
      }
    }
    this.dbNodes = builder.create();
  }

  onNodeSelected(data: any): void {
    this.store.dispatch(DatabaseActions.loadTable({database: data.database, schema: data.schema, table: data.name}));
    this.router.navigate(['table'], {relativeTo: this.route});
  }

  onCreateTable = (): void => {
    this.router.navigate(['create-table'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.databases$.unsubscribe();
  }
}
