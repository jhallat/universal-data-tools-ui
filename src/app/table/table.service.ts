import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Table, } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tablesUrl = "http://localhost:5000/tables";

  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.tablesUrl)
      .pipe(
        tap(data => console.log("tables: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }



  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return throwError(err.message);
  }
}
