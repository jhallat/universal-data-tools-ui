import { Component, OnInit } from '@angular/core';
import {ColumnDef} from '../database';
import {getSelectedTable, State} from '../state/database.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ButtonDef} from '../../shared/button-bar/button-bar';
import {MatDialog} from '@angular/material/dialog';
import {DatabaseConfirmDeleteTable} from './database-confirm-delete-table';
import {dropTable} from "../state/database.actions";

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
  databaseName = '';
  selectedTab = 'definition';

  columns: ColumnDef[] = [];
  columns$!: Subscription;
  dataRows: any[] = [];
  primaryKey = '';

  buttons: ButtonDef[] = [];

  constructor(private store: Store<State>,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.buttons.push({caption: 'Drop Table', action: this.onDropTable});

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
          this.databaseName = data.database;
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
          this.databaseName = '';
          this.dataRows = [];
        }
      }
    });
  }

  onSelectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onDropTable = (): void => {
    const dialogRef = this.dialog.open(DatabaseConfirmDeleteTable, {
      data: { table: this.tableName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(dropTable({ databaseName: this.databaseName,
                                              tableName: this.tableName}));
      }
    });

  }

}
