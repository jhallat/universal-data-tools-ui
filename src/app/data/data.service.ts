import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Data, DataError } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl = "http://localhost:5000/table";
  

  constructor(private http: HttpClient) { }

  getData(tableName: string): Observable<Data | DataError> {
    return this.http.get<Data>(`${this.dataUrl}/${tableName}/items`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getItem(tableName: string, params: any): Observable<Data | DataError> {
    console.log(JSON.stringify(params));
    return this.http.get<Data>(`${this.dataUrl}/${tableName}/item`,
    {params})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<DataError> {
    let dataError = new DataError(100, err.statusText, "An error occurred retreiving data");
    console.error(err.message);
    return throwError(err.message);
  }
}
