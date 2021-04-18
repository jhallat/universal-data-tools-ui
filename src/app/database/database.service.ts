import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatabaseDef, TableDef} from './database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private urlDatabases = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getDatabases(): Observable<DatabaseDef[]> {
    return this.http.get<DatabaseDef[]>(`${this.urlDatabases}/databases`);
  }

  getTable(schema: string, table: string): Observable<TableDef> {
    return this.http.get<TableDef>(`${this.urlDatabases}/database/table/${schema}/${table}`);
  }
}