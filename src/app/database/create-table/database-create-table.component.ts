import { Component, OnInit } from '@angular/core';
import {CreateColumnDef, DataTypeDef} from '../database';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getDatabaseNames, getDataTypes, State} from '../state/database.reducer';
import {createTable} from '../state/database.actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-table',
  templateUrl: './database-create-table.component.html',
  styleUrls: ['./database-create-table.component.scss']
})
export class DatabaseCreateTableComponent implements OnInit {

  newTableForm!: FormGroup;
  databases: string[] = [];
  dataTypes: DataTypeDef[] = [];

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
        scale: 0,
        precision: 0,
        primaryKey: false,
        notNull: false,
        unique: false
      })])
    });
    this.store.select(getDatabaseNames).subscribe({
      next: data => this.databases = data
    });
    this.store.select(getDataTypes).subscribe({
      next: data => this.dataTypes = data
    });
    this.onChanges();
  }

  isSizeEnabled(column: CreateColumnDef): boolean {
    const selectedDataType = this.dataTypes.find(dataType => dataType.name === column.dataType);
    if (selectedDataType === undefined) {
      return false;
    }
    return selectedDataType.isLengthProvided;
  }

  isScaleEnabled(column: CreateColumnDef): boolean {
    const selectedDataType = this.dataTypes.find(dataType => dataType.name === column.dataType);
    if (selectedDataType === undefined) {
      return false;
    }
    return selectedDataType.isScaleProvided;
  }

  isPrecisionEnabled(column: CreateColumnDef): boolean {
    const selectedDataType = this.dataTypes.find(dataType => dataType.name === column.dataType);
    if (selectedDataType === undefined) {
      return false;
    }
    return selectedDataType.isPrecisionProvided;
  }

  findDataType(dataTypeName: string): DataTypeDef | undefined {
    return this.dataTypes.find(dataType => dataType.name === dataTypeName);
  }

  buildColumnRow(column: CreateColumnDef): FormGroup {
    return this.formBuilder.group({
      name: column.name,
      dataType: column.dataType,
      size: {value: column.size, disabled: !this.isSizeEnabled(column)},
      scale: {value: column.scale, disabled: !this.isScaleEnabled(column)},
      precision: {value: column.precision, disabled: !this.isPrecisionEnabled(column)},
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
      scale: 0,
      precision: 0,
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
      for (const column of this.columns.controls) {
        const dataType = column.get('dataType')?.value;
        const selectedDataType = this.findDataType(dataType);
        const sizeColumn = column.get('size');
        if (sizeColumn !== undefined && sizeColumn !== null) {
          if (selectedDataType !== undefined && selectedDataType.isLengthProvided) {
            if (sizeColumn.disabled) {
              sizeColumn.enable();
            }
          } else {
            if (sizeColumn.value !== 0) {
              sizeColumn.setValue(0);
            }
            if (sizeColumn.enabled) {
              sizeColumn.disable();
            }
          }
        }

        const scaleColumn = column.get('scale');
        if (scaleColumn !== undefined && scaleColumn !== null) {
          if (selectedDataType !== undefined && selectedDataType.isScaleProvided) {
            if (scaleColumn.disabled) {
              scaleColumn.enable();
            }
          } else {
            if (scaleColumn.value !== 0) {
              scaleColumn.setValue(0);
            }
            if (scaleColumn.enabled) {
              scaleColumn.disable();
            }
          }
        }

        const precisionColumn = column.get('precision');
        if (precisionColumn !== undefined && precisionColumn !== null) {
          if (selectedDataType !== undefined && selectedDataType.isPrecisionProvided) {
            if (precisionColumn.disabled) {
              precisionColumn.enable();
            }
          } else {
            if (precisionColumn.value !== 0) {
              precisionColumn.setValue(0);
            }
            if (precisionColumn.enabled) {
              precisionColumn.disable();
            }
          }
        }
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
        const scale = column.get('scale')?.value;
        const precision = column.get('precision')?.value;
        const primaryKey = column.get('primaryKey')?.value;
        const notNull = column.get('notNull')?.value;
        const unique = column.get('unique')?.value;
        const columnDef = {
          name: columnName,
          dataType,
          size,
          scale,
          precision,
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
