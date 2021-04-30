import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';
import { getError, getSelectedTable, getTables } from '../state/table.reducer';
import { Table } from '../table';
import * as TableActions from '../state/table.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tables$!: Observable<Table[]>;
  selectedTable$!: Observable<string> ;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>,
    private router: Router) { }

  ngOnInit(): void {

    this.tables$ = this.store.select(getTables);

    this.store.dispatch(TableActions.loadTables());

    this.selectedTable$ = this.store.select(getSelectedTable);

    this.errorMessage$ = this.store.select(getError);
  }

  onSelected(tableName: string) : void {
    this.store.dispatch(TableActions.selectTable({ tableName }));
    this.router.navigate(['data', tableName]);
  }

  onCreateTable() : void {
    this.router.navigate(['create-database-table']);
  }

}
