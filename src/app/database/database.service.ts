import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateDatabaseDef, CreateTableDef, DatabaseDef, DataTypeDef, TableDef} from './database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private urlDatabases = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getDatabases(): Observable<DatabaseDef[]> {
    return this.http.get<DatabaseDef[]>(`${this.urlDatabases}/databases`);
  }

  getTable(database: string, schema: string, table: string): Observable<TableDef> {
    return this.http.get<TableDef>(`${this.urlDatabases}/database/table/${database}/${schema}/${table}`);
  }

  getDataTypes(): Observable<DataTypeDef[]> {
    return this.http.get<DataTypeDef[]>(`${this.urlDatabases}/database/types`);
  }

  createTable(table: CreateTableDef): Observable<TableDef> {
    return this.http.post<TableDef>(`${this.urlDatabases}/database/table`, table);
  }

  createDatabase(database: CreateDatabaseDef): Observable<DatabaseDef> {
    return this.http.post<DatabaseDef>(`${this.urlDatabases}/database`, database);
  }

  dropTable(databaseName: string, tableName: string): Observable<void> {
    return this.http.delete<void>(`${this.urlDatabases}/database/${databaseName}/table/${tableName}`);
  }
}
