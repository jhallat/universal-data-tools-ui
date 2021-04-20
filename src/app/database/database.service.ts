import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateTableDef, DatabaseDef, TableDef} from './database';

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

  createTable(table: CreateTableDef): Observable<TableDef> {
    return this.http.post<TableDef>(`${this.urlDatabases}/database/table`, table);
  }
}
