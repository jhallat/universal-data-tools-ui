import { Component, OnInit } from '@angular/core';
import {ColumnDef} from '../database';
import {getSelectedTable, State} from '../state/database.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-database-table',
  templateUrl: './database-table.component.html',
  styleUrls: ['./database-table.component.scss']
})
export class DatabaseTableComponent implements OnInit {

  displayedDefColumns: string[] = ['name',
    'isPrimaryKey',
    'isNullable',
    'defaultValue',
    'dataType',
    'maxLength',
    'numericPrecision',
    'numericScale',
    'updatable'];
  displayedDataColumns: string[] = [];
  tableName = '';
  selectedTab = 'definition';

  columns: ColumnDef[] = [];
  columns$!: Subscription;
  dataRows: any[] = [];
  primaryKey = '';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.columns$ = this.store.select(getSelectedTable).subscribe({
      next: data => {
        if (data?.primaryKey !== undefined) {
          this.primaryKey = data.primaryKey;
        }
        if (data?.columns !== undefined) {
          this.columns = data?.columns;
          this.displayedDataColumns = this.columns.map(column => column.name);
        } else {
          this.columns = [];
        }
        if (data?.name !== undefined) {
          this.tableName = data.name;
          this.dataRows = [];
          if (data?.rows !== null) {
            data.rows.forEach((row, rowIndex) => {
              const value: any = {};
              data.columns.forEach((column, columnIndex) => {
                value[column.name] = row[columnIndex];
              });
              this.dataRows.push(value);
            });
          }
        } else {
          this.tableName = '';
          this.dataRows = [];
        }
      }
    });
  }

  onSelectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
