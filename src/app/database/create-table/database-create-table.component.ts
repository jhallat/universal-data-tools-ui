import { Component, OnInit } from '@angular/core';
import {CreateColumnDef} from '../database';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getDatabaseNames, State} from '../state/database.reducer';
import {createTable} from "../state/database.actions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-table',
  templateUrl: './database-create-table.component.html',
  styleUrls: ['./database-create-table.component.scss']
})
export class DatabaseCreateTableComponent implements OnInit {

  newTableForm!: FormGroup;
  databases: string[] = [];

  get columns(): FormArray {
    return this.newTableForm.get('columns') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.newTableForm = this.formBuilder.group({
      name: '',
      database: '',
      columns: this.formBuilder.array([this.buildColumnRow(    {
        name: '',
        dataType: '',
        size: 0,
        primaryKey: false,
        notNull: false,
        unique: false
      })])
    });
    this.store.select(getDatabaseNames).subscribe({
      next: data => this.databases = data
    });
    this.onChanges();
  }

  buildColumnRow(column: CreateColumnDef): FormGroup {
    return this.formBuilder.group({
      name: column.name,
      dataType: column.dataType,
      size: column.size,
      primaryKey: column.primaryKey,
      notNull: column.notNull,
      unique: column.unique
    });
  }

  addColumnRow(): void {
    this.columns.push(this.buildColumnRow(    {
      name: '',
      dataType: '',
      size: 0,
      primaryKey: false,
      notNull: false,
      unique: false
    }));
  }

  onChanges(): void {
    this.newTableForm.valueChanges.subscribe(val => {
      if (val.columns[val.columns.length - 1].name.trim() !== '') {
        this.addColumnRow();
      }
    });
  }

  onCreate(): void {
    const name = this.newTableForm.get('name')?.value + '';
    const database = this.newTableForm.get('database')?.value + '';
    const schema = '';
    const columns: CreateColumnDef[] = [];
    for (const column of this.columns.controls) {
      const columnName = column.get('name')?.value;
      if (columnName.trim() !== '') {
        const dataType = column.get('dataType')?.value;
        const size = column.get('size')?.value;
        const primaryKey = column.get('primaryKey')?.value;
        const notNull = column.get('notNull')?.value;
        const unique = column.get('unique')?.value;
        const columnDef = {
          name: columnName,
          dataType,
          size,
          primaryKey,
          notNull,
          unique
        };
        columns.push(columnDef);
      }
    }
    const table = {name, schema, database, columns};
    console.log(table);
    this.store.dispatch(createTable({table}));
    this.router.navigate(['table'], {relativeTo: this.route });
  }
}
